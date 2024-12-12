<script setup>
defineProps({
  summary: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  showPoster: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div class="p-6 bg-indigo-50">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Guess the Movie</h2>
      <button 
        @click="$emit('toggle-view')"
        class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Switch to {{ showPoster ? 'Summary' : 'Poster' }}
      </button>
    </div>
    
    <div v-if="showPoster" class="flex justify-center">
      <NuxtImg 
        :src="poster" 
        class="rounded-lg shadow-md max-h-[400px] object-cover blur"
        loading="lazy"
      />
    </div>
    <p v-else class="text-gray-700 leading-relaxed">{{ summary }}</p>
  </div>
</template>