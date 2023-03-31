<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex justify-center items-center">
        <div class="bg-white p-6 relative  w-80 shadow-lg rounded-lg">
            <span class="absolute right-0 p-2 mx-3 cursor-pointer" @click="$emit('toggleNewGroup')"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
            <h3 class="text-2xl font-bold mb-3">New group</h3>
            <input type="text" placeholder="Name group..." class="p-4 border outline-none w-full mb-3">
            <button class="bg-blue-600 text-white text-lg font-bold w-full px-3 py-2 rounded-sm ">Add</button>
        </div>
    </div>
</template>

<script setup>
</script>