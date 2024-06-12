<script setup>
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();

const getClass = (curPage, page) => {
  return `menu-item min-w-7 text-center ${curPage == page?'active':''}`;
}

</script>
<template>
  <section class="flex flex-wrap items-center justify-center gap-2 mb-2">
    <NuxtLink v-for="(page) in moviesStore.pages" :class="getClass(moviesStore.page, page)" :to="{query:{page:page}}">{{ page }}</NuxtLink>
  </section>
</template>