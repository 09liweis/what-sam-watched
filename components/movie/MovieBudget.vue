<script setup>
defineProps({
  budget: {
    type: String,
    default: ''
  },
  boxOffice: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="space-y-1">
    <p v-if="budget" class="text-sm text-gray-600">
      Budget: <span class="font-medium">{{ budget }}</span>
    </p>
    <p v-if="boxOffice" class="text-sm text-gray-600">
      Box Office: <span class="font-medium">{{ boxOffice }}</span>
    </p>
  </div>
</template>