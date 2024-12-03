<script setup>
import { useMoviesStore } from '@/stores/movies';
import MovieCard from '@/components/movie/MovieCard.vue';
const moviesStore = useMoviesStore();
</script>

<template>
  <section class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
    <MovieCard 
      v-for="movie in moviesStore.movieList" 
      :key="movie.douban_id" 
      :movie="movie" 
    />
  </section>
</template>