<template>
  <main class="flex justify-center items-center max-h-max">
    <Loading color="text-red-500" v-if="loading" />
    <section class="flex flex-wrap" v-else>
      <article v-for="movie in moviesStore.movieList" class="w-1/2 sm:1/3 md:w-1/4 lg:w-1/6 p-2 transition duration-200 hover:scale-105">
        <video v-if="movie.video" autoplay loop>
          <source :src="movie.video" type="video/mp4">
        </video>
        <NuxtImg v-else :src="movie.poster" width="100%" :alt="movie.title" placeholder="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" loading="lazy" class="w-full rounded aspect-[3/4] bg-gray-100" />
        <h3>{{ movie.title }}</h3>
      </article>
    </section>
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
    await moviesStore.fetchMovies(route.params?.name);
    loading.value = false;
  });
  </script>
  