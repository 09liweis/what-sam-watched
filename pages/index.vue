<script setup>
import Loading from '../components/Loading';
import Button from '../components/Button';
import MovieList from '~/components/MovieList.vue';
import Stats from '~/components/Stats.vue';
import Pagination from '~/components/Pagination.vue';
import { ref, computed, watch } from 'vue';
import { useMoviesStore } from '@/stores/movies';

const moviesStore = useMoviesStore();
moviesStore.getStats();

const route = useRoute();
// You can watch the property for triggering some other action on change
watch(() => route.query, () => {
  moviesStore.fetchMovies();
// Optionally you can set immediate: true config for the watcher to run on init
//}, { immediate: true });
});

const moviesCount = computed(() => moviesStore.movieList.length);

const runtimeConfig = useRuntimeConfig();

let loading = ref(false);
const showSearchForm = ref(false);

let doubanIdInput = ref('');
let searchMovieTitle = ref('');
const searchMovieLoading = ref(false);
const showFilter = ref(false);
let searchMovieList = [];

async function searchMovies() {
  searchMovieLoading.value = true;
  searchMovieList = await moviesStore.searchDoubanMovies(searchMovieTitle.value);
  searchMovieLoading.value = false;
}

function clickSearchedMovie(movie) {
  showSearchForm.value = false;
  searchAndUpsert(movie);
}

async function searchAndUpsert(movie) {
  loading.value = true;
  try {
    await moviesStore.upsertMovie(movie.douban_id);
    loading.value = false;
    moviesStore.fetchMovies();
    searchMovieList = []
    searchMovieTitle.value = '';
  } catch (error) {
    alert(error);
  }
}
</script>
<template>
  <main class="conatiner p-5">
    <Button :text="showFilter?'Hide Filter':'Show Filter'" :onClick="()=>showFilter=!showFilter" />
    <Stats v-if="showFilter" :stats="moviesStore.stats" :curCountry="moviesStore.curCountry" :curLang="moviesStore.curLang" :curGenre="moviesStore.curGenre" />
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
            class="cursor-pointer hover:bg-gray-100 p-1 rounded flex"
            v-for="v in searchMovieList"
            @click="clickSearchedMovie(v)"
          >
          <NuxtImg :src="v.poster" width="100" class="rounded hidden sm:block aspect-[3/4]" />
          <span>{{ v.title }}</span>
          </article>
        </section>
      </form>
    </section>
    <h1 :data-text="`What Sam Watched in Nuxt.js ${moviesStore.total} movies`" id="home-title" class="relative text-2xl text-center text-black-500 font-bold mb-8">
      What Sam Watched in Nuxt.js {{ moviesStore.total }} movies
    </h1>
    <Pagination/>
    <section class="flex items-center mb-1.5">
      <input
        class="border p-1.5 mr-1 rounded"
        placeholder="Enter Douban Id"
        v-model="doubanIdInput"
      />
      <Button :text="loading ? 'Loading' : 'Add'" :onClick="()=>showSearchForm=true" />
    </section>
    <MovieList />
    <Pagination/>
  </main>
</template>
