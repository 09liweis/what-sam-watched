<template>
  <main class="flex justify-center items-center h-full">
    <Loading color="text-red-500" v-if="loading" />
    <section class="flex flex-wrap" v-else>
      <article v-for="movie in moviesStore.movieList" class="w-1/2 sm:1/3 md:w-1/4 lg:w-1/6 relative p-2 transition duration-200 hover:scale-105">
        <video v-if="movie.video" autoplay loop class="movie-poster">
          <source :src="movie.video" type="video/mp4">
        </video>
        <NuxtImg v-else :src="movie.poster" onerror="this.src=movie.origin_poster" width="100%" :alt="movie.title" placeholder="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" loading="lazy" class="movie-poster" />
        <h3>{{ movie.title }}</h3>
        <Rating v-if="movie.douban_id" :rating="movie.douban_rating" :movieLink="movie.origin_url" :title="'Douban'" />
        <p v-if="movie.release" class="bg-white text-sky-600 rounded px-1 absolute top-2 left-2">{{ movie.release }}</p>
      </article>
    </section>
  </main>
</template>
  <style></style>
<script setup>
  import Loading from '../components/Loading';
  import Rating from '../components/Rating';
  import { onMounted, ref } from 'vue';
  import { useMoviesStore } from '@/stores/movies';
  const runtimeConfig = useRuntimeConfig();
  
  const route = useRoute();
  const moviesStore = useMoviesStore();
  
  let loading = ref(false);
  
  onMounted(async () => {
    loading.value = true;
    await moviesStore.fetchMovies(route.params?.name);
    loading.value = false;
  });
  </script>
  