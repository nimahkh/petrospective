<template>
  <div>
    <div
      class="flex rounded bg-white w-[30rem] border-2 border-blue-500 py-3 mb-2"
      @keyup.enter="handleSubmit"
    >
      <input
        ref="name"
        type="search"
        class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
        placeholder="Name"
        required
      >
    </div>

    <div
      class="flex rounded bg-white w-[30rem] border-2 border-blue-500"
      @keyup.enter="handleSubmit"
    >
      <input
        ref="room_name"
        type="search"
        class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
        placeholder="Room Name"
        required
      >

      <button
        type="button"
        class="m-2 rounded px-4 py-2 font-semibold text-gray-100 bg-blue-500"
        @click="handleSubmit"
      >
        Submit
      </button>
    </div>
    <div
      v-if="showError"
      class="bg-red-200 mt-2 p-3 rounded w-full"
    >
      <span class="text-gray-600 font-semibold">
        Please fill all required fields.
      </span>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import router from "@/router"
import {encrypt} from "@/utilities";
import localforage from "localforage";
import {useUser} from "../store";
import {addNewRoom} from '@/Api';

const showError = ref(false)
const name = ref(null)
const room_name = ref(null)

onMounted(()=>{
  name.value.focus()
})

function validateInputs() {
  return name.value.value && room_name.value.value;
}

function handleSubmit() {
  showError.value = false;
  if(!validateInputs()) {
    showError.value = true;
    return;
  }
  createRoom();
}

function createRoom() {
  const roomName= room_name.value.value;
  const roomHashCode = encrypt('petros', roomName);
  const roomSettings = {
    owner: true,
    room_hash: roomHashCode,
    room_name: roomName,
    name: name.value.value
  };
  const dataObject ={
    room_name: roomName,
    room_hash:roomHashCode,
    owner: name.value.value,
    columns: {
      first: {title: 'Sad', id: 'first'},
      second: {title: 'Glad', id: 'second'},
      third: {title: 'Action points', id: 'third'},
    }
  }
  addNewRoom(dataObject).then( _ =>{
    localforage.setItem('room', roomSettings, function () {
      useUser().$patch(roomSettings)
      router.push(`/table/${roomHashCode}`)
    });
  })
}

</script>