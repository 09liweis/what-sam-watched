<script setup>
import { ref, computed, watch } from 'vue';
const route = useRoute();
const SAM = 'sam';
const getRouteName = (route) => {
  return route.params?.name || SAM;
}
let routeName = ref(getRouteName(route));
const ROUTES = [
  {id:SAM,to:'/',nm:'Sam'},
  {id:'in_theatre',to:'/movies/in_theatre',nm:'Mainland'},
  {id:'comming',to:'/movies/comming',nm:'In comming'},
  {id:'hongkong',to:'/movies/hongkong',nm:'Hongkong'},
  {id:'popular',to:'/movies/popular',nm:'Popular'},
  {id:'imdb_boxoffice',to:'/movies/imdb_boxoffice',nm:'IMDB Box Office'}
]
const getRouteStyleClass = (routeName, routeId) => {
  return `menu-item ${routeName == routeId?'active':''}`;
}
watch(() => route.params, () => {
  routeName.value = getRouteName(route);
// Optionally you can set immediate: true config for the watcher to run on init
//}, { immediate: true });
});
</script>
<template>
  <section class="bg-gray-50">
      <header class="mt-2 mb-4">
        <nav class="flex flex-wrap justify-center gap-2">
          <NuxtLink v-for="route in ROUTES" :class="getRouteStyleClass(routeName, route.id)" :to="route.to">{{ route.nm }}</NuxtLink>
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