<template>
  <div class="mt-4">
    <p
      v-if="!states.isEditor"
      class="mt-3 text-white cursor-pointer bg-cyan-700 p-3 rounded-lg"
      @click="toggleToEditor"
    >
      Add new comment...
    </p>
    <div
      v-if="states.isEditor"
    >
      <Editor
        ref="editor"
        v-model="comment"
        api-key="ejnc83s11yj52yosus8e7y8c7rgznhdg84thvt8kwpsktbqn"
        :init="{
          height: 200,
          menubar: false,
          placeholder: 'Write your comment...',
          toolbar:
            'bold italic | \
           alignleft aligncenter alignright alignjustify'
        }"
        @init="editorInitialized"
        @keyup.enter="addComment"
      />
    </div>
  </div>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import {reactive, onMounted, onUnmounted, ref, defineProps} from "vue";
import {useTables} from "../../store";

const store = useTables();
const props = defineProps({
  tableId: {
    type: Number,
    default: 1,
    required: true
  }
})
const comment = ref(null)
const states = reactive({
  isEditor: false,
})

onMounted(()=>{
  document.addEventListener('keyup', toggleToText)
})

onUnmounted(()=>{
  document.removeEventListener('keyup', toggleToText)
})

const closeEditor = ()=>{
  states.isEditor = false
}

const toggleToText = (e)=> {
  if(e.code ==='Escape') {
    closeEditor();
  }
}

const toggleToEditor= ()=>{
  states.isEditor = true;
}

const editorInitialized= (e)=> {
  e?.target?.focus();
}

const storeComment = () => {
  const commentData = {
    table: {
      id: props.tableId
    },
    comment: comment.value,
    user_name: 'Nima'
  }
  store.addComment(commentData)
}

const removeEditorValue = () => {
  console.log("Remove editor value")
  comment.value = ''
}

const addComment= (e)=>{
  if(e.shiftKey) {
    return;
  }
  storeComment();
  removeEditorValue();
  closeEditor()
}

</script>