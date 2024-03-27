<script setup>
import { ref, computed, watch } from 'vue';
const route = useRoute();
let routeName = ref(route.params?.name);
const ROUTES = [
  {id:'sam',to:'/',nm:'Sam'},
  {id:'in_theatre',to:'/movies/in_theatre',nm:'Mainland'},
  {id:'hongkong',to:'/movies/hongkong',nm:'Hongkong'},
  {id:'popular',to:'/movies/popular',nm:'Popular'},
  {id:'imdb_boxoffice',to:'/movies/imdb_boxoffice',nm:'IMDB Box Office'}
]
watch(() => route.params, () => {
  routeName.value = route.params?.name;
// Optionally you can set immediate: true config for the watcher to run on init
//}, { immediate: true });
});
</script>
<template>
  <section>
      <header class="mt-2 mb-4">
        <nav class="flex justify-center gap-x-2">
          <NuxtLink v-for="route in ROUTES" :class="`menu-item ${routeName == route.id?'active':''}`" :to="route.to">{{ route.nm }}</NuxtLink>
        </nav>
      </header>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </section>
</template>
<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>