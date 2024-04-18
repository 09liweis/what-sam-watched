<script setup>
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();
</script>
<template>
  <section class="flex flex-wrap items-center justify-center gap-2">
    <NuxtLink v-for="(page) in moviesStore.pages" :to="`?page=${page+1}`" class="p-1 border border-red-500 text-red-500 rounded">{{ page + 1 }}</NuxtLink>
  </section>
</template>