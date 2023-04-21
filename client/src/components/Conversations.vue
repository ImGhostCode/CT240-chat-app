<template>
  <div class="basis-full overflow-y-scroll" v-if="conversationStore.conversations">
    <div class="px-4 py-2 bg-indigo-600 flex text-white mb-1 cursor-pointer"
      v-for="(conversation, index) in conversationStore.conversations" :key="conversation._id"
      :class="(index === conversationStore.activeIndex) ? 'bg-indigo-800' : 'bg-indigo-600'"
      @click="conversationStore.activeIndex = index">
      <div class="h-[50px] w-[50px] rounded-full overflow-hidden border-2">

        <img
          :src="conversation.isGroupChat ? 'http://localhost:3051/public/images/' + conversation.imgGroup : 'http://localhost:3051/public/images/' + (getSenderFull(authStore.user, conversation.users)?.pic || 'anonymous-avatar.jpg')"
          alt="avatar" class="h-full w-full">
      </div>
      <div class="flex flex-col ml-2">
        <h2 class="text-xl font-semibold">{{ !conversation.isGroupChat
          ? getSender(authStore.user, conversation.users)
          : conversation.conversationName }} </h2>
        <!-- <p v-if="conversation.latestMessage"> {{ conversation.latestMessage.sender._id === authStore.user._id ? 'You' :
          conversation.latestMessage.sender.name }}: {{
    conversation.latestMessage.content.length > 20 ? conversation.latestMessage.content.substring(0, 10) + '...' :
    conversation.latestMessage.content }}</p> -->
      </div>
    </div>
  </div>
  <div class="" v-else-if="conversationStore.err">{{ conversationStore.err }}</div>
  <div class="" v-else-if="conversationStore.isLoading">Loading...</div>
  <div class="" v-else>No conversatons</div>
</template>

<script setup>
import { onMounted, watchEffect, watch, ref } from "vue";
import { useConversationStore } from "../stores/conversation.store";
import { useAuthStore } from "./../stores/auth.store.js";
import { getSender, getSenderFull } from "../utils/ChatLogics";


const conversationStore = useConversationStore()
const authStore = useAuthStore()


onMounted(async () => {

  await conversationStore.fetchAllConversations()

})
</script>
