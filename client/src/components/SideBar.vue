
import Chat from './Chat.vue';


import Search from './Search.vue';


import NavBar from './NavBar.vue';

<template>
    <div class="basis-1/3 flex flex-col bg-indigo-600">
        <NavBar />
        <Search />
        <Conversations />
       <More/>
    </div>
</template>

<script setup>
import NavBar from './NavBar.vue'
import Search from './Search.vue'
import Conversations from './Conversations.vue'
import More from './More.vue';
</script>