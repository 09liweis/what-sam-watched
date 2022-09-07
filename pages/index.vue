<template>
  <main class="conatiner">
    <h1 class="text-xl text-center text-red-500 font-bold mb-8">What Sam Watched in Nuxt.js</h1>
    <article v-for="v in visuals" :key="v.id">
      <h3 class="font-mono text-red-400 hover:text-red-900 underline decoration-blue-300 hover:decoration-blue-400">
        <NuxtLink :to="{ name: 'detail-id', params: { id: v.id }}">{{ v.title }}</NuxtLink>
      </h3>
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
