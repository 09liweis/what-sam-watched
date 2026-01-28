<script setup>
import { computed } from 'vue';
import { POSTER_DEFAULT } from '~/constants/movie';

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
});

const imageSource = computed(() => props.src || POSTER_DEFAULT);
</script>

<template>
  <div :class="className">
    <img
      :src="imageSource"
      :alt="alt"
      :placeholder="POSTER_DEFAULT"
      loading="lazy"
      class="w-full h-full object-cover"
      @error="$event.target.src = POSTER_DEFAULT"
    />
  </div>
</template>