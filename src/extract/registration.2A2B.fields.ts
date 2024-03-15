import {FIELD_TYPE, ParagraphKeyMetaData, VALUE_TYPE} from "./google/google.extract.model";

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

export const paragraph_08_duree_Dauer_der_Gesellschaft: ParagraphKeyMetaData = {
    key: '08 Duree (Dauer der Gesellschaft)',
    name: "Duree (Dauer der Gesellschaft)",
    type: FIELD_TYPE.paragraph,
    index: 1,
    keys: [{
        key: 'dp_002',
        name: "Illimitee (unbegrenzt)",
        value: '',
        valueType: VALUE_TYPE.CHECKBOX,
        type: FIELD_TYPE.form
    },
    {
        key: 'dp_003',
        name: "Déterminee (begrenzt)",
        value: '',
        valueType: VALUE_TYPE.CHECKBOX,
        type: FIELD_TYPE.form
    },
    {
        key: 'dp_004',
        name: "Prorogée (verlängert)",
        value: '',
        valueType: VALUE_TYPE.CHECKBOX,
        type: FIELD_TYPE.form
    },
    {
        key: 'dp_005',
        name: "Date fin (Ende der Gesellschaft)",
        value: '',
        valueType: VALUE_TYPE.FULLDATE,
        type: FIELD_TYPE.form,
        endDelimiter: '(JJ/MM/AAAA)'
    }]
};

export const paragraph_09_exercice_social_Geschaftsjahr: ParagraphKeyMetaData = {
    key: '09 Exercice social (Geschäftsjahr)',
    name: "Exercice social (Geschäftsjahr)",
    type: FIELD_TYPE.paragraph,
    index: 1,
    keys: [
    // {
    //     key: 'dp_006',
    //     name: "du (vom)",
    //     value: '',
    //     valueType: VALUE_TYPE.FULLDATE,
    //     type: FIELD_TYPE.substring,
    //     endDelimiter: 'au (bis zum)'
    // },
    // {
    //     key: 'dp_007',
    //     name: "au (bis zum)",
    //     value: '',
    //     valueType: VALUE_TYPE.FULLDATE,
    //     type: FIELD_TYPE.substring,
    //     endDelimiter: '(JJ/MM/AAAA)'
    //
    // },
    // {
    //     key: 'dp_008',
    //     name: "du (vom)",
    //     value: '',
    //     valueType: VALUE_TYPE.DATE,
    //     repeat: true,
    //     type: FIELD_TYPE.substring,
    //     endDelimiter: 'au (bis zum)'
    // },
    // {
    //     key: 'dp_009',
    //     name: "au (bis zum)",
    //     value: '',
    //     valueType: VALUE_TYPE.DATE,
    //     repeat: true,
    //     type: FIELD_TYPE.substring,
    //     endDelimiter: '(JJ/MM)'
    //
    // },
    {
        key: 'dp_006_f',
        name: "du (vom)",
        value: '',
        values: [],
        repeat: true,
        valueType: VALUE_TYPE.FULLDATE,
        type: FIELD_TYPE.form,
        endDelimiter: 'au (bis zum)'
    },
    {
        key: 'dp_007_f',
        name: "au (bis zum)",
        value: '',
        values: [],
        repeat: true,
        valueType: VALUE_TYPE.FULLDATE,
        type: FIELD_TYPE.form,
        endDelimiter: '(JJ/MM/AAAA)'
    }]
};

export const paragraph_11_administrateur: ParagraphKeyMetaData = {
    key: '11 Administrateur(s) / Gerant(s)',
    name: "Administrateur / Gérant (Vorstandsmitglied/Geschäftsführer)",
    type: FIELD_TYPE.paragraph,
    index: 1,
    keys: [
        {
            key: 'dp_010',
            name: "inscrire/ajouter (einschreiben/ergänzen)",
            value: '',
            valueType: VALUE_TYPE.CHECKBOX,
            type: FIELD_TYPE.form
        },
        {
            key: 'dp_011',
            name: "Nom (Name)",
            value: '',
            valueType: VALUE_TYPE.STRING,
            type: FIELD_TYPE.form
        },
        {
            key: 'dp_012',
            name: "Prenom(s) (Vorname(n))",
            value: '',
            valueType: VALUE_TYPE.STRING,
            type: FIELD_TYPE.form
        },
        {
            key: 'dp_013',
            name: "Date de naissance (Geburtsdatum)",
            value: '',
            valueType: VALUE_TYPE.STRING,
            type: FIELD_TYPE.form
        },
        {
            key: 'dp_014',
            name: "Pays de naissance (Geburtsland)",
            value: '',
            valueType: VALUE_TYPE.STRING,
            type: FIELD_TYPE.form
        },
        {
            key: 'dp_015',
            name: "Code postal (Plz.)",
            value: '',
            valueType: VALUE_TYPE.STRING,
            type: FIELD_TYPE.form
        }
    ]
}
