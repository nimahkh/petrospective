<template>
  <span v-html="computedComment" />
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
</template>

<script setup>
import {computed, defineProps} from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: ()=>({}),
    required: true
  },
  isUnmasked: {
    type: Boolean,
    default: false,
    required: true
  }
})

const computedComment = computed(()=>{
  return props.isUnmasked ? props.item.comment : 'Admin has to unmask the comments'
});
</script>