<template>
  <main>
    <Loading v-if="loading" />
    <section class="flex" v-if="movie">
      <NuxtImg v-if="movie?.poster" :src="movie.poster" width="30%" class="" />
      <section>
        <h1 class="mr-2 shadow bg-indigo-500 text-white p-1 flex rounded-md">
          {{ movie.title }}
        </h1>
        <p>{{ movie.imdb_id }}</p>
        <p>{{ movie.summary }}</p>
        <p>{{ movie.douban_rating }}</p>
      </section>
    </section>
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
    `https://samliweisen.onrender.com/api/movies/${route.params.id}?imgserver=img9`
  );
  loading.value = false;
  movie = responseData.movie;
  moviesStore.setCurrentMovie(movie);
});
</script>
