<template>
    <div class="basis-1/3 flex flex-col bg-indigo-600">
        <NavBar />
        <Search :handleSearch="handleSearch" />

        <SearchResult v-if="authStore.searchResult" :users="authStore.searchResult" @handleClick="handleClick" />
        <Conversations v-else />


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

let timeout
const authStore = useAuthStore()
async function handleSearch(value) {
    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
        if (value) {
            await authStore.search(value, false)
        } else {
            authStore.searchResult = null
        }
    }, 300);

}

async function handleClick(userId) {
    authStore.searchResult = null
    await conversationStore.accessConversation(userId)


}
</script>