<template>
  <div class="rounded bg-gray-200 flex-no-shrink p-2 mr-3">
    <div class="flex justify-between py-1">
      <div
        contenteditable
        class="text-sm w-full outline-none"
        @input="handleChangeTitle"
      >
        {{ title }}
      </div>
    </div>
    <div class="text-sm mt-2">
      <CommentsList :table-id="tableId" />
      <AddComment :table-id="tableId" />
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed, defineEmits } from "vue";
import {AddComment, CommentsList} from "./Components";

const emit = defineEmits(['update:title'])

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: '',
  },
  tableId: {
    type: Number,
    default: 1,
  }
})

const handleChangeTitle = (e) => {
  title.value = e.target.innerText;
}

const title = computed({
  get: () => {
    return props.title;
  },
  set: (value) => {
    emit('update:title', value)
  }
})
</script>