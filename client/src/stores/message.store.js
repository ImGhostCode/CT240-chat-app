import { ref } from "vue";
import { defineStore } from "pinia";
import messageService from "../services/message.service";

export const useMessageStore = defineStore("message", () => {
    const messages = ref([]);
    const newMessage = ref(null)
    const isLoading = ref(false);
    const err = ref(null);

    async function fetchMessages(conversationId, token) {
        isLoading.value = true;
        messages.value = [];
        err.value = null;
        try {
            const res = await messageService.fetchMessages(conversationId, token);
            if (res.code === 400 || res.code === 401 || res.code === 403) throw new Error(res.message);
            messages.value = res.data;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function sendAMessage(content, conversationId, token) {
        isLoading.value = true;
        err.value = null;
        try {
            const res = await messageService.sendMessage(content, conversationId);
            if (res.code === 400 || res.code === 401 || res.code === 403) throw new Error(res.message);
            newMessage.value = res.data
            messages.value.push(res.data)
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    return { fetchMessages, messages, isLoading, err, sendAMessage, newMessage };
});