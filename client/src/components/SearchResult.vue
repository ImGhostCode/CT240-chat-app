<template>
    <div class="basis-full overflow-y-scroll no-scrollbar" v-if="props.users">
        <div @click="$event => emits('handleClick', user._id)"
            class="px-4 py-2 bg-indigo-700 flex-col text-white mb-2 cursor-pointer shadow-md" v-for="user in props.users"
            :key="user._id">
            <div class="flex mb-2">
                <div class="h-[50px] w-[50px] rounded-full overflow-hidden">
                    <img :src="ENDPOINT + '/public/images/' + user.pic" alt="avatar" class="h-full w-full">
                </div>
                <div class="flex flex-col ml-2 items-center justify-center">
                    <h2 class="text-xl font-semibold">{{ user.name }}</h2>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="!props.users">No users</div>
    <div v-else>Loading...</div>
</template>

<script setup>
const props = defineProps(['users'])
const emits = defineEmits(['handleClick'])

const ENDPOINT = import.meta.env.VITE_API_URL
</script>