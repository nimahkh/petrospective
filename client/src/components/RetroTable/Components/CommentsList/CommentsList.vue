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
import {defineProps} from "vue";

const store= useTables();
defineProps({
  tableId: {
    type: String,
    default: '',
    required: true
  }
})
</script>