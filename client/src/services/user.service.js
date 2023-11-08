import createApiClient from "./api.service";

class MessageService {
    constructor(baseURL = "/api/v1/users") {
        this.api = createApiClient(baseURL);
    }

    async getFriendsList() {
        return await (await this.api.get(`/friends-list`)).data
    }

    async deleteFriend({ friendId }) {
        return await (await this.api.patch(`/delete-friend/${friendId}`)).data
    }

    async sendFriendInvitation({ friendId }) {
        return await (await this.api.patch(`/send-friend-invitations/${friendId}`)).data
    }

    async getFriendsRequest() {
        return await (await this.api.get(`/friends-request`)).data
    }

    async confirmFriendRequest({ friendId }) {
        return await (await this.api.patch(`/confirm-friend-request/${friendId}`)).data
    }

    async deleteFriendRequest({ friendId }) {
        return await (await this.api.patch(`/delete-friend-request/${friendId}`)).data
    }
}

export default new MessageService();
