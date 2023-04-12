import createApiClient from "./api.service";

class MessageService {
    constructor(baseURL = "/api/v1/messages") {
        this.api = createApiClient(baseURL);
    }

    async fetchMessages(conversationId, token) {
        return await (
            await this.api.get(`/${conversationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ).data;
    }

    async sendMessage(content, conversationId, token) {
        return await (
            await this.api.post('/send-message', { content, conversationId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ).data;
    }

}

export default new MessageService();
