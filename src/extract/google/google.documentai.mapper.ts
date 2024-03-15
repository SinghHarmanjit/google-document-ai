import {google} from "@google-cloud/documentai/build/protos/protos";
import IParagraph = google.cloud.documentai.v1.Document.Page.IParagraph;
import ITextAnchor = google.cloud.documentai.v1.Document.ITextAnchor;
import IFormField = google.cloud.documentai.v1.Document.Page.IFormField;
import IVertex = google.cloud.documentai.v1.IVertex;
import {DIRECTION} from "./google.extract.model";
// @ts-ignore
const stringSimilarity = require("string-similarity");

export class GoogleDocumentAIMapper {

    getParagraphForKeyName(text: string, paragraphs: IParagraph [], keyName: string) {
        console.log(`Getting paragraph for ${keyName}`);
        for (const paragraph of paragraphs) {
            const textAnchorText = this.getTextAnchorText(text, paragraph.layout.textAnchor);
            if (stringSimilarity.compareTwoStrings(textAnchorText, keyName) > 0.8) {
                return paragraph;
            }
        }
        return undefined;
    }

    getFormFieldForKeyName(text: string, formFields: IFormField[], keyName: string, ignoreFormField: IFormField = undefined): IFormField {
        for (const formField of formFields) {
            const textAnchorText = this.getTextAnchorText(text, formField.fieldName.textAnchor);
            console.log(`Comparing ${keyName} with ${textAnchorText}`);
            if (stringSimilarity.compareTwoStrings(textAnchorText?.replaceAll(/\n/g, ' '), keyName) > 0.8) {
                if (ignoreFormField === undefined || !this.sameFormFields(formField, ignoreFormField)) {
                    return formField;
                }
            }
        }
        return undefined;
    }

    getTextAnchorText(text: string, textAnchor: ITextAnchor): string {
        if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
            return '';
        }

        // First shard in document doesn't have startIndex property
        const startIndex = (textAnchor.textSegments[0].startIndex || 0) as number;
        const endIndex = (textAnchor.textSegments[0].endIndex) as number;

        return text.substring(startIndex, endIndex);
    };

    getFormFieldText(text: string, formField: IFormField): string {
        if (formField?.valueType.includes('checkbox')) {
            console.log(`includes checkbox + ${formField.valueType}`);
            return formField.valueType.includes('unfilled') ? '0' : formField.valueType.startsWith('filled') ? '1' : '';
        }

        const textAnchor = formField.fieldValue.textAnchor;

        if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
            return '';
        }

        // First shard in document doesn't have startIndex property
        const startIndex = (textAnchor.textSegments[0].startIndex || 0) as number;
        const endIndex = (textAnchor.textSegments[0].endIndex) as number;

        return text.substring(startIndex, endIndex);
    }

    compareFormFields(formField: IFormField, referenceFormField: IFormField | IParagraph, direction: DIRECTION) {
        if (!referenceFormField) {
            console.log(`Reference field not found`);
            return false;
        }

        switch (direction) {
            case DIRECTION.AFTER:
                return this.isAfter(formField, referenceFormField);
            case DIRECTION.BEFORE:
                return this.isBefore(formField, referenceFormField);
            case DIRECTION.RIGHT:
                return this.isRight(formField, referenceFormField);
            case DIRECTION.LEFT:
                return this.isLeft(formField, referenceFormField);
        }
    }

    sameFormFields(formField: IFormField, referenceFormField: IFormField | IParagraph) {
        let boundingPoly = this.getBoundingPoly(referenceFormField);

        const referenceRightVertex: IVertex = boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.x > v.x ? p : v
        );

        const formRightVertex: IVertex = formField.fieldName.boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.x > v.x ? p : v
        );

        return referenceRightVertex.x === formRightVertex.x && referenceRightVertex.y === formRightVertex.y;
    }


    isLeft(formField: IFormField, referenceFormField: IFormField | IParagraph) {
        let boundingPoly = this.getBoundingPoly(referenceFormField);

        const referenceRightVertex: IVertex = boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.x > v.x ? p : v
        );

        const formLeftVertex: IVertex = formField.fieldName.boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.x < v.x ? p : v
        );

        return referenceRightVertex.x < formLeftVertex.x;
    }

    isRight(formField: IFormField, referenceFormField: IFormField | IParagraph) {
        let boundingPoly = this.getBoundingPoly(referenceFormField);

        const formRightVertex: IVertex = formField.fieldName.boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.x > v.x ? p : v
        );

        const referenceLeftVertex: IVertex = boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.x < v.x ? p : v
        );

        return referenceLeftVertex.x > formRightVertex.x;
    }

    isAfter(formField: IFormField, referenceFormField: IFormField | IParagraph) {
        let boundingPoly = this.getBoundingPoly(referenceFormField);

        const formBottomVertex: IVertex = formField.fieldName.boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.y > v.y ? p : v
        );

        const referenceTopVertex: IVertex = boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.x < v.x ? p : v
        );

        return referenceTopVertex.y > formBottomVertex.y;
    }

    isBefore(formField: IFormField, referenceFormField: IFormField | IParagraph) {
        let boundingPoly = this.getBoundingPoly(referenceFormField);

        const formTopVertex: IVertex = formField.fieldName.boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.y < v.y ? p : v
        );

        const referenceBottomVertex: IVertex = boundingPoly.normalizedVertices.reduce(
            (p: IVertex, v: IVertex) => p.x > v.x ? p : v
        );

        return formTopVertex.y > referenceBottomVertex.y;
    }

    private getBoundingPoly(referenceFormField: google.cloud.documentai.v1.Document.Page.IFormField | google.cloud.documentai.v1.Document.Page.IParagraph) {
        if ((referenceFormField as IFormField).fieldName) {
            return (referenceFormField as IFormField).fieldName.boundingPoly;
        } else {
            return (referenceFormField as IParagraph).layout.boundingPoly;
        }
    }
}
