<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/user.store';
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toast-notification';

const authStore = useAuthStore()
const userStore = useUserStore()
const $toast = useToast();

const ENDPOINT = import.meta.env.VITE_API_URL

const friendsList = ref([])

const handleRemoveFriend = async (friendId) => {
    if (confirm('Are you sure ?')) {
        await userStore.deleteFriend({ friendId })
        if (userStore.err) {
            $toast.error(userStore.err)
            return
        }
        $toast.success(userStore.result.message)
        await handleGetFriendsList()
        await authStore.getUserInfo()
    }
}

const handleGetFriendsList = async () => {
    await userStore.getFriendsList()
    if (!userStore.err) {
        friendsList.value = userStore.result.data
    }
}

onMounted(async () => {
    await handleGetFriendsList()
})
</script>

<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex  justify-center items-center">
        <div class="bg-white p-6 relative w-[400px] shadow-lg rounded-lg max-h-[500px] flex flex-col">
            <span class="absolute right-0 p-2 mx-3 cursor-pointer" @click="$emit('show')"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
            <h3 class="text-2xl font-bold mb-3">Friends</h3>
            <ul class=" overflow-y-scroll no-scrollbar basis-full">
                <li v-if="!friendsList || !friendsList.length" class="text-center text-sm my-2 text-red-500">Empty list</li>
                <li v-else v-for="friend in friendsList" :key="friend._id"
                    class="bg-gray-300 p-2 rounded-sm flex justify-between font-semibold mb-2">
                    <div class="flex items-center ">
                        <div class="h-[50px] w-[50px] rounded-full overflow-hidden mr-4 border-2 border-indigo-600">
                            <img :src="ENDPOINT + '/public/images/' + friend.pic" :alt="friend.name" class="h-full w-full">
                        </div>
                        {{ friend.name }}
                    </div>
                    <button class="border-none outline-none text-red-700 mr-3"
                        @click="$event => handleRemoveFriend(friend._id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>