<script setup>
import { useMoviesStore } from '@/stores/movies';
import MovieCards from '@/components/movie/MovieCards.vue';
const moviesStore = useMoviesStore();
moviesStore.fetchMovies();
</script>
<template>
  <section v-if="moviesStore.isfetchingMovieList" class="flex justify-center">
    <Loading color="'text-red-500'" />
  </section>
  <MovieCards v-else />
</template>