<template>
  <div>
    <LoadingBar v-if="loading" />
    <div v-else>
      <UserDetails />
      <div
        class="flex m-4 justify-center align-center items-center text-center"
      >
        <AnnouncementBar />
      </div>
      <div
        v-if="isRegistered"
        class="flex px-4 pb-8 items-start overflow-x-scroll grid grid-cols-3 gap-3"
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
import {ref, onMounted, onBeforeMount, onUnmounted} from "vue";
import RetroTable from '@/components/RetroTable';
import UserDetails from "@/components/UserDetails";
import {useUser, useRoom} from "@/components/store";
import {useTables} from "@/components/RetroTable/store"
import localforage from "localforage";
import RegisterFlow from "../RegisterFlow";
import router from '@/router';
import {useRoute} from 'vue-router';
import {getRoom} from '@/Api'
import {decrypt} from "@/utilities";
import LoadingBar from "@/components/LoadingBar";
import AnnouncementBar from "@/components/AnnouncementBar";
import {getRoomByID, getCommentsByRoomID} from "@/Api"
import socket from "@/socket/index.js"
import avatar from 'animal-avatar-generator';

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
      if (!userHasBeenRegistered(res)) {
        isRegistered.value = false;
        return false;
      }
      registerUser(res)
  })
  if(socket) {
    socket.addEventListener('put', fetchRoomIsUnmasked, false);
  }
})

onUnmounted(()=>{
  if(socket) {
    socket.removeEventListener('put', fetchRoomIsUnmasked, false);
  }
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
    object_id.value = data[0]._id;
    const {is_unmasked, room_hash, _id} = data[0];
    useRoom().$patch({is_unmasked, room_hash, room_id: _id})
    getComments(room_hash)
  });
}

function getComments(room_id){
  getCommentsByRoomID(room_id).then(res=>{
    const {data} = res;
    data.forEach((item)=>{
      const payload = {
        table: {
          id: item.category
        },
        comment: item.comment,
        user_name: item.user,
        user_id: item.user_id,
        avatar: item.avatar,
      }
      useTables().addComment(payload)
    });
  })
}

function userHasBeenRegistered(userDetails) {
  return userDetails?.name && userDetails?.room_name;
}

function registerUser(roomSettings) {
  const detail = {...roomSettings};
  if(!detail){
    return false;
  }
  detail.avatar = avatar(detail.name, { size: 24 })

  useUser().$patch(detail);
  name.value = detail.name;
  room_name.value = detail.room_name;
  owner.value = detail.owner;
  isRegistered.value = true;
}

const fetchRoomIsUnmasked = (e)=>{
  const {data} = e;
  const id = JSON.parse(data)?.data;
  getRoomByID(id).then(res=> {
    if(res) {
      const {data} = res;
      const {is_unmasked} = data[0];
      useRoom().setUnMasked(is_unmasked)
    }
  })
}

</script>