<script setup>
import Conversation from '../components/Conversation.vue';
import SideBar from '../components/SideBar.vue';
</script>

<template>
  <div class="w-[65%] h-[80%] bg-white flex overflow-hidden rounded-lg relative">
    <SideBar />
    <Conversation />
    <!-- <h1 class="flex justify-center items-center w-full text-3xl text-slate-300">Choose a chat to start conversation</h1> -->
  </div>
</template>
