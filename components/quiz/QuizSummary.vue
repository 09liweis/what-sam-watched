<script setup>
defineProps({
  summary: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="p-6 bg-indigo-50">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Guess the Movie</h2>
    <p class="text-gray-700 leading-relaxed">{{ summary }}</p>
  </div>
</template>