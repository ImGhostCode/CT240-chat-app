<template>
    <div
        class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex justify-center items-center z-10 overflow-hidden">
        <form @submit.prevent="handleSubmit" class="bg-white p-6 w-80 shadow-lg rounded-lg " enctype="multipart/form-data">
            <h3 class="text-2xl font-bold mb-3">Edit Group</h3>
            <input v-model="newName" type="text" class="p-3 border-b-[1px] outline-none w-full mb-3">
            <label for="image"
                class="h-20 w-20 block border-[3px] border-gray-400 rounded-full mx-auto overflow-hidden mb-2 cursor-pointer">
                <img :src="url || ENDPOINT + '/public/images/' + conversationStore.conversations[conversationStore.activeIndex].imgGroup || 'https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg'"
                    alt="avatar" class="h-full w-full">
            </label>
            <input hidden type="file" name="image" id="image" accept="image/png, image/jpeg" @change="onFileSelected"
                class="mb-3">
            <button type="submit" class="bg-blue-600 text-white text-lg font-bold px-3 py-2 rounded-sm">Submit</button>
            <button @click="$emit('show')"
                class="bg-gray-400 text-white text-lg font-bold px-3 py-2 rounded-sm mx-2">Cancel</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConversationStore } from '../stores/conversation.store';
import { useToast } from 'vue-toast-notification';
const conversationStore = useConversationStore()
const newName = ref(conversationStore.conversations[conversationStore.activeIndex].conversationName)
const selectedFile = ref(null)
const url = ref(null)
const $toast = useToast();
const emits = defineEmits(['show'])

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
    image.append('conversationId', JSON.stringify(conversationStore.conversations[conversationStore.activeIndex]._id))
    image.append('newConversationName', JSON.stringify(newName.value))
    await conversationStore.editGroup(image)
    if (conversationStore.err) {
        $toast.error(conversationStore.err)
        return
    }
    $toast.success(conversationStore.result.message)
    emits('show')
    await conversationStore.fetchAllConversations()
}

</script>