<script setup>
import { onMounted, onUpdated, ref, toRefs, watch, watchEffect } from "vue";
import { useMessageStore } from './../stores/message.store'
import Message from "./Message.vue";

const messageStore = useMessageStore()
const scroll_bottom = ref(null)
onMounted(async () => {
})

onUpdated(() => {
   scrollToBottom()

})

watch(messageStore.messages, () => {
   // scroll_bottom.value.scrollIntoView({ behavior: "smooth" })
   scrollToBottom()


}, {
   deep: true
})

watchEffect(async () => {

})

function scrollToBottom() {
   scroll_bottom.value.scrollTop = scroll_bottom.value.scrollHeight;
}

</script>

<template>
   <div ref="scroll_bottom" class="bg-slate-200 basis-full overflow-y-scroll " v-if="messageStore.messages">
   <div class="" v-for="message in messageStore.messages" :key="message._id">
      <Message :info="message" />
   </div>
   <!-- <div class="my-3 flex items-center p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
            <span class="text-xs ">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center flex-row-reverse p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
            <span class="text-xs">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
            <span class="text-xs ">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center flex-row-reverse p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
            <span class="text-xs">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
            <span class="text-xs ">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center flex-row-reverse p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
            <span class="text-xs">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
            <span class="text-xs ">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center flex-row-reverse p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
            <span class="text-xs">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
            <span class="text-xs ">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center flex-row-reverse p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
            <span class="text-xs">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
            <span class="text-xs ">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center flex-row-reverse p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
            <span class="text-xs">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
            <span class="text-xs ">20:30</span>
         </div>
      </div>
      <div class="my-3 flex items-center flex-row-reverse p-3">
         <div class="h-10 w-10 rounded-full overflow-hidden">
            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
               class="h-full w-full">
         </div>

         <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
            <span class="text-xs">20:30</span>
         </div>
      </div>

      <div class="my-3 flex items-center p-3">
            <div class="h-10 w-10 rounded-full overflow-hidden">
                  <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
                        class="h-full w-full">
                  </div>

                     <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
                              <span class="text-xs ">20:30</span>
                                 </div>
                                 </div>
                                                <div class="my-3 flex items-center flex-row-reverse p-3">
                                                                     <div class="h-10 w-10 rounded-full overflow-hidden">
                                                                        <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
                                                                           class="h-full w-full">
                                                                     </div>

                                                                              <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
                                                                                          <span class="text-xs">20:30</span>
                                                                                             </div>
                                                                                             </div>

                                                                                                <div class="my-3 flex items-center p-3">
                                                                                                   <div class="h-10 w-10 rounded-full overflow-hidden">
                                                                                                      <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
                                                                                                                                                   class="h-full w-full">
                                                                                                                                                      </div>

                                                                                                                                                         <div class="mx-4 message_left text-black flex flex-col rounded-lg py-2 px-3">hi jonh heloooooooooooo
                                                                                                                                                            <span class="text-xs ">20:30</span>
                                                                                                                                                         </div>
                                                                                                                                                      </div>
                                                                                                                                                      <div class="my-3 flex items-center flex-row-reverse p-3">
                                                                                                                                                         <div class="h-10 w-10 rounded-full overflow-hidden">
                                                                                                                                                            <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar"
                                                                                                                                                               class="h-full w-full">
                                                                                                                                                         </div>

                                                                                                                                                         <div class="mx-4 message_right text-black flex flex-col rounded-lg py-2 px-3">hi jonh testtttt
                                                                                                                                                            <span class="text-xs">20:30</span>
                                                                                                                                                         </div>
                                                                                                                                                      </div> -->
   </div>
   <div class="" v-else-if="messageStore.err">{{ messageStore.err }}</div>
   <div class="" v-else-if="messageStore.isLoading">Loading...</div>
</template>