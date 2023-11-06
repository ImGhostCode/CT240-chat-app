<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toast-notification';

const authStore = useAuthStore()
const $toast = useToast();

let timeout
async function handleSearch(value) {
    if (timeout) { clearTimeout(timeout); }
    timeout = setTimeout(async () => {
        if (value) {
            await authStore.search(value, 'Account')
        } else {
            await authStore.search('', 'Account')
        }
    }, 300);
}

async function handleDelete(userId) {
    if (confirm('Are you sure ?')) {
        await authStore.deleteAccount(userId)
        if (authStore.err) {
            $toast.error(authStore.err)
            return
        }
        $toast.success(authStore.result.message)
        await authStore.search('', 'Account')
    }
}

async function handleAction(userId) {
    if (confirm('Are you sure ?')) {
        await authStore.deleteAccount(userId)
        if (authStore.err) {
            $toast.error(authStore.err)
            return
        }
        $toast.success(authStore.result.message)
        await authStore.search('', 'Account')
    }
}

onMounted(async () => {
    //await authStore.search('', 'Account')
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
                <!-- <li v-for="acc in authStore.searchAccountResult" -->
                <!-- <li class="bg-gray-300 p-2 rounded-sm flex justify-between font-semibold mb-2">
                    <div class="flex items-center ">
                        <div class="h-[50px] w-[50px] rounded-full overflow-hidden mr-4 border-2 border-indigo-600">
                            <img :src="'http://localhost:3051/public/images/' + acc.pic" :alt="acc.name"
                                class="h-full w-full">
                        </div>
                        {{ acc.name }}
                    </div>
                    <button class="border-none outline-none text-red-700 mr-3" @click="$event => handleDelete()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    </button>
                </li> -->

                <li class=" p-2 rounded-sm flex justify-between font-semibold mb-2">
                    <div class="flex items-center ">
                        <div class="h-[40px] w-[40px] rounded-full overflow-hidden mr-4 border-2 border-indigo-600">
                            <img :src="test" :alt="name" class="h-full w-full">
                        </div>
                        <span class="text-blue-600">Quoc Trang &nbsp;</span> has sent a friend request.
                    </div>
                    <div class="flex">
                        <button class="border-none outline-none text-blue-700 mr-3" @click="$event => handleAction()">
                            Confirm
                        </button>
                        <button class="border-none outline-none text-red-700 mr-3" @click="$event => handleAction()">
                            Delete
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


