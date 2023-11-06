<template>
    <div @submit.prevent="handleRegister" class="w-80 bg-white rounded-xl shadow-md">
        <form class="flex flex-col text-center px-8 py-3">
            <h2 class="text-2xl font-semibold text-blue-500 my-4">Register Chat</h2>
            <input v-model="name" type="text" placeholder="username"
                class="px-2 py-3 border-b-2 outline-none border-slate-400 mb-4">
            <input v-model="email" type="email" placeholder="email"
                class="px-2 py-3 border-b-2 outline-none border-slate-400 mb-4">
            <input v-model="password" type="password" placeholder="password"
                class="px-2 py-3 border-b-2  outline-none border-slate-400 mb-4">
            <button :disabled="authStore.isLoading" type="submit"
                class="w-full bg-blue-600 text-white text-md font-semibold rounded-md p-3 mb-2">Sign
                up</button>
            <p class="text-sm">You already have an account? <router-link :to="{ name: 'login', params: {} }"
                    class="underline text-blue-400">Login</router-link></p>
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
const name = ref(null)
const email = ref(null)
const password = ref(null)
async function handleRegister() {
    if (!name.value || !email.value || !password.value) {
        $toast.warning('Please fill all the fields ');
        return
    }
    await authStore.register({ name: name.value, email: email.value, password: password.value })

    if (authStore.err) {
        $toast.error(authStore.err);
        return
    }
    $toast.success(authStore.result.message);
    router.push({ name: 'login' })
}
</script>
