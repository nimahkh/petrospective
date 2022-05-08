<template>
  <div
    v-if="store.name"
    class="flex m-4 justify-between"
  >
    <div class="flex">
      <ul class="list-reset text-white hidden md:flex">
        <li>
          <span class="flex mr-2 rounded bg-gray-200 hover:text-orange-700 text-orange-600 font-bold py-2 px-4">
            <span class="mr-2" v-html="store.avatar"/>
            <span>{{ store.name }}</span>
          </span>
        </li>
        <li>
          <span class="flex mr-2 rounded bg-gray-200 hover:text-orange-700 text-orange-600 font-bold py-2 px-4">
            Room :{{ store.room_name }}
          </span>
        </li>
        <li v-if="store.owner">
          <span
            :class="[isMasked ? 'bg-blue-200 hover:bg-blue-300 text-white' : 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white']"
            class="flex underline font-bold py-2 px-4 rounded mr-2"
            @click="handleUnMask"
          >
            Unmask
          </span>
        </li>
        <li>
          <span
            class="flex underline font-bold py-2 px-4 rounded cursor-pointer bg-red-500 hover:bg-red-700 text-white"
            @click="Logout"
          >
            Log out
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useUser, useRoom} from "@/components/store";
import {useTables} from "@/components/RetroTable/store"
import {updateRoom} from "@/Api";
import localforage from "localforage";
import {useRouter} from 'vue-router'

const router = useRouter();
const store = useUser();
const isMasked = ref(false)

function Logout() {
  localforage.clear();
  router.push('/room');
  useUser().$reset();
  useRoom().$reset();
  useTables().$reset()
}

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