<template>
    <div class="basis-full overflow-y-scroll" v-if="props.users">
        <div @click="$event => emits('handleClick', user._id)"
            class="px-4 py-2 bg-indigo-700 flex-col text-white mb-2 cursor-pointer shadow-md" v-for="user in props.users"
            :key="user._id">
            <div class="flex mb-2">
                <div class="h-[50px] w-[50px] rounded-full overflow-hidden">

                    <img :src="user.pic" alt="avatar" class="h-full w-full">
                </div>
                <div class="flex flex-col ml-2 items-center justify-center">
                    <h2 class="text-xl font-semibold">{{ user.name }}</h2>
                </div>
            </div>
        </div>

        <!-- <div class="px-4 py-2 bg-indigo-700 flex-col text-white mb-2 cursor-pointer shadow-md">
            <div class="flex mb-2">
                <div class="h-[50px] w-[50px] rounded-full overflow-hidden">

                    <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
                        class="h-full w-full">
                </div>
                <div class="flex flex-col ml-2 items-center justify-center">
                    <h2 class="text-xl font-semibold">test</h2>
                </div>
            </div>
        </div>

        <div class="px-4 py-2 bg-indigo-700 flex-col text-white mb-2 cursor-pointer shadow-md">
            <div class="flex mb-2">
                <div class="h-[50px] w-[50px] rounded-full overflow-hidden">

                    <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
                        class="h-full w-full">
                </div>
                <div class="flex flex-col ml-2 items-center justify-center">
                    <h2 class="text-xl font-semibold">test</h2>
                </div>
            </div>
        </div> -->
    </div>

    <div class="" v-else-if="!props.users">No users</div>
    <div class="" v-else>Loading...</div>
</template>

<script setup>
// import { useConversationStore } from '../stores/conversation.store';
// const conversationStore = useConversationStore()
const props = defineProps(['users'])
const emits = defineEmits(['handleClick'])

// async function accessConversation(userId) {
//     await conversationStore.accessConversation(userId)

// }
</script>