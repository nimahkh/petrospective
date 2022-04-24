<template>
  <div class="grid place-items-center h-screen">
    <RegisterInput 
      @register_user="registerUser"
    />
  </div>
</template>

<script setup>
import {defineEmits} from "vue";
const emit = defineEmits(['register_user'])

function registerUser(roomSettings){
  emit('register_user', roomSettings)
}

import RegisterInput from "@/components/RegisterInput";

</script>