<template>
    <div class="h-[50px] flex justify-between items-center bg-indigo-800 text-white px-3 py-8">
        <h3 class="text-2xl font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="inline w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <span>Chat</span>
        </h3>
        <div class="flex justify-center items-center" v-if="authStore.user">
            <div @click="toggleEditProfile" class="h-8 w-8 rounded-full overflow-hidden mr-3 cursor-pointer border">
                <img :src="ENDPOINT + '/public/images/' + authStore.user.pic" alt="avatar" class="h-full w-full">
            </div>
            <div class="text-lg mr-3 truncate max-w-[100px]">{{ authStore.user.name }}</div>
            <button @click="LogoutHandle" class="border outline-none px-1 py-2 font-semibold rounded">Logout</button>
        </div>
    </div>
    <Profile v-if="isShowEditProfile" @show="toggleEditProfile" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import Profile from './Profile.vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toast-notification';

const isShowEditProfile = ref(false)
const authStore = useAuthStore()
const $toast = useToast()
const router = useRouter()

const ENDPOINT = import.meta.env.VITE_API_URL

function toggleEditProfile() {
    isShowEditProfile.value = !isShowEditProfile.value
}

const LogoutHandle = async () => {
    await authStore.logout()
    if (authStore.err) {
        $toast.error(authStore.err);
        return
    }
    $toast.success(authStore.result.message);
    router.push({ name: 'login' })
}
</script>