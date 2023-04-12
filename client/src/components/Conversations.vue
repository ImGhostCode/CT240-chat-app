<template>
  <div class="basis-full overflow-y-scroll" v-if="conversationStore.conversations">
    <div class="px-4 py-2 bg-indigo-600 flex text-white mb-1 cursor-pointer"
      v-for="(conversation, index) in conversationStore.conversations" :key="conversation._id"
      :class="(index === conversationStore.activeIndex) ? 'bg-indigo-800' : 'bg-indigo-600'"
      @click="conversationStore.activeIndex = index">
      <div class="h-[50px] w-[50px] rounded-full overflow-hidden">
        <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
          class="h-full w-full">
      </div>
      <div class="flex flex-col ml-2">
        <h2 class="text-xl font-semibold">{{ conversation.conversationName }}</h2>
        <p v-if="conversation.latestMessage">{{ conversation.latestMessage.sender.name }}: {{
          conversation.latestMessage.content }}</p>
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


const conversationStore = useConversationStore()


onMounted(async () => {
  const authStore = useAuthStore()

  await conversationStore.fetchAllConversations(authStore.user.token)


})
</script>
