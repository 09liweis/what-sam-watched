<template>
    <a 
      :href="href" 
      target="_blank" 
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors duration-200"
      :class="[
        variant === 'douban' ? 'bg-green-50 hover:bg-green-100' : 'bg-yellow-50 hover:bg-yellow-100'
      ]"
    >
      <RatingIcon :color="variant === 'douban' ? 'text-green-500' : 'text-yellow-500'" />
      <span class="font-medium text-sm text-gray-700">{{ title }}:</span>
      <RatingScore :score="rating" />
    </a>
  </template>
  
  <script setup>
  import RatingIcon from './RatingIcon.vue';
  import RatingScore from './RatingScore.vue';
  
  defineProps({
    href: {
      type: String,
      required: true
    },
    rating: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'imdb',
      validator: (value) => ['imdb', 'douban'].includes(value)
    }
  });
  </script>