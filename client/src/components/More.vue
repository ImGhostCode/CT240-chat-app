<template>
  <div class="h-[50px] bg-indigo-800 p-4 text-white ">
    <button @click="toggleNewGroup" class="mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>

    <button v-if="authStore.user.isAdmin" @click="toggleManageAccounts">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    </button>
  </div>

  <new-group v-if="isShow.newGroup" @show="toggleNewGroup" />
  <manage-accounts v-if="isShow.manageAccounts" @show="toggleManageAccounts"></manage-accounts>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.store'
import { onMounted, reactive, ref } from 'vue';
import NewGroup from './NewGroup.vue'
import ManageAccounts from './ManageAccounts.vue'

const authStore = useAuthStore()
const isShow = reactive({
  newGroup: false,
  manageAccounts: false
})

function toggleNewGroup() {
  isShow.newGroup = !isShow.newGroup
}
function toggleManageAccounts() {
  isShow.manageAccounts = !isShow.manageAccounts
}

</script>