<template>
  <CommentItem
    v-for="item in store.getItemsByTitleID(tableId)"
    :key="item"
    :item="item"
    :is-unmasked="is_unmasked"
  />
</template>

<script setup>
import {useTables} from "@/components/RetroTable/store"
import {defineProps, onMounted, onUnmounted, toRefs} from "vue";
import socket from "@/socket/index.js"
import {useUser, useRoom} from "@/components/store";
import {useRoute} from "vue-router";
import CommentItem from "./CommentItem.vue"

const store= useTables();
const route = useRoute();
const {is_unmasked} = toRefs(useRoom().getRoom);

const props = defineProps({
  tableId: {
    type: String,
    default: '',
    required: true
  }
})

const fetchCommentsRealtime=(e)=>{
  const {data} = e;
  const commentItem =JSON.parse(data)?.data;
  const newComment = {
    table: {
      id: props.tableId
    },
    comment : commentItem.comment,
    user_name : commentItem.user,
    avatar: commentItem.avatar
  }
  if(dataValid(commentItem)) {
    store.$state.comments.push(newComment)
  }
}

const dataValid = (commentItem)=>{
  return props.tableId === commentItem.category && commentItem.user_id !== useUser()?.user_id && commentItem.room_id === route.params?.room_name;
}

onMounted(()=>{
  if(socket) {
    socket.addEventListener('post', fetchCommentsRealtime, false);
  }
})

onUnmounted(()=>{
  if(socket) {
    socket.removeEventListener('post', fetchCommentsRealtime, false);
  }
})
</script>