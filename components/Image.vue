<script>
import {POSTER_DEFAULT} from '../constants/movie';
export default {
  props: ['src','alt','classes'],
  setup(props) {
    
  }
};
</script>
<template>
  <NuxtImg :src="src || POSTER_DEFAULT" :class="`${classes} movie-poster`" :alt="alt" :placeholder="POSTER_DEFAULT" loading="lazy" />
</template>