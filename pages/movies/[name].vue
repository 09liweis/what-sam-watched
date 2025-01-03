<template>
  <main class="flex justify-center items-center h-full p-5">
    <Loading 
      v-if="loading"
      type="skeleton"
      :count="12"
    />
    <MovieCards v-else />
  </main>
</template>
<script setup>
  import Loading from '~/components/Loading';
  import { onMounted, ref } from 'vue';
  import { useMoviesStore } from '@/stores/movies';
  import MovieCards from '~/components/movie/MovieCards.vue';
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
  