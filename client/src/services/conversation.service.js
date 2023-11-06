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

    async createGroup(name, users) {
        return await (
            await this.api.post("/create-group", { name, users })
        ).data;
    }

    async addMemberGroup(conversationId, userId) {
        return await (
            await this.api.put("/add-member", { conversationId, userId })
        ).data
    }

    async removeMemberGroup(conversationId, userId) {
        return await (
            await this.api.put("/remove-member", { conversationId, userId })
        ).data
    }

    async editGroup(image) {
        return await (
            await this.api.put("/edit-group", image, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        ).data
    }

    async deleteGroup(conversationId) {
        return await (
            await this.api.delete(`/delete-group/${conversationId}`)
        ).data
    }
}

export default new ConversationService();
