<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex justify-center items-center">
        <div class="bg-white p-6 relative  w-80 shadow-lg rounded-lg">
            <span class="absolute right-0 p-2 mx-3 cursor-pointer" @click="$emit('show')"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
            <h3 class="text-2xl font-bold mb-3">New group</h3>
            <input type="text" placeholder="Name group..." class="p-4 border outline-none w-full mb-3" v-model="nameGroup">
            <input type="text" placeholder="Search users..." class="p-4 border outline-none w-full mb-3"
                @input="$event => handleSearchUser($event.target.value)">
            <div class="basis-full overflow-y-scroll max-h-64" v-if="authStore.searchMembersResult">
                <div v-for="member in authStore.searchMembersResult" :key="member._id"
                    class="px-4 py-2 bg-indigo-700 flex-col text-white mb-2 cursor-pointer rounded-md shadow-md items-center">
                    <label :for="member._id">
                        <div class="flex items-center justify-between ">
                            <div class="flex items-center">
                                <div class="h-[30px] w-[30px] rounded-full overflow-hidden">
                                    <img :src="ENDPOINT + '/public/images/' + member.pic" :alt="member.name"
                                        class="h-full w-full">
                                </div>
                                <div class="flex flex-col ml-2 items-center justify-center">
                                    <h2 class="text-xl font-semibold">{{ member.name }}</h2>
                                </div>
                            </div>
                            <input type="checkbox" :name="member._id" :id="member._id" :value="member._id"
                                v-model="addedMembers"
                                class=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                    </label>
                </div>
            </div>
            <button class="bg-blue-600 text-white text-lg font-bold w-full px-3 py-2 rounded-sm" @click="handleCreateGroup">
                Create
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store'
import { useConversationStore } from '../stores/conversation.store'
import { useToast } from 'vue-toast-notification';

const emits = defineEmits(['show'])

const authStore = useAuthStore()
const conversationStore = useConversationStore()
const $toast = useToast()

const addedMembers = ref([])
const nameGroup = ref(null)

const ENDPOINT = import.meta.env.VITE_API_URL

let timeout
async function handleSearchUser(value) {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
        if (value) {
            await authStore.search(value, 'Group')
        } else {
            authStore.searchMembersResult = null
        }
    }, 300);
}

async function handleCreateGroup() {
    if (!nameGroup.value) {
        $toast.error('Name group is required!')
        return
    }
    if (addedMembers.value.length < 2) {
        $toast.error('More than 2 users are required to form a group chat')
        return
    }
    await conversationStore.createAGroup(nameGroup.value, addedMembers.value)
    nameGroup.value = null
    addedMembers.value = []
    if (conversationStore.err) {
        $toast.error(conversationStore.err)
        return
    }
    $toast.success(conversationStore.result.message)
    emits('show')
}
</script>