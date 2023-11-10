import { ref } from "vue";
import { defineStore } from "pinia";
import messageService from "../services/message.service";
import io from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_API_URL

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

    async function sendImagesMessage(files) {
        isLoading.value = true;
        err.value = null;
        try {
            let socket = io(ENDPOINT);
            const res = await messageService.sendImagesMessage({ files });
            if (res.code === 400 || res.code === 401 || res.code === 403) throw new Error(res.message);
            socket.emit("new images message", res.data);
            let endmessage = res.data.length
            newMessage.value = res.data[endmessage - 1]
            messages.value.push(...res.data)
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    return { fetchMessages, messages, isLoading, err, sendAMessage, newMessage, sendImagesMessage };
});