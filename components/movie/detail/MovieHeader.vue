<script setup>
import Rating from '@/components/Rating';
import Image from '@/components/Image';
import MovieBudget from '@/components/movie/MovieBudget';

defineProps({
  movie: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section class="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg shadow-lg">
    <div class="w-full md:w-2/5">
      <Image 
        v-if="movie?.poster" 
        :alt="movie.title" 
        :src="movie.poster" 
        :class="'rounded-lg shadow-md w-full aspect-[3/4] object-cover'" 
      />
    </div>
    <section class="w-full md:w-3/5 space-y-4">
      <h1 class="text-3xl font-bold text-indigo-600">
        {{ movie.title }}
      </h1>
      <p class="text-gray-600 leading-relaxed">{{ movie.summary }}</p>
      <div class="space-y-2">
        <Rating 
          v-if="movie.douban_id" 
          :rating="movie.douban_rating" 
          :movieLink="movie.origin_url" 
          :title="'Douban'"
          :styleClass="'text-lg font-semibold'" 
        />
        <MovieBudget 
          v-if="movie.budget"
          :budget="movie.budget"
          :boxOffice="movie.boxOffice"
        />
      </div>
    </section>
  </section>
</template>