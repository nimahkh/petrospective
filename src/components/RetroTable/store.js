import {defineStore} from "pinia";
import {addNewComment} from "@/Api"

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
        addComment({commentData, data}) {
            this.comments.push(commentData);
            addNewComment(data);
        },
    },
})
