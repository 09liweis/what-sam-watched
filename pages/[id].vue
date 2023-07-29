<template>
  <main>
    <h1 class="mr-2 shadow bg-indigo-500 text-white p-1 flex rounded-md">
      {{ movie.title }}<Loading v-if="loading" />
    </h1>
    <p>{{ movie.imdb_id }}</p>
    <p>{{ movie.douban_id }}</p>
    <p>{{ movie.douban_rating }}</p>
  </main>
</template>
<style></style>
<script setup>
import Loading from '../components/Loading';
import { onMounted, ref } from 'vue';
import { useMoviesStore } from '@/stores/movies';
const runtimeConfig = useRuntimeConfig();
const API_HOST = runtimeConfig.public.apiHost || '';

const route = useRoute();
const moviesStore = useMoviesStore();
let movie = moviesStore.currentMovie;

let loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const responseData = await $fetch(
    `https://samliweisen.onrender.com/api/movies/${route.params.id}`
  );
  loading.value = false;
  movie = responseData;
  moviesStore.setCurrentMovie(responseData);
});
</script>
