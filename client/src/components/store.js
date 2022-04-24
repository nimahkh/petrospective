import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
    state: () => {
        return {
            owner: false,
            name: '',
            room_name: '',
            room_hash: '',
        }
    },
})