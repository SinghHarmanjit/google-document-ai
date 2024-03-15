// // export const ObjetSocial: AdvancedKeyMetaData = {
// //     name: "Objet social (indication) (Zweck der Gesellschaft)",
// //     type: FIELD_TYPE.substring,
// //     key: 'not required',
// //     references: [{
// //         name: "Objet social incomplet (Unvollständiger Zweck der Gesellschaft)",
// //         direction: DIRECTION.AFTER
// //     }],
// //     paragraph: {
// //         key: 'not required',
// //         name: "Objet social (indication) (Zweck der Gesellschaft)",
// //         type: FIELD_TYPE.paragraph,
// //     }
// // };
//
// // export const FixeCapital: AdvancedKeyMetaData = {
// //     name: "Fixe (Festkapital)",
// //     type: FIELD_TYPE.form,
// //     key: 'not required',
// //     references: [{
// //         name: "Montant (Kapitalbetrag)",
// //         direction: DIRECTION.RIGHT
// //     }],
// //     paragraph: {
// //         key: 'not required',
// //         name: "Capital social / fonds social (Kapital der Gesellschaft)",
// //         type: FIELD_TYPE.paragraph,
// //     }
// // }
//
// // export const MontatCapital = {
// //     name: "Montant (Kapitalbetrag)",
// //     type: FIELD_TYPE.form,
// //     key: 'not required',
// //     references: [{
// //         name: "Fixe (Festkapital)",
// //         direction: DIRECTION.LEFT
// //     }],
// //     paragraph: {
// //         key: 'not required',
// //         name: "Capital social / fonds social (Kapital der Gesellschaft)",
// //         type: FIELD_TYPE.paragraph,
// //     }
// // };
// //
// // export const DeviceKapital: AdvancedKeyMetaData = {
// //     name: "Devise (Kapitaldevise)",
// //     key: 'not required',
// //     type: FIELD_TYPE.form,
// //     references: [{
// //         name: "Montant (Kapitalbetrag)",
// //         direction: DIRECTION.BEFORE
// //     }],
// //     paragraph: {
// //         key: 'Not Required',
// //         name: "Capital social / fonds social (Kapital der Gesellschaft)",
// //         type: FIELD_TYPE.paragraph,
// //     }
// // };
//
// export const dp_001: AdvancedKeyMetaData = {
//     name: "Date de constitution (Gründungsdatum)",
//     type: FIELD_TYPE.form,
//     key: 'dp_001',
//     references: [{
//         name: "(JJ/MM/AAAA)",
//         direction: DIRECTION.AFTER
//     }],
//     paragraph: {
//         key: 'dp_001_paragraph',
//         name: "Date de constitution (Gründungsdatum)",
//         type: FIELD_TYPE.paragraph,
//     }
// };
//
// export const dp_002: AdvancedKeyMetaData = {
//     name: "Illimitee (unbegrenzt)",
//     key: 'dp_002',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Déterminee (begrenzt)",
//         direction: DIRECTION.RIGHT
//     }],
//     paragraph: {
//         name: "Duree (Dauer der Gesellschaft)",
//         key: 'dp_002_paragraph',
//         type: FIELD_TYPE.paragraph,
//     }
// };
//
// export const dp_003: AdvancedKeyMetaData = {
//     name: "Déterminee (begrenzt)",
//     type: FIELD_TYPE.form,
//     key: 'dp_003',
//     references: [{
//         name: "Illimitee (unbegrenzt)",
//         direction: DIRECTION.LEFT
//     }],
//     paragraph: {
//         name: "Duree (Dauer der Gesellschaft)",
//         key: 'dp_003',
//         type: FIELD_TYPE.paragraph,
//     }
// };
//
// export const dp_004: AdvancedKeyMetaData = {
//     name: "Prorogée (verlängert)",
//     type: FIELD_TYPE.form,
//     key: 'dp_004',
//     references: [{
//         name: "Illimitee (unbegrenzt)",
//         direction: DIRECTION.LEFT
//     }],
//     paragraph: {
//         name: "Duree (Dauer der Gesellschaft)",
//         key: 'dp_004_p',
//         type: FIELD_TYPE.paragraph,
//     }
// };
//
// export const dp_005: AdvancedKeyMetaData = {
//     name: "Date fin (Ende der Gesellschaft)",
//     type: FIELD_TYPE.form,
//     key: 'dp_005',
//     paragraph: {
//         name: "Duree (Dauer der Gesellschaft)",
//         key: 'dp_005_p',
//         type: FIELD_TYPE.paragraph,
//     }
// };
//
// export const dp_006: AdvancedKeyMetaData = {
//     name: "au (bis zum)",
//     type: FIELD_TYPE.form,
//     key: 'dp_006',
//     repeat: true,
//     references: [{
//         name: "du (vom)",
//         direction: DIRECTION.LEFT
//     }],
//     paragraph: {
//         key: 'dp_006_p',
//         name: "Exercice social (Geschäftsjahr)",
//         type: FIELD_TYPE.paragraph,
//     }
// };
//
// export const dp_007: AdvancedKeyMetaData = {
//     name: "du (vom)",
//     type: FIELD_TYPE.form,
//     key: 'dp_007',
//     repeat: true,
//     references: [{
//         name: "au (bis zum)",
//         direction: DIRECTION.RIGHT
//     }],
//     paragraph: {
//         key: 'dp_007_p',
//         name: "Exercice social (Geschäftsjahr)",
//         type: FIELD_TYPE.paragraph,
//     }
// };
//
// export const dp_010: AdvancedKeyMetaData = {
//     name: "inscrire/ajouter (einschreiben/ergänzen)",
//     key: 'dp_010',
//     type: FIELD_TYPE.form,
//     paragraph: {
//         key: 'dp_010_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_011: AdvancedKeyMetaData = {
//     name: "Nom (Name)",
//     key: 'dp_011',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Dénomination ou raison sociale (Bezeichnung der Gesellschaft oder Firmenname)",
//         type: FIELD_TYPE.paragraph,
//         direction: DIRECTION.AFTER
//     }],
//     paragraph: {
//         key: 'dp_011_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_012: AdvancedKeyMetaData = {
//     name: "Prénom(s) (Vorname(n))",
//     key: 'dp_012',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Dénomination ou raison sociale (Bezeichnung der Gesellschaft oder Firmenname)",
//         type: FIELD_TYPE.paragraph,
//         direction: DIRECTION.AFTER
//     }],
//     paragraph: {
//         key: 'dp_012_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_013: AdvancedKeyMetaData = {
//     name: "Date de naissance (Geburtsdatum)",
//     key: 'dp_013',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Dénomination ou raison sociale (Bezeichnung der Gesellschaft oder Firmenname)",
//         type: FIELD_TYPE.paragraph,
//         direction: DIRECTION.AFTER
//     }],
//     paragraph: {
//         key: 'dp_013_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_014: AdvancedKeyMetaData = {
//     name: "Lieu de naissance (Geburtsort)",
//     key: 'dp_014',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Dénomination ou raison sociale (Bezeichnung der Gesellschaft oder Firmenname)",
//         type: FIELD_TYPE.paragraph,
//         direction: DIRECTION.AFTER
//     }],
//     paragraph: {
//         key: 'dp_014_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_015: AdvancedKeyMetaData = {
//     name: "Pays de naissance (Geburtsland)",
//     key: 'dp_015',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "ou (oder) Personne morale (juristische Person)",
//         type: FIELD_TYPE.paragraph,
//         direction: DIRECTION.LEFT
//     }],
//     paragraph: {
//         key: 'dp_015_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// // dp_016_Personne_Morale_Denomination_ou_raison_sociale
// export const dp_016: AdvancedKeyMetaData = {
//     name: "Dénomination ou raison sociale (Bezeichnung der Gesellschaft oder Firmenname)",
//     key: 'dp_016',
//     type: FIELD_TYPE.form,
//     paragraph: {
//         key: 'dp_016_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_017: AdvancedKeyMetaData = {
//     name: "N° d'immatriculation (Handelsregisternummer)",
//     key: 'dp_017',
//     type: FIELD_TYPE.form,
//     paragraph: {
//         key: 'dp_017_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_018: AdvancedKeyMetaData = {
//     name: "Nom du registre (Handelsregisterbezeichnung)",
//     key: 'dp_018',
//     type: FIELD_TYPE.form,
//     paragraph: {
//         key: 'dp_018_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_019: AdvancedKeyMetaData = {
//     name: "Pays (Land)",
//     key: 'dp_019',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         direction: DIRECTION.AFTER
//     }],
//     paragraph: {
//         key: 'dp_019_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_020: AdvancedKeyMetaData = {
//     name: "Nom (Name)",
//     key: 'dp_020',
//     type: FIELD_TYPE.form,
//     references: [{
//         type: FIELD_TYPE.paragraph,
//         name: "Nom du registre (Handelsregisterbezeichnung)",
//         direction: DIRECTION.AFTER
//     }],
//     paragraph: {
//         key: 'dp_020_p',
//         name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_021: AdvancedKeyMetaData = {
//     name: "Prénom(s) (Vorname(n))",
//     key: 'dp_021',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         direction: DIRECTION.BEFORE
//     }],
//     paragraph: {
//         key: 'dp_021_p',
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_022: AdvancedKeyMetaData = {
//     name: "Date de naissance (Geburtsdatum)",
//     key: 'dp_022',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         direction: DIRECTION.BEFORE
//     }],
//     paragraph: {
//         key: 'dp_022_p',
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_023: AdvancedKeyMetaData = {
//     name: "Lieu de naissance (Geburtsort)",
//     key: 'dp_023',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         direction: DIRECTION.BEFORE
//     }],
//     paragraph: {
//         key: 'dp_014_p',
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// export const dp_024: AdvancedKeyMetaData = {
//     name: "Pays de naissance (Geburtsland)",
//     key: 'dp_015',
//     type: FIELD_TYPE.form,
//     references: [{
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         direction: DIRECTION.BEFORE
//     }],
//     paragraph: {
//         key: 'dp_015_p',
//         name: "Représentant permanent (uniquement pour les S.A. et les SE): (Ständiger Vertreter (betrifft nur die S.A. und die SE))",
//         type: FIELD_TYPE.paragraph,
//         repeat: true,
//     }
// };
//
// //
// // export const GlobalKeysMetaData: AdvancedKeyMetaData[] = [
// //     {
// //         name: "au (bis zum)",
// //         type: FIELD_TYPE.form,
// //         repeat: true,
// //         references: [{
// //             name: "du (vom)",
// //             direction: DIRECTION.LEFT
// //         }],
// //         paragraph: {
// //             name: "Exercice social (Geschäftsjahr)",
// //             type: FIELD_TYPE.paragraph,
// //         }
// //     },
// //     {
// //         name: "Nom (Name)",
// //         type: FIELD_TYPE.form,
// //         paragraph: {
// //             name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
// //             type: FIELD_TYPE.paragraph,
// //             repeat: true,
// //         }
// //     },
// //     {
// //         name: "Prenom(s) (Vorname(n))",
// //         type: FIELD_TYPE.form,
// //         paragraph: {
// //             name: "Administrateur(s) / Gérant (Vorstandsmitglied / Geschäftsführer)",
// //             type: FIELD_TYPE.paragraph,
// //             repeat: true,
// //         }
// //     }
// // ];
