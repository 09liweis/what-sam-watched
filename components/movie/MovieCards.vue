<script setup>
import {POSTER_DEFAULT} from '@/constants/movie';
import Rating from '@/components/Rating';
import { useMoviesStore } from '@/stores/movies';
const moviesStore = useMoviesStore();
</script>
<template>
  <section class="flex flex-wrap">
    <article v-for="movie in moviesStore.movieList" class="movie-card">
      <NuxtLink
          @click="moviesStore.setCurrentMovie(movie)"
          :to="`/movie/${movie.douban_id}`"
      >
        <video v-if="movie.video" autoplay loop class="movie-poster">
          <source :src="movie.video" type="video/mp4">
        </video>
        <NuxtImg v-else :src="movie.poster || POSTER_DEFAULT" width="100%" :alt="movie.title" :placeholder="POSTER_DEFAULT" loading="lazy" class="movie-poster" />
        <h3>{{ movie.title }}</h3>
        <Rating v-if="movie.douban_id" :rating="movie.douban_rating" :movieLink="movie.origin_url" :title="'Douban'" />
        <p v-if="movie.release" class="movie-card-year">{{ movie.release }}</p>
      </NuxtLink>
      <button
        v-if="(movie._id) && !movie.is_done"
        class="movie-episode-btn"
        @click="moviesStore.updateEpisode(movie)"
      >
      <span>{{movie.current_episode}}</span>
      <span>{{movie.episodes}}</span>
      </button>
    </article>
  </section>
</template>
<style scoped>
@keyframes appear {
  from {
    opacity: 0.5;
    scale: 0.8;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
.movie-card {
  animation: appear linear;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
  @media (prefers-reduced-motion) {
    animation: none;
  }
}
</style>