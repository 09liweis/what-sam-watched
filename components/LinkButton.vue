<script>
export default {
  props: ['text','to','cssClass'],
  setup(props) {
    // setup() receives props as the first argument.
  }
}
</script>
<template>
  <NuxtLink :class="cssClass" :to="to">{{ text }}</NuxtLink>
</template>