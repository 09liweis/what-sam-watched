<template>
  <main class="container p-5">
    <MovieList />
  </main>
</template>
<script setup>
  import MovieList from '~/components/MovieList';
  import { onMounted, ref } from 'vue';
  import { useMoviesStore } from '@/stores/movies';
  const runtimeConfig = useRuntimeConfig();
  
  const route = useRoute();
  const moviesStore = useMoviesStore();
  
  let loading = ref(false);

  const fetchMovies = async () => {
    loading.value = true;
    await moviesStore.fetchMovies(`${route.params?.name}/${route.query?.nm||''}`);
    loading.value = false;
  }
  
  onMounted(() => {
    fetchMovies();
  });

  watch(() => route.query, () => {
    fetchMovies();
  });

  </script>
  