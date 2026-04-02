<script setup>
import MovieCards from '@/components/movie/MovieCards.vue';
import Loading from '@/components/Loading.vue';

const {isfetchingMovieList} = useGlobalState();
</script>

<template>
  <Loading 
    v-if="isfetchingMovieList" 
    type="skeleton"
    :count="15"
  />
  <MovieCards v-else />
</template>