<script setup>
import { useMoviesStore } from '@/stores/movies';
import MovieCards from '@/components/movie/MovieCards.vue';
import Loading from '@/components/Loading.vue';

const moviesStore = useMoviesStore();
</script>

<template>
  <Loading 
    v-if="moviesStore.isfetchingMovieList" 
    type="skeleton"
    :count="15"
  />
  <MovieCards v-else />
</template>