<template>
    <div
        class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex justify-center items-center z-10 overflow-hidden">
        <form @submit.prevent="handleSubmit" class="bg-white p-6 w-80 shadow-lg rounded-lg " enctype="multipart/form-data">
            <h3 class="text-2xl font-bold mb-3">Edit profile</h3>
            <input type="text" :value="authStore.user.name" class="p-3 border-b-[1px] outline-none w-full mb-3" disabled>
            <input v-model="newPassword" type="password" placeholder="password" class="p-3 border outline-none w-full mb-3">
            <input v-model="re_newPassword" type="password" placeholder="re-password"
                class="p-3 border outline-none w-full mb-3">
            <label for="image" class="h-20 w-20 block mx-auto rounded-full overflow-hidden mb-2 cursor-pointer">
                <img :src="url ? url : ENDPOINT + '/public/images/' + authStore.user.pic" alt="avatar"
                    class="h-full w-full">
            </label>
            <input type="file" name="image" id="image" accept="image/png, image/jpeg" @change="onFileSelected" class="mb-3"
                hidden>
            <button class="bg-blue-600 text-white text-lg font-bold px-3 py-2 rounded-sm" type="submit"
                :disabled="!newPassword && !selectedFile">Submit</button>
            <button @click="$emit('show')"
                class="bg-gray-400 text-white text-lg font-bold px-3 py-2 rounded-sm mx-2">Cancel</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore()
const selectedFile = ref(null)
const url = ref(null)
const $toast = useToast();
const emits = defineEmits(['show'])
const newPassword = ref(null)
const re_newPassword = ref(null)

const ENDPOINT = import.meta.env.VITE_API_URL

const onFileSelected = (event) => {
    selectedFile.value = event.target.files[0]
    url.value = URL.createObjectURL(selectedFile.value)
}

async function handleSubmit() {
    const image = new FormData()
    if (selectedFile.value) {
        image.append('image', selectedFile.value)
    }
    if (newPassword.value) {
        if (newPassword.value === re_newPassword.value)
            image.append('newPassword', JSON.stringify(newPassword.value))
        else {
            $toast.error('New password and re-password don\'t match')
            return
        }
    }
    await authStore.editAccount(authStore.user._id, image)
    if (authStore.err) {
        $toast.error(authStore.err)
        return
    }
    $toast.success(authStore.result.message)
    emits('show')
}
</script>