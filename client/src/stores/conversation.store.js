import { ref, computed } from "vue";
import { defineStore } from "pinia";
import conversationService from "../services/conversation.service";

export const useConversationStore = defineStore("conversation", () => {
    const conversations = ref([]);
    const isLoading = ref(false);
    const err = ref(null);
    const activeIndex = ref(null)

    async function fetchAllConversations() {
        isLoading.value = true;
        // conversations.value = null;
        err.value = null;
        try {
            const res = await conversationService.fetchAllConversations();
            if (res.code === 400 || res.code === 401 || res.code === 403) throw new Error(res.message);
            conversations.value = res.data;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }
    async function accessConversation(userId) {
        isLoading.value = true;
        err.value = null;
        try {
            const res = await conversationService.accessAConversation(userId)
            console.log(res);
            if (res.code === 400 || res.code === 401 || res.code === 403) throw new Error(res.message);
            const isExist = conversations.value.findIndex(tes => tes._id === res.data._id)
            console.log(isExist);
            if (isExist === -1) {
                conversations.value.push(res.data)
                activeIndex.value = conversations.value.length - 1
            } else {
                activeIndex.value = isExist
            }
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function createAGroup(name, users) {
        isLoading.value = true;
        err.value = null;
        try {
            const res = await conversationService.createGroup(name, users)
            if (res.code === 400 || res.code === 401 || res.code === 403) throw new Error(res.message);
            conversations.value.unshift(res.data)
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }


    return { fetchAllConversations, conversations, isLoading, err, activeIndex, accessConversation, createAGroup };
});