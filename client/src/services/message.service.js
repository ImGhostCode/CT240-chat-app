import createApiClient from "./api.service";

class MessageService {
    constructor(baseURL = "/api/v1/messages") {
        this.api = createApiClient(baseURL);
    }

    async fetchMessages(conversationId) {
        return await (
            await this.api.get(`/${conversationId}`)
        ).data;
    }

    async sendMessage(content, conversationId) {
        return await (
            await this.api.post('/send-message', { content, conversationId })
        ).data;
    }

    async sendImagesMessage(files) {
        return await (
            await this.api.post('/send-images', files, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        ).data
    }
}

export default new MessageService();