import { defineStore } from 'pinia'
// @ts-ignore
import UserInterface from "~/types/User";

export const useUserStore = defineStore( {
    id: 'user',
    state: () => ({
        user: ref({} as UserInterface)
    }),
    actions: {
        async setUser() {
            const response = await useFetch('https://reqres.in/api/users/1')
            if (response.data && response.data.value) {
                this.$state.user = response.data.value as UserInterface
            }
        },
    },
    getters: {
        getUser: (state) => {
            return state.user
        },
    },
});