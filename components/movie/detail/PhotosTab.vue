<script setup>
import { POSTER_DEFAULT } from '~/constants/movie';

defineProps({
  photos: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="(photo, index) in photos" :key="index" class="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
      <NuxtImg 
        v-if="photo?.origin" 
        :src="photo.origin || POSTER_DEFAULT" 
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
      />
    </div>
  </div>
</template>