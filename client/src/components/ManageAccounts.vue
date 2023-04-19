<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toast-notification';

const authStore = useAuthStore()
const $toast = useToast();

let timeout
async function handleSearch(value) {
    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
        if (value) {
            await authStore.search(value, 'Account')

        } else {
            await authStore.search('', 'Account')
        }
    }, 300);

}

async function handleDelete(userId) {
    await authStore.deleteAccount(userId)
    if (authStore.err) {
        $toast.error(authStore.err)
        return
    }

    $toast.success(authStore.result.message)
    await authStore.search('', 'Account')
}



onMounted(async () => {
    await authStore.search('', 'Account')


})
</script>

<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex  justify-center items-center">
        <div class="bg-white p-6 relative w-[400px] shadow-lg rounded-lg max-h-[600px] flex flex-col">
            <span class="absolute right-0 p-2 mx-3 cursor-pointer" @click="$emit('show')"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
            <h3 class="text-2xl font-bold mb-3">Manage Accounts</h3>
            <input type="text" placeholder="Name.." class="p-4 border outline-none w-full mb-3"
                @input="$events => handleSearch($events.target.value)">

            <ul class=" overflow-y-scroll basis-full">
                <li v-for="acc in authStore.searchAccountResult"
                    class="bg-gray-300 p-2 rounded-sm flex justify-between font-semibold mb-2">
                    <div class="flex items-center ">
                        <div class="h-[50px] w-[50px] rounded-full overflow-hidden mr-4">
                            <img :src="acc.pic" :alt="acc.name" class="h-full w-full">
                        </div>
                        {{ acc.name }}
                    </div>
                    <button class="border-none outline-none text-green-800 mr-3" @click="$event => handleDelete(acc._id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </li>

            </ul>
        </div>
    </div>
</template>


