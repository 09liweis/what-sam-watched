<template>
  <main class="flex flex-wrap gap-2">
    <Loading color="text-red-500" v-if="loading" />
    <article v-for="movie in moviesStore.movieList" class="w-1/4">
      <NuxtImg v-if="movie.poster" :src="movie.poster" width="25%" :alt="movie.title" loading="lazy" class="rounded hidden sm:block aspect-[3/4] bg-gray-100" />
    </article>
  </main>
</template>
  <style></style>
<script setup>
  import Loading from '../components/Loading';
  import { onMounted, ref } from 'vue';
  import { useMoviesStore } from '@/stores/movies';
  const runtimeConfig = useRuntimeConfig();
  
  const route = useRoute();
  const moviesStore = useMoviesStore();
  
  let loading = ref(false);
  
  onMounted(async () => {
    loading.value = true;
    await moviesStore.fetchMovies(route.params.name);
    loading.value = false;
  });
  </script>
  