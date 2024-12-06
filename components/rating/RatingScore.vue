<template>
    <span :class="['font-medium', textColor]">{{ score }}</span>
  </template>
  
  <script setup>
  const props = defineProps({
    score: {
      type: [String, Number],
      required: true
    }
  });
  
  const textColor = computed(() => {
    const numScore = Number(props.score);
    if (numScore >= 8) return 'text-green-600';
    if (numScore >= 6) return 'text-yellow-600';
    return 'text-red-600';
  });
  </script>