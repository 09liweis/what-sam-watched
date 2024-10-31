<script>
export default {
  props: ['movie', 'updateEpisode'],
  setup(props) {
    // setup() receives props as the first argument.
  }
}
</script>
<template>
  <button :style="`--progress: ${movie.progress}`" class="movie-episode-btn" @click="updateEpisode(movie)">
    <span class="relative z-0">{{movie.current_episode}}</span>
    <span class="relative z-0">{{movie.episodes}}</span>
  </button>
</template>