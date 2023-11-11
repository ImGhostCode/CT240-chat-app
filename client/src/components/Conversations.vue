<template>
  <div class="overflow-y-scroll no-scrollbar" v-if="conversationStore.conversations">
    <div class="px-2 py-2 bg-indigo-600 flex text-white mb-1 cursor-pointer gap-2"
      v-for="(conversation, index) in conversationStore.conversations" :key="conversation._id"
      :class="(index === conversationStore.activeIndex) ? 'bg-indigo-800' : 'bg-indigo-600'" @click="() => {
        conversationStore.activeIndex = index
        conversationStore.currConversation = conversation._id
      }">
      <div class="h-[50px] w-[50px] rounded-full overflow-hidden border-2 shrink-0">
        <img alt="avatar" class="h-full w-full"
          :src="conversation.isGroupChat ? ENDPOINT + '/public/images/' + conversation.imgGroup : ENDPOINT + '/public/images/' + (getSenderFull(authStore.user, conversation.users)?.pic || 'anonymous-avatar.jpg')">
      </div>
      <div class="flex flex-col w-[100%]">
        <h2 class="text-xl font-semibold mb-[0.5px]">
          {{ !conversation.isGroupChat ? getSender(authStore.user, conversation.users) : conversation.conversationName }}
        </h2>
        <div class="flex text-xs w-[100%] justify-between" v-if="conversation.latestMessage">
          <div class="truncate w-[80%] max-w-[150px] basis-2/3"
            :class="authStore.user._id !== conversation.latestMessage.sender?._id ? '' : 'text-yellow-400'">
            {{ authStore.user._id == conversation.latestMessage.sender._id ? 'You: ' : '' }}
            {{ conversation.latestMessage.isImage ? '[Image]' : conversation.latestMessage.content }}
          </div>
          <div>
            {{ moment(conversation.latestMessage.updatedAt).format('LT') }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="conversationStore.err">{{ conversationStore.err }}</div>
  <div v-else-if="conversationStore.isLoading">Loading...</div>
  <div v-else>No conversatons</div>
</template>

<script setup>
import moment from 'moment'
import { onMounted, watchEffect } from "vue";
import { useConversationStore } from "../stores/conversation.store";
import { useAuthStore } from "./../stores/auth.store";
import { getSender, getSenderFull } from "../utils/ChatLogics";

const ENDPOINT = import.meta.env.VITE_API_URL

const conversationStore = useConversationStore()
const authStore = useAuthStore()

onMounted(async () => {
  await conversationStore.fetchAllConversations()
  authStore.getUserInfo()
})

watchEffect(() => {
  if (conversationStore.conversations) {
    conversationStore.conversations.forEach((e, i) => {
      if (e._id == conversationStore.currConversation) conversationStore.activeIndex = i
    })
  }
})
</script>