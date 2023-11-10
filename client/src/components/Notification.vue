<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/user.store';
import { useToast } from 'vue-toast-notification';

const userStore = useUserStore()
const $toast = useToast()

const ENDPOINT = import.meta.env.VITE_API_URL

const friendsRequest = ref(null)

const handleGetFriendRequest = async () => {
    friendsRequest.value = await userStore.getFriendsRequest()
    if (!userStore.err) {
        friendsRequest.value = userStore.result.data
    }
}

const handleConfirm = async (friendId) => {
    await userStore.confirmFriendRequest({ friendId })
    if (userStore.err) {
        $toast.error(userStore.err)
        return
    }
    $toast.success(userStore.result.message)
    await handleGetFriendRequest()
}

const handleDelete = async (friendId) => {
    await userStore.deleteFriendRequest({ friendId })
    if (userStore.err) {
        $toast.error(userStore.err)
        return
    }
    $toast.success(userStore.result.message)
    await handleGetFriendRequest()
}

onMounted(async () => {
    await handleGetFriendRequest()
})
</script>

<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex  justify-center items-center">
        <div class="bg-white p-6 relative w-[600px] shadow-lg rounded-lg max-h-[800px] flex flex-col">
            <span class="absolute right-0 p-2 mx-3 cursor-pointer" @click="$emit('show')"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
            <h3 class="text-2xl font-bold mb-3">Notification</h3>
            <ul class=" overflow-y-scroll no-scrollbar basis-full">
                <li class="text-center text-sm my-2 text-red-500" v-if="!friendsRequest || !friendsRequest.length">
                    Nonotifications
                </li>
                <li v-else v-for="friend in friendsRequest" :key="friend._id"
                    class=" p-2 rounded-sm flex justify-between font-semibold mb-2">
                    <div class="flex items-center ">
                        <div class="h-[40px] w-[40px] rounded-full overflow-hidden mr-4 border-2 border-indigo-600">
                            <img :src="ENDPOINT + '/public/images/' + friend.pic" :alt="friend.name" class="h-full w-full">
                        </div>
                        <span class="text-blue-600">{{ friend.name }} &nbsp;</span> has sent a friend request.
                    </div>
                    <div class="flex">
                        <button class="border-none outline-none text-blue-700 mr-3"
                            @click="$event => handleConfirm(friend._id)">
                            Confirm
                        </button>
                        <button class="border-none outline-none text-red-700 mr-3"
                            @click="$event => handleDelete(friend._id)">
                            Delete
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>