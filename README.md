Project is based on Google Document AI
* Input file (L090095028 - B146757.pdf) is sent via Google API for OCR processing
* Output file (L090095028 - B146757.json) is return that contain the document fields information

Generic fields model has been created with the following structure:
  - ParagraphKeyMetaData: Defines the paragraph
  - KeyMetaData: Defines the key

JSON is searched for the paragraph and then that page is searched for keys.

Example configuration:

export const paragraph_07_date_de_constitution: ParagraphKeyMetaData = {
key: '07 Date de constitution (Gründungsdatum)',
name: "Date de constitution (Gründungsdatum)",
type: FIELD_TYPE.paragraph,
index: 1,
keys: [{
name: "",
value: '',
valueType: VALUE_TYPE.FULLDATE,
type: FIELD_TYPE.substring,
key: 'dp_001',
endDelimiter: '(JJ/MM/AAAA)'
}]
};
