<template>
    <div  class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex justify-center items-center z-10 overflow-hidden">
        <div class="bg-white p-6 w-80 shadow-lg rounded-lg ">
            <h3 class="text-2xl font-bold mb-3">Edit profile</h3>
            <input type="text" value="imghost" class="p-3 border-b-[1px] outline-none w-full mb-3" disabled> 
            <input type="password" placeholder="password" class="p-3 border outline-none w-full mb-3"> 
            <input type="password" placeholder="re-password" class="p-3 border outline-none w-full mb-3"> 
            <div class="h-20 w-20 rounded-full overflow-hidden mb-2 cursor-pointer">
                    <img src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" alt="avatar" class="h-full w-full">
            </div>
            <input type="file" name="avatar" id="avatar" class="mb-3">
            <button class="bg-blue-600 text-white text-lg font-bold px-3 py-2 rounded-sm">Submit</button>
            <button @click="props.toggleEditProfile" class="bg-gray-400 text-white text-lg font-bold px-3 py-2 rounded-sm mx-2">Cancel</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['toggleEditProfile'])
</script>