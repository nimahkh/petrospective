<template>
  <div
    v-for="item in store.getItemsByTitleID(tableId)"
    :key="item"
    class="bg-white p-2 rounded mt-2 border-b rounded-lg border-gray cursor-pointer hover:bg-gray-lighter"
  >
    <CommentItem
      :item="item"
      :is-unmasked="is_unmasked"/>
  </div>
</template>

<script setup>
import {useTables} from "../../store";
import {defineProps, onMounted, onUnmounted, toRefs} from "vue";
import socket from "@/socket/index.js"
import {useUser, useRoom} from "../../../store";
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
    user_name : commentItem.user
  }
  if(dataValid(commentItem)) {
    store.$state.comments.push(newComment)
  }
}

const dataValid = (commentItem)=>{
  return props.tableId === commentItem.category && commentItem.user !== useUser()?.name && commentItem.room_id === route.params?.room_name;
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