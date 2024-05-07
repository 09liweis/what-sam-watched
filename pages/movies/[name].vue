<template>
  <main class="flex justify-center items-center h-full">
    <Loading color="text-red-500" v-if="loading" />
    <section class="flex flex-wrap" v-else>
      <MovieCards />
    </section>
  </main>
</template>
  <style></style>
<script setup>
  import Loading from '../components/Loading';
  import { onMounted, ref } from 'vue';
  import { useMoviesStore } from '@/stores/movies';
  import MovieCards from '../../components/movie/MovieCards.vue';
  const runtimeConfig = useRuntimeConfig();
  
  const route = useRoute();
  const {params,query} = route;
  const moviesStore = useMoviesStore();
  
  let loading = ref(false);

  const fetchMovies = async () => {
    loading.value = true;
    await moviesStore.fetchMovies(`${params?.name}/${query?.nm||''}`);
    loading.value = false;
  }
  
  onMounted(() => {
    fetchMovies();
  });

  watch(() => route.query, () => {
    fetchMovies();
  });

  </script>
  