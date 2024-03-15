import {DocumentProcessorServiceClient} from "@google-cloud/documentai";
import {google} from "@google-cloud/documentai/build/protos/protos";
import IProcessRequest = google.cloud.documentai.v1.IProcessRequest;


const projectId: string = 'project-dominate-413902';
const location: string = 'us'; // Format is 'us' or 'eu'
const processorId: string = 'ab77e7ab3b973a1d'; // '91da7b19aec016fd'; // Create processor in Cloud Console

export class GoogleDocumentaiRepository {
    client: DocumentProcessorServiceClient;

    initialiseClient() {
        this.client = new DocumentProcessorServiceClient({
            credentials: {
                "type": "service_account",
                "project_id": "project-dominate-413902",
                "private_key_id": "add key id here",
                "private_key": "add secret file here",
                "client_email": "service@project-dominate-413902.iam.gserviceaccount.com",
                "client_id": "add client id here",
                "universe_domain": "googleapis.com"
            }
        });
    }

    async processDocument(content: string) {
        const processorName = `projects/${projectId}/locations/${location}/processors/${processorId}`;
        const request: IProcessRequest = {
            name: processorName,
            rawDocument: {
                content: content,
                mimeType: 'application/pdf',
            }
        };
        const [result] = await this.client.processDocument(request);
        const {document} = result;
        return document;
    }

}
