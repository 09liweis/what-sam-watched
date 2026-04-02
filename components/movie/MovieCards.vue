<script setup>
import MovieCard from "@/components/movie/MovieCard.vue";
const {movies} = useGlobalState();
</script>

<template>
  <section
    class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  >
    <MovieCard
      v-for="movie in movies"
      :key="movie.douban_id"
      :movie="movie"
    />
  </section>
</template>
