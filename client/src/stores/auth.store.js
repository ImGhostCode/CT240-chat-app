import { ref, computed } from "vue";
import { defineStore } from "pinia";
import authService from "../services/auth.service";

export const useAuthStore = defineStore("auth", () => {
    const result = ref(null);
    const isLoading = ref(false);
    const err = ref(null);
    const user = ref(null)
    const searchUserResult = ref(null)
    const searchMembersResult = ref(null)
    const searchAccountResult = ref(null)


    async function register({ name, email, password }) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await authService.register({ name, email, password });
            if (res.code === 400) throw new Error(res.message);
            result.value = res;
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }
    async function login(data) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await authService.login(data);
            if (res.code === 401 || res.code === 400) throw new Error(res.message);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            result.value = res
            user.value = res.data
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function getUserStored(data) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            user.value = JSON.parse(localStorage.getItem('userInfo'))
            user.value = res.data
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function search(keyword, searchType) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await authService.searchUsers(keyword)
            switch (searchType) {
                case 'Group':
                    searchMembersResult.value = res.data
                    break;
                case 'Account':
                    searchAccountResult.value = res.data
                    break;
                default:
                    searchUserResult.value = res.data
                    break;
            }
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function logout() {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await authService.logout();
            if (res.code === 401 || res.code === 400) throw new Error(res.message);
            localStorage.removeItem("userInfo");
            result.value = res
            // user.value = null
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }


    async function editAccount(userId, image) {
        isLoading.value = true;
        err.value = null;
        result.value = null;
        try {
            const res = await authService.editAccount(userId, image)
            console.log(res);
            if (res.code === 400 || res.code === 401 || res.code === 403 || res.code === 404) throw new Error(res.message);
            result.value = res
            user.value = res.data
            localStorage.setItem("userInfo", JSON.stringify(res.data));

        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteAccount(userId) {
        isLoading.value = true;
        result.value = null;
        err.value = null;
        try {
            const res = await authService.deleteAccount(userId)
            if (res.code === 401 || res.code === 400) throw new Error(res.message);
            result.value = res
        } catch (error) {
            err.value = error.message;
        } finally {
            isLoading.value = false;
        }
    }



    return {
        register, result, isLoading, err, login, user, getUserStored,
        search, searchUserResult, logout, searchMembersResult, searchAccountResult, deleteAccount,
        editAccount
    };
});