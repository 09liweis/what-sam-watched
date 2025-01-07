<script setup>
// No props or logic needed for the skeleton
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8 animate-pulse">
    <!-- Movie Header Skeleton -->
    <div class="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg shadow-lg">
      <!-- Poster Skeleton -->
      <div class="w-full md:w-2/5">
        <div class="rounded-lg bg-gray-200 w-full aspect-[3/4]"></div>
      </div>
      
      <!-- Info Skeleton -->
      <div class="w-full md:w-3/5 space-y-4">
        <!-- Title -->
        <div class="h-8 bg-gray-200 rounded w-3/4"></div>
        
        <!-- Summary -->
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        
        <!-- Ratings -->
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-32"></div>
          <div class="h-6 bg-gray-200 rounded w-40"></div>
        </div>
      </div>
    </div>

    <!-- Tabs Skeleton -->
    <div class="mt-8">
      <div class="flex gap-4 border-b border-gray-200 mb-6">
        <div class="h-10 bg-gray-200 rounded w-24"></div>
        <div class="h-10 bg-gray-200 rounded w-24"></div>
        <div class="h-10 bg-gray-200 rounded w-24"></div>
      </div>

      <!-- Content Skeleton -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="n in 8" :key="n" class="space-y-2">
            <div class="rounded-lg bg-gray-200 aspect-[3/4]"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
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