<script>
export default {
  props: ['stats'],
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
      <NuxtLink v-for="count,lang of stats.languages" :to="{query:{lang}}">{{ `${lang}(${count})` }}</NuxtLink>
    </section>
  </section>
</template>