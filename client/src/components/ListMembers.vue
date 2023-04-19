<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex  justify-center items-center">
        <div class="bg-white p-6 relative w-80 shadow-lg rounded-lg max-h-80 flex flex-col">
            <span class="absolute right-0 p-2 mx-3 cursor-pointer" @click="$emit('show')"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
            <h3 class="text-2xl font-bold mb-3">List Members</h3>
            <!-- <input type="text" placeholder="Name" class="p-4 border outline-none w-full mb-3"> -->
            <!-- <input type="text" placeholder="Search users..." class="p-4 border outline-none w-full mb-3"
                @input="$event => handleSearchUser($event.target.value)"> -->
            <div class="basis-full overflow-y-scroll max-h-64">
                <div v-for="member in conversationStore.conversations[conversationStore.activeIndex].users"
                    :key="member._id"
                    class="px-4 py-2 bg-indigo-700 flex-col text-white mb-2 cursor-pointer rounded-md shadow-md items-center">
                    <div class="flex items-center justify-between ">
                        <div class="flex items-center">
                            <div class="h-[30px] w-[30px] rounded-full overflow-hidden">
                                <img :src="member.pic" :alt="member.name" class="h-full w-full">
                            </div>
                            <div class="flex flex-col ml-2 items-center justify-center">
                                <h2 class="text-xl font-semibold">{{ member.name }}</h2>
                            </div>
                        </div>
                        <button
                            v-if="member._id !== conversationStore.conversations[conversationStore.activeIndex].groupAdmin._id"
                            class="border-none outline-none text-white" @click="handleRemoveMember(member._id)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useConversationStore } from "../stores/conversation.store";
import { useToast } from 'vue-toast-notification';
import { computed, watchEffect, watch } from "vue";
import { useAuthStore } from "./../stores/auth.store.js";
const authStore = useAuthStore()


const $toast = useToast();
const conversationStore = useConversationStore()
// let renderMembers = conversationStore.conversations[conversationStore.activeIndex].users

// watchEffect(() => {
//     renderMembers = conversationStore.conversations[conversationStore.activeIndex].users
// })

async function handleRemoveMember(userId) {
    let conversationId = conversationStore.conversations[conversationStore.activeIndex]._id
    await conversationStore.removeMemberGroup(conversationId, userId)
    if (conversationStore.err) {
        $toast.error(conversationStore.err)
        return
    }
    await conversationStore.fetchAllConversations()
    $toast.success(conversationStore.result.message)

}
</script>