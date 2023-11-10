<script setup>
import { onUpdated, ref, watch } from "vue";
import { useMessageStore } from './../stores/message.store'
import Message from "./Message.vue";

const messageStore = useMessageStore()

const scroll_bottom = ref(null)

onUpdated(() => {
   scrollToBottom()
})

watch(messageStore.messages, () => {
   scrollToBottom()
}, {
   deep: true
})

function scrollToBottom() {
   scroll_bottom.value.scrollTop = scroll_bottom.value.scrollHeight;
}
</script>

<template>
   <div ref="scroll_bottom" class="bg-slate-200 basis-full overflow-y-scroll no-scrollbar w-full"
      v-if="messageStore.messages">
      <Message v-for="message in messageStore.messages" :key="message._id" :info="message" />
   </div>
   <div class="" v-else-if="messageStore.err">{{ messageStore.err }}</div>
   <div class="" v-else-if="messageStore.isLoading">Loading...</div>
</template>