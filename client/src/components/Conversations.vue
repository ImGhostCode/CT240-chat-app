<template>
  <div class="basis-full overflow-y-scroll no-scrollbar" v-if="conversationStore.conversations">
    <div class="px-4 py-2 bg-indigo-600 flex text-white mb-1 cursor-pointer"
      v-for="(conversation, index) in conversationStore.conversations" :key="conversation._id"
      :class="(index === conversationStore.activeIndex) ? 'bg-indigo-800' : 'bg-indigo-600'"
      @click="conversationStore.activeIndex = index">
      <div class="h-[50px] w-[50px] rounded-full overflow-hidden border-2">
        <img alt="avatar" class="h-full w-full"
          :src="conversation.isGroupChat ? ENDPOINT + '/public/images/' + conversation.imgGroup : ENDPOINT + '/public/images/' + (getSenderFull(authStore.user, conversation.users)?.pic || 'anonymous-avatar.jpg')">
      </div>
      <div class="flex flex-col ml-2">
        <h2 class="text-xl font-semibold">{{
          !conversation.isGroupChat ? getSender(authStore.user, conversation.users) : conversation.conversationName }}
        </h2>
      </div>
    </div>
  </div>
  <div v-else-if="conversationStore.err">{{ conversationStore.err }}</div>
  <div v-else-if="conversationStore.isLoading">Loading...</div>
  <div v-else>No conversatons</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useConversationStore } from "../stores/conversation.store";
import { useAuthStore } from "./../stores/auth.store";
import { getSender, getSenderFull } from "../utils/ChatLogics";

const ENDPOINT = import.meta.env.VITE_API_URL

const conversationStore = useConversationStore()
const authStore = useAuthStore()

onMounted(async () => {
  await conversationStore.fetchAllConversations()
})
</script>