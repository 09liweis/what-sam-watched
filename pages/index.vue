<template>
  <main>
    <h1>What Sam Watched in Nuxt.js</h1>
    <article v-for="v in visuals" :key="v.id">
      <h3>{{ v.title }}</h3>
    </article>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data () {
    return {
      visuals: []
    }
  },
  async fetch () {
    const API = 'https://what-i-watched.herokuapp.com/api/visuals?limit=20'
    const response = await fetch(API).then(res => res.json())
    this.visuals = response.results
  },
  mounted () {
    this.$fetch()
  }
})
</script>
