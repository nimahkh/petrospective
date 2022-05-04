<template>
  <div class="rounded-lg bg-gray-700 flex-no-shrink p-2 mr-3">
    <div class="flex justify-between py-1">
      <div
        :contenteditable="state.owner"
        class="text-sm w-full text-white outline-none"
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
import {useUser} from "../store";

import debounce from 'lodash/debounce';
import {updateRoom} from "@/Api";

const emit = defineEmits(['update:title'])
const state = useUser();
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
    type: String,
    default: '',
  },
  objectId: {
    type: String,
    default: '',
  },
  item: {
    type: Object,
    default: ()=>({}),
  },
  columns: {
    type: Object,
    default: ()=>({}),
  }
})

const handleChangeTitle = (e) => {
  title.value = e.target.innerText;

  const save = debounce(() => {
    saveColumn()
  }, 500);
  save();
}

const title = computed({
  get: () => {
    return props.title;
  },
  set: (value) => {
    emit('update:title', value)
  }
})

function saveColumn() {
  const allColumns = props.columns;
  allColumns[props.item.id] = {title: title.value, id:props.item.id};
  const data = {
    columns: allColumns
  }

  updateRoom(data, props.objectId).then(res=>{
    console.log({res})
  })
}

</script>