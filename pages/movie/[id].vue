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

      <header class="mt-4">
        <nav>
          <a @click="fetchMovieDetailAPI(api, key)" :class="`capitalize mr-3 border p-1 rounded ${currentTab === key ? 'text-red-800 border-red-800': ''}`" v-for="(api, key) of movie.apis">{{ key }}</a>
        </nav>
      </header>
      
      <section v-if="currentTab === 'summary'">
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

        <section class="mt-3">
          <article v-for="review in movie.reviews" class="mt-2">
            <h3 class="font-bold">{{ review.title }}</h3>
            <p>{{ review.content }}</p>
          </article>
        </section>

        <section class="mt-3 flex">
          <article v-for="recommend in movie.recommends" class="w-1/4 gap-x-1">
            <NuxtImg :src="recommend.poster" width="100%" class="rounded"/>
          </article>
        </section>
      </section>

      <section v-if="currentTab === 'photos'" class="flex flex-wrap">
        <article v-for="photo in movie.photos" class="w-1/4">
          <NuxtImg v-if="photo?.thumb" :src="photo.thumb || POSTER_DEFAULT" width="100%"/>
        </article>
      </section>

      <section class="" v-if="currentTab === 'comments'">
        <article v-for="comment in movie.comments" class="mt-1">
          <p>{{ comment.text }}</p>
        </article>
      </section>

      <section class="" v-if="currentTab === 'reviews'">
        <article v-for="review in movie.reviews" class="mt-2">
          <h3 class="font-bold">{{ review.title }}</h3>
          <p>{{ review.content }}</p>
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
import {POSTER_DEFAULT} from '../../constants/movie';
const runtimeConfig = useRuntimeConfig();
const API_HOST = runtimeConfig.public.apiHost || '';

const route = useRoute();
const moviesStore = useMoviesStore();
let movie = moviesStore.currentMovie;

let loading = ref(false);
const currentTab = ref('summary');

onMounted(async () => {
  loading.value = true;
  const responseData = await $fetch(
    `https://samliweisen.onrender.com/api/movie/douban/${route.params.id}?imgserver=img9`
  );
  loading.value = false;
  movie = responseData;
  moviesStore.setCurrentMovie(movie);
});

const fetchMovieDetailAPI = async (api, name) =>{
  currentTab.value = name;
  loading.value = true;
  const apiData = await $fetch(api);
  loading.value = false;
  movie = {...movie, [name]:apiData[name]};
}
</script>
