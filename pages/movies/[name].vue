<template>
  <main class="flex flex-wrap">
    <Loading color="text-red-500" v-if="loading" />
    <article v-for="movie in moviesStore.movieList" class="w-1/2 sm:1/3 md:w-1/4 lg:w-1/6 p-2">
      <video v-if="movie.video" autoplay loop>
        <source :src="movie.video" type="video/mp4">
      </video>
      <NuxtImg v-else :src="movie.poster" width="100%" :alt="movie.title" loading="lazy" class="w-full rounded aspect-[3/4] bg-gray-100" />
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
  