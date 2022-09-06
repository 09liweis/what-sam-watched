<template>
  <h1>Detail {{ id }}</h1>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'DetailPage',
  data() {
    return {
      id: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id;
  }
})
</script>