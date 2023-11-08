import { ref } from "vue";
import { defineStore } from "pinia";
import userService from "../services/user.service";

export const useUserStore = defineStore("user", () => {
    const result = ref(null);
    const isLoading = ref(false);
    const err = ref(null);

    async function getFriendsList() {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await userService.getFriendsList()
            if (res.code !== 200) throw new Error(res.message);
            result.value = res;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteFriend({ friendId }) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await userService.deleteFriend({ friendId })
            if (res.code !== 200) throw new Error(res.message);
            result.value = res;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function sendFriendInvitation({ friendId }) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await userService.sendFriendInvitation({ friendId })
            if (res.code !== 200) throw new Error(res.message);
            result.value = res;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function getFriendsRequest() {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await userService.getFriendsRequest()
            if (res.code !== 200) throw new Error(res.message);
            result.value = res;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function confirmFriendRequest({ friendId }) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await userService.confirmFriendRequest({ friendId })
            if (res.code !== 200) throw new Error(res.message);
            result.value = res;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteFriendRequest({ friendId }) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await userService.deleteFriendRequest({ friendId })
            if (res.code !== 200) throw new Error(res.message);
            result.value = res;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        result, err, isLoading, getFriendsList, deleteFriend,
        sendFriendInvitation, getFriendsRequest, confirmFriendRequest,
        deleteFriendRequest
    };
});