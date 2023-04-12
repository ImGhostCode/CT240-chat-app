<template>
    <div class="my-3 flex items-center p-3" v-if="props.info"
        :class="props.info.sender._id === authStore.user._id ? 'flex-row-reverse' : 'flex-row'">
        <div class="h-10 w-10 rounded-full overflow-hidden">
            <img :src="props.info.sender.pic" :alt="props.info.sender.name" class="h-full w-full">
        </div>

        <div class="mx-4  text-black flex flex-col rounded-lg py-2 px-3"
            :class="props.info.sender._id === authStore.user._id ? 'message_right' : 'message_left'">{{ props.info.content
            }}
            <span class="text-xs ">{{ moment(props.info.updatedAt).format('LT') }}</span>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment'
import { useAuthStore } from "./../stores/auth.store.js";
import { ref } from 'vue';
const authStore = useAuthStore()
const props = defineProps(['info'])

</script>