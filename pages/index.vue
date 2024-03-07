<script setup>
import Loading from '../components/Loading';
import Button from '../components/Button';
import MovieList from '~/components/MovieList.vue';
import { ref, computed } from 'vue';
import { useMoviesStore } from '@/stores/movies';

const moviesStore = useMoviesStore();

const moviesCount = computed(() => moviesStore.movieList.length);

const runtimeConfig = useRuntimeConfig();
const API_HOST =
  runtimeConfig.public.apiHost || 'https://samliweisen.onrender.com/api/movies';

const fetchMovies = async () => {
  const fetchResp = await $fetch(`${API_HOST}?limit=50`);
  moviesStore.setMovieList(fetchResp.movies);
};

let loading = ref(false);
const showSearchForm = ref(false);

fetchMovies();

async function updateMovie(v) {
  v.loading = true;
  const response = await $fetch(`${API_HOST}/upsert`, {
    method: 'POST',
    body: v,
  });
  v.douban_rating = response.douban_rating;
  v.loading = false;
}

async function updateEpisode(v) {
  const response = await $fetch(`${API_HOST}/${v.douban_id}`, {
    method: 'PUT',
  });
  fetchMovies();
}

let doubanIdInput = ref('');
let searchMovieTitle = ref('');
const searchMovieLoading = ref(false);
let searchMovieList = [];

async function searchMovies() {
  searchMovieLoading.value = true;
  const searchMoviesResult = await $fetch(
    `${API_HOST}/search?keyword=${searchMovieTitle.value}`
  );
  searchMovieLoading.value = false;
  searchMovieList = searchMoviesResult.visuals;
}

function clickSearchedMovie(movie) {
  doubanIdInput.value = movie.douban_id;
  showSearchForm.value = false;
  searchAndUpsert();
}

async function searchAndUpsert() {
  const douban_id = doubanIdInput.value;
  if (!douban_id) {
    showSearchForm.value = true;
    return;
  }
  loading.value = true;
  const body = { douban_id };
  await $fetch(`${API_HOST}/upsert`, {
    method: 'POST',
    body,
  });
  doubanIdInput.value = '';
  loading.value = false;
  fetchMovies();
}
</script>
<template>
  <NuxtLayout>
    <main class="conatiner p-5">
      <section
        v-show="showSearchForm"
        class="
          fixed
          top-0
          left-0
          w-full
          h-full
          bg-black
          flex
          justify-center
          items-center
        "
      >
        <a
          class="
            block
            absolute
            cursor-pointer
            top-2
            right-2
            p-1
            rounded
            bg-red-500
            text-white
            transition
            duration-300
            hover:bg-red-600 hover:scale-110
          "
          @click="showSearchForm = false"
          >x</a
        >
        <form class="w-96 p-2 bg-white rouned" @submit.prevent="searchMovies()">
          <input
            placeholder="Search movie title"
            class="w-full p-2 border shadow"
            v-model="searchMovieTitle"
          />
          <button class="p-2 rounded bg-red-400 text-white mt-2 flex">
            <Loading v-if="searchMovieLoading" />
            <span class="">Search</span>
          </button>
          <section class="max-h-60 overflow-y-auto">
            <article
              class="cursor-pointer hover:bg-gray-100 p-1 rounded"
              v-for="v in searchMovieList"
              @click="clickSearchedMovie(v)"
            >
              {{ v.title }}
            </article>
          </section>
        </form>
      </section>
      <h1 class="text-xl text-center text-red-500 font-bold mb-8">
        What Sam Watched in Nuxt.js {{ moviesCount }} movies
      </h1>
      <section class="flex items-center mb-1.5">
        <input
          class="border p-1.5 mr-1 rounded"
          placeholder="Enter Douban Id"
          v-model="doubanIdInput"
        />
        <Button :text="loading ? 'Loading' : 'Add'" :onClick="searchAndUpsert" />
      </section>
      <MovieList :movies="moviesStore.movieList" :updateMovie="updateMovie" :updateEpisode="updateEpisode" />
    </main>
  </NuxtLayout>
</template>
