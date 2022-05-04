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
export const useRoom = defineStore('room', {
    state: () => {
        return {
            is_unmasked: false,
            room_hash: '',
            room_id: ''
        }
    },
    getters: {
        getRoom: (state) => {
            return state;
        },
    },
    actions: {
        setUnMasked(value) {
            this.is_unmasked = value;
        }
    }
})