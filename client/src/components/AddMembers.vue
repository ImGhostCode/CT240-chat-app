<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex  justify-center items-center">
        <div class="bg-white p-6 relative w-80 shadow-lg rounded-lg max-h-80 flex flex-col">
            <span class="absolute right-0 p-2 mx-3 cursor-pointer" @click="$emit('show')"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
            <h3 class="text-2xl font-bold mb-3">Add Members</h3>
            <input type="text" placeholder="Search users..." class="p-4 border outline-none w-full mb-3"
                @input="$event => handleSearchUser($event.target.value)">
            <div class="basis-full overflow-y-scroll max-h-64" v-if="authStore.searchMembersResult">
                <div v-for="member in authStore.searchMembersResult" :key="member._id"
                    class="px-4 py-2 bg-indigo-700 flex-col text-white mb-2 cursor-pointer rounded-md shadow-md items-center">
                    <div class="flex items-center justify-between ">
                        <div class="flex items-center">
                            <div class="h-[30px] w-[30px] rounded-full overflow-hidden">
                                <img :src="ENDPOINT + '/public/images/' + member.pic" :alt="member.name"
                                    class="h-full w-full">
                            </div>
                            <div class="flex flex-col ml-2 items-center justify-center">
                                <h2 class="text-xl font-semibold">{{ member.name }}</h2>
                            </div>
                        </div>
                        <button class="border-none outline-none text-white" @click="handleAddMember(member._id)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.store'
import { useConversationStore } from "../stores/conversation.store";
import { useToast } from 'vue-toast-notification';
import { onUnmounted } from 'vue'

const $toast = useToast();
const conversationStore = useConversationStore()
const authStore = useAuthStore()

const ENDPOINT = import.meta.env.VITE_API_URL

let timeout
async function handleSearchUser(value) {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
        if (value) {
            await authStore.search(value, 'Group')
        } else {
            authStore.searchMembersResult = null
        }
    }, 300);
}

async function handleAddMember(userId) {
    let conversationId = conversationStore.conversations[conversationStore.activeIndex]._id
    await conversationStore.addMemberGroup(conversationId, userId)
    if (conversationStore.err) {
        $toast.error(conversationStore.err)
        return
    }
    $toast.success(conversationStore.result.message)
}

onUnmounted(() => {
    authStore.searchMembersResult = null
})
</script>