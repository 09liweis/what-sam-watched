<script setup>
import {POSTER_DEFAULT} from '../../constants/movie';
import Rating from '../components/Rating';
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();
</script>
<template>
  <article v-for="movie in moviesStore.movieList" class="movie-card">
    <video v-if="movie.video" autoplay loop class="movie-poster">
      <source :src="movie.video" type="video/mp4">
    </video>
    <NuxtImg v-else :src="movie.poster || POSTER_DEFAULT" width="100%" :alt="movie.title" :placeholder="POSTER_DEFAULT" loading="lazy" class="movie-poster" />
    <h3>{{ movie.title }}</h3>
    <Rating v-if="movie.douban_id" :rating="movie.douban_rating" :movieLink="movie.origin_url" :title="'Douban'" />
    <p v-if="movie.release" class="movie-card-year">{{ movie.release }}</p>
  </article>
</template>