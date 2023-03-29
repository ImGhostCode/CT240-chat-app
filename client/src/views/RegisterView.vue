<template>
    <div class="w-80 bg-white rounded-xl shadow-md">
        <form class="flex flex-col text-center px-8 py-3">
            <h2 class="text-2xl font-semibold text-blue-500 my-4">Register Chat</h2>
            <input type="text" placeholder="username" class="px-2 py-3 border-b-2 outline-none border-slate-400 mb-4">
            <input type="email" placeholder="email" class="px-2 py-3 border-b-2 outline-none border-slate-400 mb-4">
            <input type="text" placeholder="password" class="px-2 py-3 border-b-2  outline-none border-slate-400 mb-4">
            <button type="submit" class="w-full bg-blue-600 text-white text-md font-semibold rounded-md p-3 mb-2">Sign
                up</button>
            <p class="text-sm">You already have an account? <router-link :to="{ name: 'login', params: {} }"
                    class="underline text-blue-400">Login</router-link></p>
        </form>
    </div>
</template>
