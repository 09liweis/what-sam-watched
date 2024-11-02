<script setup>
import {POSTER_DEFAULT} from '@/constants/movie';
import Rating from '@/components/Rating';
import MovieEpisodeBtn from '@/components/movie/MovieEpisodeBtn';
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();
</script>
<template>
  <section class="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
    <article v-for="movie in moviesStore.movieList" class="movie-card">
      <NuxtLink
          @click="moviesStore.setCurrentMovie(movie)"
          :to="`/movie/${movie.douban_id}`"
      >
        <video v-if="movie.video" autoplay loop class="movie-poster">
          <source :src="movie.video" type="video/mp4">
        </video>
        <NuxtImg v-else :src="movie.poster || POSTER_DEFAULT" width="100%" :alt="movie.title" :placeholder="POSTER_DEFAULT" loading="lazy" class="movie-poster" />
        <h3 class="movie-title">{{ movie.title }}</h3>
        <span v-if="movie.release||movie.year" class="movie-card-year">{{ movie.release||movie.year }}</span>
      </NuxtLink>
      <Rating v-if="movie.douban_id" :styleClass="'text-green-700'" :rating="movie.douban_rating" :movieLink="movie.origin_url" :title="'Douban'" />
      <Rating v-if="movie.imdb_id" :styleClass="'text-yellow-800'" :rating="movie.imdb_rating" :movieLink="movie.imdb_url" :title="'IMDB'" />
      <p v-if="movie.currentGross">Current Gross: {{movie.currentGross}}</p>
      <p v-if="movie.totalGross">Total Gross: {{movie.totalGross}}</p>
      <MovieEpisodeBtn v-if="movie._id" :movie="movie" :updateEpisode="moviesStore.updateEpisode" />
    </article>
  </section>
</template>