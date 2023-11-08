<template>
    <div class="my-3 flex items-center p-3 w-full" v-if="props.info"
        :class="props.info.sender._id === authStore.user._id ? 'flex-row-reverse' : 'flex-row'">
        <div class="h-10 w-10 rounded-full overflow-hidden border-indigo-600 border-2">
            <img :src="ENDPOINT + '/public/images/' + props.info.sender.pic" :alt="props.info.sender.name"
                class="h-full w-full">
        </div>
        <div class="mx-4  text-black flex flex-col rounded-lg py-2 px-3 text max-w-[85%] break-all"
            :class="props.info.sender._id === authStore.user._id ? 'message_right' : 'message_left'">
            <div v-if="props.info.conversation.isGroupChat">
                <p class="text-xs text-start text-red-500" v-if="props.info.sender._id !== authStore.user._id">{{
                    props.info.sender.name }}</p>
            </div>
            <p class="w-full" :class="props.info.sender._id === authStore.user._id ? '' : 'text-left'">{{
                props.info.content
            }}</p>
            <span class="text-xs ">{{ moment(props.info.updatedAt).format('LT') }}</span>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment'
import { useAuthStore } from "./../stores/auth.store.js";
const authStore = useAuthStore()
const props = defineProps(['info'])
const ENDPOINT = import.meta.env.VITE_API_URL
</script>