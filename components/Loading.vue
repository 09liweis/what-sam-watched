<script setup>
defineProps({
  color: {
    type: String,
    default: 'text-white'
  },
  type: {
    type: String,
    default: 'spinner' // 'spinner' or 'skeleton'
  },
  count: {
    type: Number,
    default: 1
  }
});
</script>

<template>
  <template v-if="type === 'spinner'">
    <svg
      :class="`animate-spin -ml-1 h-5 w-5 ${color}`"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </template>

  <div v-else-if="type === 'skeleton'" class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    <div 
      v-for="n in count" 
      :key="n"
      class="animate-pulse"
    >
      <!-- Poster -->
      <div class="relative overflow-hidden rounded-lg shadow-lg bg-gray-200 aspect-[2/3]"></div>
      
      <!-- Title -->
      <div class="mt-2 h-6 bg-gray-200 rounded w-3/4"></div>
      
      <!-- Ratings -->
      <div class="mt-2 space-y-2">
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>