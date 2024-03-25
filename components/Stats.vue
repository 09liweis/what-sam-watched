<script>
import Loading from './Loading.vue';

export default {
  props: ['stats','curLang'],
  setup(props) {
    
  }
}

</script>
<template>
  <section v-if="stats.total">
    <section class="flex gap-x-3">
      <a>Total: {{stats.total}}</a>
      <a>Movie: {{stats.movie}}</a>
      <a>TV: {{stats.tv}}</a>
    </section>
    <section class="flex gap-x-3 flex-wrap">
      <span>Languages: </span>
      <NuxtLink v-for="count,lang of stats.languages" :class="curLang == lang?'text-red-500':'hover-lang'" :to="{query:{lang}}">{{ `${lang}(${count})` }}</NuxtLink>
    </section>
  </section>
  <section v-if="!stats.total">
    <Loading />
  </section>
</template>