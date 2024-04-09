<script setup>
import { ref, computed, watch } from 'vue';
import {SAM, ROUTES} from './constants/route';
const route = useRoute();

const getRouteName = (route) => {
  return route.params?.name || SAM;
}
let routeName = ref(getRouteName(route));

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
  <section class="bg-gray-50 h-screen">
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