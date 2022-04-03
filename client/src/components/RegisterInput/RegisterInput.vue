<template>
  <div
    class="flex rounded bg-white w-[30rem] border-2 border-blue-500"
    @keyup.enter="handleSubmit"
  >
    <input
      ref="input"
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

import {onMounted, ref} from "vue";
import router from "@/router"

const input = ref(null)

onMounted(()=>{
  input.value.focus()
})

function handleSubmit() {
  router.push('/table?name='+input.value.value)
}

</script>