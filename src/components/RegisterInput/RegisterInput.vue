<template>
  <div
    class="flex rounded bg-white w-[30rem] border-2 border-blue-500"
    @keyup.enter="handleSubmit"
  >
    <input
      ref="name"
      type="search"
      class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
      placeholder="Name"
    >

    <button
      type="button"
      class="m-2 rounded px-4 py-2 font-semibold text-gray-100 bg-blue-500"
      @click="handleSubmit"
    >
      Submit
    </button>
  </div>
</template>

<script setup>


import {onMounted, ref, defineEmits} from "vue";
import "@/utilities";
import localforage from "localforage";
import { useRoute } from 'vue-router'
import {decrypt} from "@/utilities";

const route = useRoute();
const showError = ref(false)
const name = ref(null)
const emit = defineEmits(['register_user'])

onMounted(()=>{
  name.value.focus()
})

function validateInputs() {
  return name.value.value;
}

function handleSubmit() {
  showError.value = false;
  if(!validateInputs()) {
    showError.value = true;
    return;
  }
  registerUser();
}

function registerUser() {
  const roomHashCode = route.params?.room_name
  const roomSettings = {
    owner: false,
    room_name: decrypt('petros',roomHashCode),
    room_hash: roomHashCode,
    name: name.value.value,
    user_id : new Date().getTime()
  };

  localforage.setItem('room', roomSettings, function () {
    emit('register_user', roomSettings)
  });
}

</script>