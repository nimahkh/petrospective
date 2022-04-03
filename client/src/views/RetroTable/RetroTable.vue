<template>
  <div class="flex px-4 pb-8 items-start overflow-x-scroll grid grid-cols-3">
    <RetroTable
      v-model:title="data.first.title"
      :table-id="data.first.id"
    />
    <RetroTable
      v-model:title="data.second.title"
      :table-id="data.second.id"
    />
    <RetroTable
      v-model:title="data.third.title"
      :table-id="data.third.id"
    />
  </div>
</template>

<script setup>
import RetroTable from '@/components/RetroTable';
import {reactive} from 'vue'

const data = reactive({
  first: {title: 'Sad', id: 1},
  second: {title: 'Glad', id: 2},
  third: {title: 'Action points', id: 3},
})

</script>