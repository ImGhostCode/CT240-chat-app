<template>
    <input type="text" placeholder="Find a user"
        class="p-3 bg-transparent outline-none placeholder:text-white border-b-2 border-slate-400 text-white"
        @input="$events => props.handleSearch($events.target.value)">
</template>

<script setup>
const props = defineProps(['handleSearch'])
</script>