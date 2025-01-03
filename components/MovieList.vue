<script setup>
import { useMoviesStore } from '@/stores/movies';
import MovieCards from '@/components/movie/MovieCards.vue';
import Loading from '@/components/Loading.vue';

const moviesStore = useMoviesStore();
moviesStore.fetchMovies();
</script>

<template>
  <Loading 
    v-if="moviesStore.isfetchingMovieList" 
    type="skeleton"
    :count="12"
  />
  <MovieCards v-else />
</template>