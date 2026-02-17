<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: String,
  to: [String, Object],
  cssClass: String,
});

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
</script>

<template>
  <NuxtLink :class="cssClass" :to="to" @click="scrollToTop">
    {{ text }}
  </NuxtLink>
</template>