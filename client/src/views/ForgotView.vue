<template>
    <div class=" w-80 bg-white rounded-xl shadow-md">
        <form @submit.prevent="handleResetPassword" class="flex flex-col text-center px-8 py-3">
            <h2 class="text-2xl font-semibold text-blue-500 my-4">Forgot Password</h2>
            <input v-model="email" type="email" placeholder="Email"
                class="px-2 py-3 border-b-2 outline-none border-slate-400 mb-4">
            <input v-model="newPassword" type="password" placeholder="New password"
                class="px-2 py-3 border-b-2 outline-none border-slate-400 mb-4">
            <div class="flex flex-row  gap-2 w-full mb-4">
                <input v-model="code" type="number" placeholder="XXXXXX"
                    class="w-2/3 shrink border-b-2 outline-none border-slate-400 px-2">
                <button type="button" @click="handleSendVerifyCode"
                    class="grow shrink-0 bg-blue-600 text-white text-sm font-semibold rounded-md p-3 mb-2">Send
                    code</button>
            </div>
            <button :disabled="authStore.isLoading" type="submit"
                class="w-full bg-blue-600 text-white text-md font-semibold rounded-md p-3 mb-2">Change Password</button>
            <p class="text-sm"><router-link :to="{ name: 'login', params: {} }" class=" text-blue-400">Cancel</router-link>
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "./../stores/auth.store.js";
import { useToast } from 'vue-toast-notification';
import { useRouter } from "vue-router";

const authStore = useAuthStore()
const $toast = useToast();
const router = useRouter()

const email = ref(null)
const newPassword = ref(null)
const code = ref(null)

async function handleSendVerifyCode() {
    if (!email.value || !newPassword.value) {
        $toast.warning('Please fill all the fields');
        return
    }
    await authStore.sendVerifyCode({ email: email.value })
    if (authStore.err) {
        $toast.error(authStore.err);
        return
    }
    $toast.success(authStore.result.message);
}

async function handleResetPassword() {
    if (!email.value || !newPassword.value || !code.value) {
        $toast.warning('Please fill all the fields ');
        return
    }
    await authStore.resetPassword({ email: email.value, newPassword: newPassword.value, code: code.value })
    if (authStore.err) {
        $toast.error(authStore.err);
        return
    }
    $toast.success(authStore.result.message);
    router.push({ name: 'login' })
}
</script>