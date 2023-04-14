<script setup>
import Messages from './Messages.vue';
import Input from './Input.vue';
import MessagesGroup from './MessagesGroup.vue';
import { ref, reactive, onMounted, watchEffect } from 'vue';
import AddMembers from './AddMembers.vue';
import EditGroup from './EditGroup.vue';
import { useConversationStore } from "../stores/conversation.store";
import { useAuthStore } from "./../stores/auth.store.js";
import { useMessageStore } from './../stores/message.store'
import io from "socket.io-client";
import { useToast } from 'vue-toast-notification';
import { getSender } from '../utils/ChatLogics';
const $toast = useToast();
const ENDPOINT = "http://localhost:3051";
const messageStore = useMessageStore()
const conversationStore = useConversationStore()
const authStore = useAuthStore()

let socket
const isShow = reactive({
  more: false,
  addMembers: false,
  editGroup: false
})

function toggleMore() {
  isShow.more = !isShow.more
}

function toggleAddMembers() {
  isShow.addMembers = !isShow.addMembers
}

function toggleEditGroup() {
  isShow.editGroup = !isShow.editGroup
}

async function sendMessage(content) {
  await messageStore.sendAMessage(content, conversationStore.conversations[conversationStore.activeIndex]._id, authStore.user.token)
  // await conversationStore.fetchAllConversations()
  socket.emit("new message", messageStore.newMessage);

}

const socketConnected = ref(false)
const isTyping = ref(false)

onMounted(async () => {

  socket = io(ENDPOINT);
  socket.on("message recieved", async (newMessageRecieved) => {
    messageStore.messages.push(newMessageRecieved)
    await conversationStore.fetchAllConversations()
  });
  watchEffect(async () => {
    socket.emit("setup", authStore.user);
    socket.on("connected", () => socketConnected.value = true);
    socket.on("typing", () => isTyping.value = true);
    socket.on("stop typing", () => isTyping.value = false);

    if (conversationStore.activeIndex !== null) {
      socket.emit("join chat", conversationStore.conversations[conversationStore.activeIndex]._id);
      await messageStore.fetchMessages(conversationStore.conversations[conversationStore.activeIndex]._id, authStore.user.token)
    }

  })

})

</script>


<template>
  <div class="basis-2/3 flex flex-col" v-if="conversationStore.activeIndex !== null">
    <div class="h-[50px] bg-indigo-800 text-white w-full flex justify-between items-center px-3 py-8">
      <h2 class="text-2xl">{{ !conversationStore.conversations[conversationStore.activeIndex].isGroupChat
        ? getSender(authStore.user, conversationStore.conversations[conversationStore.activeIndex].users)
        : conversationStore.conversations[conversationStore.activeIndex].conversationName }}</h2>
      <div class="flex relative">
        <span class="mx-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </span>

        <span class="mx-2 cursor-pointer " @click="toggleMore">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </span>

        <ul v-if="isShow.more" class="absolute right-0 top-full bg-white shadow-lg w-40 rounded-sm text-black">
          <li class="p-3 flex mb-1 cursor-pointer shadow-sm text-red-600"><span class="inline-block cursor-pointer mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </span>
            Unfriend
          </li>
          <div class="group" v-if="conversationStore.conversations[conversationStore.activeIndex].isGroupChat">

            <li @click="toggleAddMembers" class="p-3 flex mb-1 cursor-pointer shadow-sm"><span
                class="inline-block cursor-pointer mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </span>
              Invite
            </li>
            <li @click="toggleEditGroup" class="p-3 flex mb-1 cursor-pointer shadow-sm">
              <span class="inline-block cursor-pointer mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

              </span>
              Edit group
            </li>
            <li class="p-3 flex mb-1 cursor-pointer shadow-sm text-red-600">
              <span class="inline-block cursor-pointer mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </span>
              Delete group
            </li>
          </div>

        </ul>

      </div>
    </div>

    <Messages v-if="!conversationStore.conversations[conversationStore.activeIndex].isGroupChat" />
    <MessagesGroup v-if="conversationStore.conversations[conversationStore.activeIndex].isGroupChat" />
    <Input :sendMessage="sendMessage" />
  </div>
  <div class="" v-else-if="conversationStore.err">{{ conversationStore.err }}</div>
  <div class="" v-else-if="conversationStore.isLoading">Loading...</div>
  <div class=" h-full w-full flex justify-center items-center font-semibold text-2xl text-gray-400" v-else>Select a
    conversation to
    start chat</div>

  <AddMembers v-if="isShow.addMembers" @show="toggleAddMembers" />
  <EditGroup v-if="isShow.editGroup" @show="toggleEditGroup" />
</template>
