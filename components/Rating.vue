<template>
  <RatingLink
    :href="movieLink"
    :rating="rating"
    :title="title"
    :variant="title.toLowerCase()"
    :class="styleClass"
  />
</template>

<script setup>
import RatingLink from './rating/RatingLink.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  rating: {
    type: [String, Number],
    required: true
  },
  movieLink: {
    type: String,
    required: true
  },
  styleClass: {
    type: String,
    default: ''
  }
});
</script>