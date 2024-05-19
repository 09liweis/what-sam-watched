<template>
  <main>
    <Loading v-if="loading" color="text-red" />
    <section>
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
      
      <section class="flex mt-3">
        <article v-for="photo in movie.photos" class="w-1/5 gap-x-2">
          <NuxtImg :src="photo.src" width="100%" class="rounded" />
        </article>
      </section>

      <section class="mt-3">
        <article v-for="comment in movie.comments" class="mt-1">
          <p>{{ comment.text }}</p>
        </article>
      </section>

      <section class="mt-3 flex">
        <article v-for="recommend in movie.recommends" class="w-1/4 gap-x-1">
          <NuxtImg :src="recommend.poster" width="100%" class="rounded"/>
        </article>
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
    `https://samliweisen.onrender.com/api/movie/douban/${route.params.id}?imgserver=img9`
  );
  loading.value = false;
  movie = responseData;
  moviesStore.setCurrentMovie(movie);
});
</script>
