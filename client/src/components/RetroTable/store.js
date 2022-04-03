import {defineStore} from "pinia";

export const useTables = defineStore('tables', {
    state: () => ({
        comments: [],
    }),
    getters: {
        getItems: (state) => state.comments,
            getItemsByTitleID: (state) => {
            return (tableId) => state.comments.filter((comment) => comment?.table?.id === tableId)
        },
    },
    actions: {
        addComment(item) {
            this.comments.push(item)
        },
    },
})
