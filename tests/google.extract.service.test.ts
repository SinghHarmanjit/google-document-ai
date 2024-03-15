// @ts-nocheck
import {AdvancedKeyMetaData} from "../src/extract/google/google.extract.model";
import {GoogleDocumentaiService} from "../src/extract/google/google.documentai.service";
import {
    dp_001,
    dp_002,
    dp_003,
    dp_004,
    dp_005,
    dp_006,
    dp_007,
    dp_010,
    dp_011,
    dp_012,
    dp_013,
    dp_014,
    dp_015,
    dp_016,
    dp_017,
    dp_018,
    dp_019,
    dp_020,
    dp_021,
    dp_022,
    dp_023,
    dp_024
} from "../src/extract/type2A2B.fields";
import {
    paragraph_07_date_de_constitution,
    paragraph_08_duree_Dauer_der_Gesellschaft,
    paragraph_09_exercice_social_Geschaftsjahr, paragraph_11_administrateur
} from "../src/extract/registration.2A2B.fields";

export const GlobalKeysMetaData: AdvancedKeyMetaData[] = [
    // dp_001,
    // dp_002,
    // dp_003,
    // dp_004,
    // dp_005,
    // dp_006,
    // dp_007,
    // dp_010,
    // dp_011,
    // dp_012,
    // dp_013,
    // dp_014,
    // dp_015,
    // dp_016,
    // dp_017,
    // dp_018,
    // dp_019,
    // dp_020,
    // dp_021,
    // dp_022,
    // dp_023,
    // dp_024
    paragraph_07_date_de_constitution,
    paragraph_08_duree_Dauer_der_Gesellschaft,
    paragraph_09_exercice_social_Geschaftsjahr,
    paragraph_11_administrateur
];

// const fileName: string = './samples/L090095028 - B146757';
// const fileName: string = './samples/L090105702 - B147036A';
// const fileName: string = './samples/L090091918 - B146655';
const fileName: string = './samples/L090095028 - B146757';

describe("Google DocumentAI", () => {
    it("Test processing", async () => {
        const service = new GoogleDocumentaiService();
        const keys = await service.startAnalysis(fileName, GlobalKeysMetaData);
        const answers = [`Output for ${fileName}.pdf`];
        for (const paragraph of keys) {
            answers.push(`${paragraph.key} ${paragraph.index || ''}`)
            for (const key of paragraph.keys) {
                answers.push(`${key.key} ${key.name} ${key.position || ''} = ${key.repeat ? key.values.join() : key?.value?.replaceAll(/\n/g, " ")}`)
            }
        }
        console.log(answers.join('\n'));
    }, 600000);
});
