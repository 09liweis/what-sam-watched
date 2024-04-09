<template>
  <main class="flex justify-center items-center h-full">
    <Loading color="text-red-500" v-if="loading" />
    <section class="flex flex-wrap" v-else>
      <article v-for="movie in moviesStore.movieList" class="movie-card">
        <video v-if="movie.video" autoplay loop class="movie-poster">
          <source :src="movie.video" type="video/mp4">
        </video>
        <NuxtImg v-else :src="movie.poster || POSTER_DEFAULT" width="100%" :alt="movie.title" :placeholder="POSTER_DEFAULT" loading="lazy" class="movie-poster" />
        <h3>{{ movie.title }}</h3>
        <Rating v-if="movie.douban_id" :rating="movie.douban_rating" :movieLink="movie.origin_url" :title="'Douban'" />
        <p v-if="movie.release" class="movie-card-year">{{ movie.release }}</p>
      </article>
    </section>
  </main>
</template>
  <style></style>
<script setup>
  import Loading from '../components/Loading';
  import Rating from '../components/Rating';
  import {POSTER_DEFAULT} from '../../constants/movie';
  import { onMounted, ref } from 'vue';
  import { useMoviesStore } from '@/stores/movies';
  const runtimeConfig = useRuntimeConfig();
  
  const route = useRoute();
  const moviesStore = useMoviesStore();
  
  let loading = ref(false);

  const fetchMovies = async () => {
    loading.value = true;
    await moviesStore.fetchMovies(route.query?.nm || route.params?.name);
    loading.value = false;
  }
  
  onMounted(async () => {
    await fetchMovies();
  });

  watch(() => route.query, async() => {
    await fetchMovies();
  });

  </script>
  