<template>
  <div
    v-for="item in store.getItemsByTitleID(tableId)"
    :key="item"
    class="bg-white p-2 rounded mt-2 border-b rounded-lg border-gray cursor-pointer hover:bg-gray-lighter"
  >
    <span v-html="item.comment" />
    <hr>
    <div
      class="divide-solid text-gray-800er mt-2 ml-2 flex justify-end items-center"
    >
      <span class="mr-2">{{ item.user_name }}</span>
      <img
        src="https://i.imgur.com/OZaT7jl.png"
        class="rounded-full"
      >
    </div>
  </div>
</template>

<script setup>
import {useTables} from "../../store";
import {defineProps, onMounted, onUnmounted} from "vue";
import socket from "@/socket/index.js"
import {useUser} from "../../../store";
import {useRoute} from "vue-router";

const store= useTables();
const route = useRoute();

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