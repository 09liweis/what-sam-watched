<script setup>
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();
const curPage = moviesStore.page;

const getClass = (curPage, page) => {
  return `menu-item min-w-7 text-center ${curPage == page?'active':''}`;
}

</script>
<template>
  <section class="flex flex-wrap items-center justify-center gap-2">
    <NuxtLink v-for="(page) in moviesStore.pages" :to="`?page=${page+1}`" :class="getClass(curPage, page+1)">{{ page + 1 }}</NuxtLink>
  </section>
</template>