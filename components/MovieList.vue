<script setup>
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();
moviesStore.fetchMovies();
</script>
<template>
  <section v-if="moviesStore.isfetchingMovieList" class="flex justify-center"><Loading color="'text-red-500'" /></section>
  <article v-else
    v-for="v in moviesStore.movieList"
    :key="v._id"
    class="movie-article"
  >
    <section class="flex">
      <NuxtImg :src="v.poster" width="100" :alt="v.title" loading="lazy" class="rounded hidden sm:block aspect-[3/4] mr-3 bg-gray-100" />
      <h3
        class="movie-title"
      >
        <NuxtLink
          @click="moviesStore.setCurrentMovie(v)"
          :to="{ name: 'id', params: { id: v.douban_id } }"
          >{{ v.title }}</NuxtLink
        >
        <section>
          <Rating title="Douban" :rating="v.douban_rating" :movieLink="v.origin_url" />
          <a v-if="v.imdb_id" :href="`https://www.imdb.com/title/${v.imdb_id}`" target="_blank" class="mr-4 text-yellow-700">IMDB: {{ v.imdb_rating }}</a>
        </section>
        <span class="mr-4 text-sky-600">{{ v.current_episode }}/{{ v.episodes }}</span>
      </h3>
    </section>
    <div class="flex">
      <button
        v-if="v.current_episode !== v.episodes"
        class="movie-episode-btn"
        @click="moviesStore.updateEpisode(v)"
      >
        +1
      </button>
      <button
        :disabled="v.loading"
        class="movie-update-btn"
        @click="moviesStore.getUpdatedMovie(v)"
      >
        <Loading v-if="v.loading"/>
        <span v-else>Update</span>
      </button>
    </div>
  </article>
</template>