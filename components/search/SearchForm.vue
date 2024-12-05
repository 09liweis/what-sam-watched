<script setup>
import Loading from '../Loading.vue';
import { ref } from 'vue';

const emit = defineEmits(['close', 'searchMovies', 'selectMovie']);

const searchQuery = ref('');
const isLoading = ref(false);

const handleSearch = async () => {
  isLoading.value = true;
  await emit('searchMovies', searchQuery.value);
  isLoading.value = false;
};

const handleMovieSelect = (movie) => {
  emit('selectMovie', movie);
};
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-semibold text-gray-800">Search Movies</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Search Form -->
      <form @submit.prevent="handleSearch" class="p-4 border-b">
        <div class="flex gap-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Enter movie title..."
            class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            :disabled="isLoading"
          >
            <Loading v-if="isLoading" />
            <span>Search</span>
          </button>
        </div>
      </form>

      <!-- Results -->
      <div class="max-h-[60vh] overflow-y-auto p-4">
        <slot name="results" :onSelect="handleMovieSelect"></slot>
      </div>
    </div>
  </div>
</template>