<script>
export default {
  props: ['title','rating','movieLink'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.title)
  }
}
</script>
<template>
  <a :href="movieLink" target="_blank" class="mr-4 cursor-pointer text-green-700">{{ `${title}: ${rating}` }}</a>
</template>