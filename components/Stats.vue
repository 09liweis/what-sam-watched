<script>
export default {
  props: ['stats'],
  setup(props) {
    
  }
}

</script>
<template>
  <section v-if="stats.total">
    <a>Total: {{stats.total}}</a>
  </section>
</template>