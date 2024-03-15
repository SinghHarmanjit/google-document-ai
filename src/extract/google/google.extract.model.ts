import {google} from "@google-cloud/documentai/build/protos/protos";
import IParagraph = google.cloud.documentai.v1.Document.Page.IParagraph;


export enum DIRECTION {
    LEFT = 'LEFT', RIGHT = 'RIGHT', BEFORE = 'BEFORE', AFTER = 'AFTER'
}

export enum VALUE_TYPE {
    DATE = 'DATE', FULLDATE = 'FULLDATE', STRING = 'STRING', NUMBER = 'NUMBER', CHECKBOX = 'CHECKBOX'
}

export enum FIELD_TYPE {
    substring = 'SUBSTRING',
    paragraph = 'PARAGRAPH',
    form = 'FORM'
}

export type ParagraphKeyMetaData = {
    name: string;
    key: string;
    value?: string;
    type: FIELD_TYPE;
    repeat?: boolean;
    index: number;
    keys?: KeyMetaData[];
    reference? : IParagraph;
}

export type KeyMetaData = {
    name: string;
    key: string;
    value?: string;
    values?: string[];
    type?: FIELD_TYPE;
    repeat?: boolean;
    index?: number;
    endDelimiter?: string;
    valueType: VALUE_TYPE;
    references?: KeyReference[];
    position?: number;
}

export type KeyReference = {
    name?: string;
    type?: FIELD_TYPE;
    direction?: DIRECTION,
}
