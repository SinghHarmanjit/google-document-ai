import fs from "fs";
import {google} from "@google-cloud/documentai/build/protos/protos";

export function getFileContent (filePath: string, encoding: BufferEncoding = 'base64'): string
{
    try {
        const pdfFile = fs.readFileSync(filePath);
        return Buffer.from(pdfFile).toString(encoding);
    } catch (error) {
        return undefined;
    }
}

export function saveDocument(fileName: string, document: google.cloud.documentai.v1.IDocument) {
    const jsonDocument = JSON.stringify(document);
    // const outputFile = fileName;// fileName + '.' + outputExtension;
    fs.writeFileSync(fileName, jsonDocument);
}
