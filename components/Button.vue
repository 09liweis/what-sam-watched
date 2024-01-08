<script>
export default {
  props: ['text','onClick'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.text)
  }
}
</script>
<template>
  <button
    class="border p-1.5 border-amber-600 rounded"
    @click="onClick()"
  >
    {{text}}
  </button>
</template>