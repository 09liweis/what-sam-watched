<script>
export default {
  props: ['title','rating','movieLink','styleClass'],
  setup(props) {
    // setup() receives props as the first argument.
  }
}
</script>
<template>
  <a :href="movieLink" target="_blank" :class="`mr-4 cursor-pointer ${styleClass||''}`">{{ `${title}: ${rating}` }}</a>
</template>