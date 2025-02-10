<script setup>
import Rating from '@/components/Rating';
import MovieEpisodeBtn from '@/components/movie/MovieEpisodeBtn';
import MoviePoster from '@/components/movie/MoviePoster';
import { useMoviesStore } from '@/stores/movies';
import { useAuthStore } from '~/stores/auth';

defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const authStore = useAuthStore();
const moviesStore = useMoviesStore();
</script>

<template>
  <article class="movie-card group">
    <NuxtLink
      @click="moviesStore.setCurrentMovie(movie)"
      :to="`/movie/${movie.douban_id}`"
      class="block overflow-hidden"
    >
      <div class="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl">
        <video v-if="movie.video" autoplay loop class="w-full aspect-[2/3] object-cover">
          <source :src="movie.video" type="video/mp4">
        </video>
        <MoviePoster
          v-else
          :src="movie.poster"
          :alt="movie.title"
          className="aspect-[2/3] transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <span v-if="movie.release||movie.year" class="movie-card-year">
          {{ movie.release||movie.year }}
        </span>
      </div>
      <h3 :title="movie.title" class="mt-2 text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-red-500">
        {{ movie.title }}
      </h3>
    </NuxtLink>
    
    <div class="mt-2 space-y-1">
      <Rating 
        v-if="movie.douban_id" 
        :rating="movie.douban_rating" 
        :movieLink="movie.origin_url" 
        :title="'Douban'" 
      />
      <Rating 
        v-if="movie.imdb_id" 
        :rating="movie.imdb_rating" 
        :movieLink="movie.imdb_url" 
        :title="'IMDB'" 
      />
      <p v-if="movie.currentGross" class="text-sm text-gray-600">
        Current: <span class="font-mtsi" v-html="movie.currentGross"></span>
      </p>
      <p v-if="movie.totalGross" class="text-sm text-gray-600">
        Total: {{movie.totalGross}}
      </p>
      <MovieEpisodeBtn 
        v-if="movie._id && authStore.isAuthenticated" 
        :movie="movie" 
        :updateEpisode="moviesStore.updateEpisode" 
      />
      <button
        v-if="movie._id && authStore.isAuthenticated"
        @click="moviesStore.deleteMovie(movie._id)"
        class="w-full text-red-600 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md transition-colors duration-200 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  </article>
</template>