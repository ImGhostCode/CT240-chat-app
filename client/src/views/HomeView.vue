<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth.store'
import Conversation from '../components/Conversation.vue';
import SideBar from '../components/SideBar.vue';

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkToken()
  setInterval(() => {
    authStore.checkToken()
  }, 60000)
})
</script>

<template>
  <div class="w-[65%] h-[80%] bg-white flex overflow-hidden rounded-lg relative">
    <SideBar class="grow-0" />
    <Conversation />
  </div>
</template>