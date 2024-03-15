import {google} from "@google-cloud/documentai/build/protos/protos";
import {GoogleDocumentAIMapper} from "./google.documentai.mapper";
import {FIELD_TYPE, KeyMetaData, ParagraphKeyMetaData} from "./google.extract.model";
import {getFileContent, saveDocument} from "./util";
import {GoogleDocumentaiRepository} from "./google.documentai.repository";
import IDocument = google.cloud.documentai.v1.IDocument;
import IParagraph = google.cloud.documentai.v1.Document.Page.IParagraph;
import IFormField = google.cloud.documentai.v1.Document.Page.IFormField;
import IPage = google.cloud.documentai.v1.Document.IPage;
// @ts-ignore
const stringSimilarity = require("string-similarity");

// const fileName: string = './samples/L090095028 - B146757';
// const fileName: string = './samples/L090105702 - B147036A';
// const fileName: string = './samples/L090091918 - B146655';
// const fileName: string = './samples/L090093571 - B146709';

const fileExtension: string = 'pdf';
const outputExtension: string = 'json';

export class GoogleDocumentaiService {
    repository: GoogleDocumentaiRepository;
    mapper: GoogleDocumentAIMapper;

    constructor() {
        this.mapper = new GoogleDocumentAIMapper();
        this.repository = new GoogleDocumentaiRepository();
    }

    async startAnalysis(fileName: string, keyMetaData: ParagraphKeyMetaData[]) {
        const savedProcessedDocument = getFileContent(fileName + '.' + outputExtension, 'utf8');
        let document: IDocument = undefined;
        if (!savedProcessedDocument) {
            this.repository.initialiseClient();
            const content = getFileContent(fileName + '.' + fileExtension);
            document = await this.repository.processDocument(content);
            saveDocument(fileName + '.' + outputExtension, document);
        } else {
            document = JSON.parse(savedProcessedDocument);
        }

        return this.analyseDocument(document, keyMetaData);
    }

    analyseDocument(document: IDocument, keysMetaDataArray: ParagraphKeyMetaData[]) {
        let valuesKeysMetaDataArray: ParagraphKeyMetaData[] = [];
        for (const paragraph of keysMetaDataArray) {
            // if paragraph exists lets find it
            let paragraphsAcrossPages: { page: IPage, paragraph: IParagraph }[] = undefined;
            if (paragraph.repeat) {
                paragraphsAcrossPages = this.getParagraphs(document, paragraph.name);
            } else {
                paragraphsAcrossPages = [this.getParagraph(document, paragraph.name)];
            }

            for (let index = 0; index < paragraphsAcrossPages.length; index++) {
                const result = paragraphsAcrossPages[index];
                let iContainingPage = undefined;
                let iParagraph: IParagraph = undefined;
                if (result && result?.paragraph && result?.page) {
                    iParagraph = result.paragraph;
                    iContainingPage = result.page;
                    console.log(`Found context paragraph ${paragraph.name} on page ${iContainingPage.pageNumber}`);
                } else {
                    console.log(`Paragraph for ${paragraph.name} not found`);
                    continue;
                }

                const processedParagraphKeys = this.processKeysForParagraph({
                    ...paragraph,
                    value: undefined,
                    index: undefined
                }, document, iParagraph, iContainingPage);
                processedParagraphKeys.index = index;
                valuesKeysMetaDataArray = [...valuesKeysMetaDataArray, processedParagraphKeys];
            }
        }

        return valuesKeysMetaDataArray;
    }

    processKeysForParagraph(paragraphKeysMetaData: ParagraphKeyMetaData, document: IDocument, paragraph: IParagraph, containingPage: IPage): ParagraphKeyMetaData {
        let keysMetaData: ParagraphKeyMetaData = paragraphKeysMetaData;

        for (const key of paragraphKeysMetaData.keys) {
            if (key.type === FIELD_TYPE.substring) {
                let lastFoundSubstringIndex = undefined;
                if (key.repeat) {
                    const previousKey = paragraphKeysMetaData.keys.filter(k => k.name === key.name && k.position > 0);
                    if (previousKey.length > 0) {
                        lastFoundSubstringIndex = previousKey[0].position;
                        console.log(`Found last index ${lastFoundSubstringIndex}`);
                    }
                }
                const startIndex = this.findStartIndexForName(document.text, lastFoundSubstringIndex || Number(paragraph?.layout.textAnchor.textSegments[0].endIndex), key.name) + key.name.length;
                const endIndex = this.findStartIndexForName(document.text, lastFoundSubstringIndex || Number(paragraph?.layout.textAnchor.textSegments[0].endIndex), key.endDelimiter);
                const value = this.mapper.getTextAnchorText(
                    document.text,
                    {
                        textSegments: [
                            {
                                startIndex: startIndex,
                                endIndex: endIndex,
                            }
                        ]
                    }
                );
                console.log(
                    `Found starting and ending paragraphs and value = ${value.replaceAll(/\n/g, " ")}`
                );
                key.value = value.replaceAll(/\n/g, " ");
                key.position = endIndex + key.endDelimiter.length;
            }

            if (key.type === FIELD_TYPE.form) {
                const formField = this.getFormFieldForKey(document, containingPage, key);
                if (formField) {
                    const formValue = this.mapper.getFormFieldText(document.text, formField);
                    key.value = formValue ? formValue.replaceAll(/\n/g, " ") : formValue;
                    if (key.repeat) {
                        key.values = [...key.values, key.value];
                        console.log(`Checking repeat element for ${keysMetaData.name}`);
                        const repeatFormField = this.getFormFieldForKey(document, containingPage, key, formField);
                        if (repeatFormField) {
                            const repeatValue = this.mapper.getFormFieldText(document.text, repeatFormField);
                            console.log(`found repeat form field ${repeatFormField.fieldName} and ${repeatValue}`);
                            key.values = [...key.values, repeatValue.replaceAll(/\n/g, "")];
                        }
                    }
                }
            }

        }

        return keysMetaData;
    }

    private findStartIndexForName(text: string, index: number | Long | string | undefined, name: string) {
        if (!name || name.length === 0) {
            return Number(index);
        }

        let startIndex = Number(index);
        let endIndex = Number(startIndex) + Number(name.length);
        while (endIndex < text.length) {
            const substring = text.substring(startIndex, endIndex);
            // const withoutDelimiters = substring?.replaceAll(/\n/g, '  ');
            // if (stringSimilarity.compareTwoStrings(substring, name) > 0.8) {
            if (name === substring) {
                return startIndex;
            } else {
                startIndex = startIndex + 1;
                endIndex = endIndex + 1;
            }
        }

        console.log(`Error: Could not find ${name}`);
        return Number(index);
    }

    getFormFieldForKey(document: IDocument, containingPage: IPage, keysMetaData: KeyMetaData, ignoreIFormField: IFormField = undefined): IFormField {
        for (const page of document.pages) {
            if (containingPage.pageNumber !== page.pageNumber) {
                continue;
            }

            let formField: IFormField = this.mapper.getFormFieldForKeyName(
                document.text,
                page.formFields,
                keysMetaData.name,
                ignoreIFormField
            );

            if (formField) {
                if (keysMetaData.references) {
                    const referenceFormField: IFormField | IParagraph =
                        keysMetaData.references[0].type === FIELD_TYPE.paragraph ?
                            this.mapper.getParagraphForKeyName(
                                document.text,
                                page.paragraphs,
                                // TODO: Improve for list of references
                                keysMetaData.references[0].name
                            ) : this.mapper.getFormFieldForKeyName(
                                document.text,
                                page.formFields,
                                // TODO: Improve for list of references
                                keysMetaData.references[0].name
                            );
                    if (this.mapper.compareFormFields(formField, referenceFormField, keysMetaData.references[0].direction)) {
                        console.log(`Reference field check passed ${keysMetaData.references[0].name}`);
                    } else {
                        console.log(`Reference fields could not be mapped or compared ${keysMetaData.references[0].name}`);
                    }
                }

                return formField;
            }
        }

        return undefined;
    }

    // getParagraphKeyValue(document: IDocument, keysMetaData: ParagraphKeyMetaData): string {
    //     // Another Way:
    //     // const startingIndex = text.indexOf(keysMetaData.name);
    //     // const endingIndex = text.indexOf(keysMetaData.references[0].name);
    //     // const firstNewLineIndex = text.indexOf('\n', startingIndex);
    //     // const value = text.slice(firstNewLineIndex + 1, endingIndex);
    //     // console.log(`${keysMetaData.name} is ${value}`);
    //     // return value;
    //     for (const page of document.pages) {
    //         // if (!limitPages.includes(page.pageNumber)) {
    //         //     continue;
    //         // }
    //         const startingParagraph: IParagraph =
    //             this.mapper.getParagraphForKeyName(
    //                 document.text,
    //                 page.paragraphs,
    //                 keysMetaData.name
    //             );
    //         let endingParagraph: IParagraph = undefined;
    //         if (startingParagraph) {
    //             endingParagraph = this.mapper.getParagraphForKeyName(
    //                 document.text,
    //                 page.paragraphs,
    //                 keysMetaData.references[0].name
    //             );
    //         }
    //
    //         if (startingParagraph && endingParagraph) {
    //             const value = this.mapper.getTextAnchorText(
    //                 document.text,
    //                 {
    //                     textSegments: [
    //                         {
    //                             startIndex: startingParagraph.layout.textAnchor.textSegments[0].endIndex,
    //                             endIndex: endingParagraph.layout.textAnchor.textSegments[0].startIndex,
    //                         }
    //                     ]
    //                 }
    //             );
    //             console.log(
    //                 `Found starting and ending paragraphs and value = ${value.replaceAll(/\n/g, " ")}`
    //             );
    //             return value;
    //         }
    //     }
    //
    //     return undefined;
    // }

    getParagraph(document: IDocument, name: string, restrictedPages: IPage[] = undefined): {
        page: IPage,
        paragraph: IParagraph
    } {
        // Another Way:
        // const startingIndex = text.indexOf(keysMetaData.name);
        // const endingIndex = text.indexOf(keysMetaData.references[0].name);
        // const firstNewLineIndex = text.indexOf('\n', startingIndex);
        // const value = text.slice(firstNewLineIndex + 1, endingIndex);
        // console.log(`${keysMetaData.name} is ${value}`);
        // return value;
        for (const page of document.pages) {
            if (restrictedPages && restrictedPages.some(page => page.pageNumber === page.pageNumber)) {
                continue;
            }

            const startingParagraph: IParagraph =
                this.mapper.getParagraphForKeyName(
                    document.text,
                    page.paragraphs,
                    name
                );

            if (startingParagraph) {
                let startIndex = Number.parseInt(String(startingParagraph.layout.textAnchor.textSegments[0].startIndex || 0).toString()) as number;
                let endIndex = Number.parseInt(String(startingParagraph.layout.textAnchor.textSegments[0].endIndex).toString()) as number;

                startIndex = startIndex - 50;
                endIndex = endIndex + 50;

                const stringWithBuffer = document.text.substring(startIndex, endIndex);
                // TODO: Find proper way to ignore this
                if (stringWithBuffer.includes('(sub')) {
                    // this is the summary section of the document
                    // continue;
                } else {
                    return {page, paragraph: startingParagraph};
                }
            }

        }

        return undefined;
    }

    getParagraphs(document: IDocument, name: string, restrictedPages: IPage[] = undefined): {
        page: IPage,
        paragraph: IParagraph
    }[] {
        // Another Way:
        // const startingIndex = text.indexOf(keysMetaData.name);
        // const endingIndex = text.indexOf(keysMetaData.references[0].name);
        // const firstNewLineIndex = text.indexOf('\n', startingIndex);
        // const value = text.slice(firstNewLineIndex + 1, endingIndex);
        // console.log(`${keysMetaData.name} is ${value}`);
        // return value;
        const multipleParagraphs: { page: IPage, paragraph: IParagraph }[] = [];
        for (const page of document.pages) {
            if (restrictedPages && restrictedPages.some(page => page.pageNumber === page.pageNumber)) {
                continue;
            }

            const startingParagraph: IParagraph =
                this.mapper.getParagraphForKeyName(
                    document.text,
                    page.paragraphs,
                    name
                );

            if (startingParagraph) {
                let startIndex = Number.parseInt(String(startingParagraph.layout.textAnchor.textSegments[0].startIndex || 0).toString()) as number;
                let endIndex = Number.parseInt(String(startingParagraph.layout.textAnchor.textSegments[0].endIndex).toString()) as number;

                startIndex = startIndex - 50;
                endIndex = endIndex + 50;

                const stringWithBuffer = document.text.substring(startIndex, endIndex);
                // TODO: Find proper way to ignore this
                if (stringWithBuffer.includes('(sub')) {
                    // this is the summary section of the document
                    // continue;
                } else {
                    multipleParagraphs.push({page, paragraph: startingParagraph});
                }
            }

        }

        return multipleParagraphs;
    }
}
