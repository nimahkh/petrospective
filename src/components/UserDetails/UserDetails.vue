<template>
  <div
    v-if="store.name"
    class="flex m-4 justify-between"
  >
    <div class="flex">
      <ul class="list-reset text-white hidden md:flex">
        <li>
          <span class="mr-2 rounded bg-gray-200 hover:text-orange-700 text-orange-600 font-bold py-2 px-4">
            {{ store.name }}
          </span>
        </li>
        <li>
          <span class="mr-2 rounded bg-gray-200 hover:text-orange-700 text-orange-600 font-bold py-2 px-4">
            Room :{{ store.room_name }}
          </span>
        </li>
        <li v-if="store.owner">
          <span
            :class="[isMasked ? 'bg-blue-200 hover:bg-blue-300 text-white' : 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white']"
            class="underline font-bold py-2 px-4 rounded"
            @click="handleUnMask"
          >
            Unmask
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useUser, useRoom} from "@/components/store";
import {updateRoom} from "@/Api";

const store = useUser();
const isMasked = ref(false)

function handleUnMask() {
  if(isMasked.value) {
    return;
  }

  updateRoom({is_unmasked:true}, useRoom().room_id).then(_=>{
    useRoom().setUnMasked(true)
    isMasked.value = true
  })
}

</script>