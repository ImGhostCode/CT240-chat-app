<template>
    <div class="basis-1/4 flex flex-col bg-indigo-600">
        <NavBar />
        <Search :handleSearch="handleSearch" />
        <SearchResult class="grow" v-if="authStore.searchUserResult" :users="authStore.searchUserResult"
            @handleClick="handleClick" />
        <Conversations v-else class="grow" />
        <More />
    </div>
</template>

<script setup>
import NavBar from './NavBar.vue'
import Search from './Search.vue'
import Conversations from './Conversations.vue'
import More from './More.vue';
import SearchResult from './SearchResult.vue';
import { useAuthStore } from '../stores/auth.store'
import { useConversationStore } from '../stores/conversation.store';

const conversationStore = useConversationStore()
const authStore = useAuthStore()

let timeout
async function handleSearch(value) {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
        if (value) {
            await authStore.search(value, '')
        } else {
            authStore.searchUserResult = null
        }
    }, 300);
}

async function handleClick(userId) {
    authStore.searchUserResult = null
    await conversationStore.accessConversation(userId)
}
</script>