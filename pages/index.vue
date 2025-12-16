<script setup>
import Button from "~/components/Button";
import MovieList from "~/components/MovieList.vue";
import Stats from "~/components/Stats.vue";
import Pagination from "~/components/Pagination.vue";
import SearchForm from "~/components/search/SearchForm.vue";
import SearchResults from "~/components/search/SearchResults.vue";
import { ref, computed, watch } from "vue";
import { useMoviesStore } from "@/stores/movies";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const moviesStore = useMoviesStore();
moviesStore.getStats();

const route = useRoute();
watch(
  () => route.query,
  () => {
    moviesStore.fetchMovies();
  }
);

onMounted(() => {
  moviesStore.fetchMovies();
});

let loading = ref(false);
const showSearchForm = ref(false);
const showFilter = ref(false);
let searchMovieTitle = ref("");
const searchResults = ref([]);

async function handleSearch(query) {
  searchResults.value = await moviesStore.searchDoubanMovies(query);
}

async function handleMovieSelect(movie) {
  showSearchForm.value = false;
  loading.value = true;
  try {
    await moviesStore.upsertMovie(movie.douban_id);
    loading.value = false;
    moviesStore.fetchMovies();
    searchResults.value = [];
  } catch (error) {
    alert(error);
  }
}
</script>

<template>
  <main class="container p-5">
    <Button
      :text="showFilter ? 'Hide Filter' : 'Show Filter'"
      :onClick="() => (showFilter = !showFilter)"
    />
    <Stats
      v-if="showFilter"
      :stats="moviesStore.stats"
      :curCountry="moviesStore.curCountry"
      :curLang="moviesStore.curLang"
      :curGenre="moviesStore.curGenre"
    />

    <SearchForm
      v-if="showSearchForm"
      @close="showSearchForm = false"
      @searchMovies="handleSearch"
      @selectMovie="handleMovieSelect"
    >
      <template #results="{ onSelect }">
        <SearchResults :results="searchResults" :onSelect="onSelect" />
      </template>
    </SearchForm>

    <h1
      :data-text="`What Sam Watched in Nuxt.js ${moviesStore.total} movies`"
      id="home-title"
      class="relative text-3xl text-center text-black-500 font-bold my-5"
    >
      What Sam Watched in Nuxt.js {{ moviesStore.total }} movies
    </h1>

    <section v-if="authStore.isAuthenticated" class="flex items-center mb-1.5">
      <input
        class="border p-1.5 mr-1 rounded"
        placeholder="Search my movies"
        v-model="searchMovieTitle"
      />
      <Button
        :text="loading ? 'Loading' : 'Add'"
        :onClick="() => (showSearchForm = true)"
      />
    </section>

    <MovieList />
    <Pagination />
  </main>
</template>
