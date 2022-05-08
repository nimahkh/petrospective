<template>
  <div
    :class="[revealComment ? 'bg-white': 'bg-slate-200']"
    class="p-2 rounded mt-2 border-b rounded-lg border-gray cursor-pointer hover:bg-gray-lighter"
  >
    <span
      :class="[revealComment? '' : 'blur-sm']"
      v-html="computedComment"
    />
    <hr>
    <div
      class="divide-solid text-gray-800er mt-2 ml-2 flex justify-end items-center"
    >
      <span class="mr-2">{{ item.user_name }}</span>
      <div 
        class="rounded-full w-6 h-6"
        v-html="avatar"
      />
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, onMounted} from "vue";
import {useUser} from "@/components/store";

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

onMounted(()=>{
  console.log(props.item.user_id, useUser().user_id)
})

const revealComment = computed(()=>{
  return props.isUnmasked || useUser().user_id === props.item.user_id;
})

const computedComment = computed(()=>{
  return revealComment.value ? props.item.comment : 'Admin has to unmask the comments'
});

const avatar = computed(()=>{
  return props.item.avatar;
})
</script>