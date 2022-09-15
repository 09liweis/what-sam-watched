<template>
  <div v-if="$fetchState.pending">Fetching post #{{$route.params.id}}...</div>
  <div v-else>
    <h1>{{ visual.title }}</h1>
    <pre>{{ visual.summary }}</pre>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'DetailPage',
  data() {
    return {
      id: '',
      visual: {}
    }
  },
  async fetch() {
    const API = `https://what-i-watched.herokuapp.com/api/visual/${this.$route.params.id}`;
    const response = await fetch(API).then(res => res.json());
    this.visual = response.result;
  },
  mounted () {
  }
})
</script>