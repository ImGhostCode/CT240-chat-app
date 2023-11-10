<template>
  <div class="h-[50px] bg-indigo-800 p-4 text-white flex justify-between ">
    <button @click="toggleNewGroup">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
    <button v-if="authStore.user.isAdmin" @click="toggleManageAccounts">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    </button>
    <button @click="toggleListFriend">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    </button>
    <button @click="toggleNotification">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    </button>
  </div>
  <new-group v-if="isShow.newGroup" @show="toggleNewGroup" />
  <manage-accounts v-if="isShow.manageAccounts" @show="toggleManageAccounts"></manage-accounts>
  <list-friends v-if="isShow.listFriend" @show="toggleListFriend"></list-friends>
  <notification v-if="isShow.notification" @show="toggleNotification"></notification>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.store'
import { reactive } from 'vue';
import NewGroup from './NewGroup.vue'
import ListFriends from './ListFriends.vue'
import ManageAccounts from './ManageAccounts.vue'
import Notification from './Notification.vue'

const authStore = useAuthStore()

const isShow = reactive({
  newGroup: false,
  manageAccounts: false,
  listFriend: false,
  notification: false
})

function toggleNewGroup() {
  isShow.newGroup = !isShow.newGroup
}
function toggleManageAccounts() {
  isShow.manageAccounts = !isShow.manageAccounts
}
function toggleListFriend() {
  isShow.listFriend = !isShow.listFriend
}

function toggleNotification() {
  isShow.notification = !isShow.notification
}
</script>