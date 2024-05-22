<script setup>
import { ref, computed, watch } from 'vue';
import {SAM, ROUTES, getSubroutes} from './constants/route';
const route = useRoute();

const getRouteName = (route) => {
  return route.params?.name || SAM;
}

const getSubRouteName = (route) => {
  return route.query?.nm;
}

let routeName = ref(getRouteName(route));
let subRouteName = ref(getSubRouteName(route));

const getRouteStyleClass = (routeName, routeId) => {
  return `menu-item ${routeName == routeId?'active':''}`;
}
watch(() => route.params, () => {
  routeName.value = getRouteName(route);
// Optionally you can set immediate: true config for the watcher to run on init
//}, { immediate: true });
});

watch(() => route.query, () => {
  subRouteName.value = getSubRouteName(route);
// Optionally you can set immediate: true config for the watcher to run on init
//}, { immediate: true });
});

</script>
<template>
  <section class="max-w-5xl m-auto max-h-max">
    <header class="pt-2 pb-4 sticky top-0 bg-white z-10">
      <nav class="flex flex-wrap justify-center gap-2">
        <NuxtLink v-for="(route,id,index) in ROUTES" :class="getRouteStyleClass(routeName, id)" :to="route.to">{{ route.nm }}</NuxtLink>
      </nav>
      <section v-if="getSubroutes(routeName)" class="flex flex-wrap justify-center gap-2 mt-2">
        <NuxtLink v-for="(route,id) in getSubroutes(routeName)" :class="getRouteStyleClass(subRouteName, id)" :to="route.to">{{ route.nm }}</NuxtLink>
      </section>
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