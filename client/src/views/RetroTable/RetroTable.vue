<template>
  <div>
    <LoadingBar v-if="loading" />
    <div v-else>
      <UserDetails />
      <div
        v-if="isRegistered"
        class="flex px-4 pb-8 items-start overflow-x-scroll grid grid-cols-3"
      >
        <RetroTable
          v-for="(column, index) in columns"
          :key="index"
          v-model:title="column.title"
          :object-id="object_id"
          :item="column"
          :columns="columns"
          :table-id="column.id"
        />
      </div>
      <RegisterFlow
        v-else
        @register_user="registerUser"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeMount} from "vue";
import RetroTable from '@/components/RetroTable';
import UserDetails from "@/components/UserDetails";
import {useUser} from "@/components/store";
import localforage from "localforage";
import RegisterFlow from "../RegisterFlow/RegisterFlow";
import router from '@/router';
import {useRoute} from 'vue-router';
import {getRoom} from '@/Api'
import {decrypt} from "@/utilities";
import LoadingBar from "@/components/LoadingBar";

const isRegistered = ref(true);
const name  = ref('');
const room_name  = ref('');
const owner  = ref('');
const columns  = ref({});
const object_id  = ref({});

const route = useRoute();
const loading = ref(true)

onBeforeMount(()=>{
  roomExists();
  const {name: name_state, room_name: room_name_state, owner: owner_state} = useUser()?.$state;
  name.value = name_state;
  room_name.value = room_name_state;
  owner.value = owner_state;
})

onMounted(()=> {
  localforage.getItem('room').then( res => {
    if(!userHasBeenRegistered(res) ){
      isRegistered.value = false;
    }
    registerUser(res)
  })
})

function roomExists(){
  const room_name = route.params?.room_name;
  getRoom(decrypt('petros', room_name)).then(res=>{
    const {data} = res;
    loading.value = false;
    if(data.length === 0 ){
      router.push('/room');
      return false;
    }
    columns.value = data[0].columns;
    object_id.value = data[0]._id
  });
}

function userHasBeenRegistered(userDetails) {
  return userDetails?.name && userDetails?.room_name;
}

function registerUser(roomSettings) {
  if(!roomSettings){
    return false;
  }
  useUser().$patch(roomSettings);
  name.value = roomSettings.name;
  room_name.value = roomSettings.room_name;
  owner.value = roomSettings.owner;
  isRegistered.value = true;
}

</script>