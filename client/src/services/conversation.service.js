import createApiClient from "./api.service";

class ConversationService {
    constructor(baseURL = "/api/v1/conversations") {
        this.api = createApiClient(baseURL);
    }

    async fetchAllConversations() {
        return await (
            await this.api.get("/")
        ).data;
    }
    async accessAConversation(userId) {
        return await (
            await this.api.post("/", { userId })
        ).data;
    }

}

export default new ConversationService();
