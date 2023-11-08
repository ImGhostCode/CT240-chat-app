<script setup>
import { onMounted } from 'vue';
import Conversation from '../components/Conversation.vue';
import SideBar from '../components/SideBar.vue';
import { useAuthStore } from '../stores/auth.store'

const authStore = useAuthStore()

onMounted(() => {
  setInterval(() => {
    authStore.checkToken()
  }, 60000)
})
</script>

<template>
  <div class="w-[65%] h-[80%] bg-white flex overflow-hidden rounded-lg relative">
    <SideBar />
    <Conversation />
  </div>
</template>
