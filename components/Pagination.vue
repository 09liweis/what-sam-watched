<script setup>
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();
</script>
<template>
  <section class="flex flex-wrap items-center justify-center gap-2">
    <NuxtLink v-for="(page) in moviesStore.pages" :to="`?page=${page+1}`" class="menu-item min-w-7 text-center">{{ page + 1 }}</NuxtLink>
  </section>
</template>