<script setup>
defineProps({
  results: {
    type: Array,
    required: true,
  },
  onSelect: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="movie in results"
      :key="movie.douban_id"
      @click="onSelect(movie)"
      class="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
    >
      <img
        :src="movie.poster"
        :alt="movie.title"
        class="w-20 h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
      />
      <div class="flex flex-col justify-between py-1">
        <h3
          class="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors"
        >
          {{ movie.title }} - {{ movie.douban_rating }}
        </h3>
        <p v-if="movie.year" class="text-sm text-gray-500">
          {{ movie.year }}
        </p>
      </div>
    </div>
  </div>
</template>
