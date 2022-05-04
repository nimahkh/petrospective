<template>
  <div class="w-full h-full relative font-sans p-4">
    <router-view></router-view>
  </div>
</template>
<script setup>
import {onBeforeMount} from "vue";

onBeforeMount(()=>{
  const eventSourceMain = document.createElement('script');
  eventSourceMain.setAttribute('src', 'https://petrospective-7d77.restdb.io/assets/js/eventsource.min.js')
  const restDB = document.createElement('script');
  restDB.setAttribute('src', 'https://petrospective-7d77.restdb.io/rest/_jsapi.js?plainjs=true')
  document.head.appendChild(eventSourceMain);
  document.head.appendChild(restDB);
})

</script>
