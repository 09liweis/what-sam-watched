<script setup>
import { ref, computed, watch } from 'vue';
import {SAM, ROUTES, getSubroutes} from './constants/route';
import LinkButton from '@/components/LinkButton';
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
});

watch(() => route.query, () => {
  subRouteName.value = getSubRouteName(route);
// Optionally you can set immediate: true config for the watcher to run on init
//}, { immediate: true });
});

</script>
<template>
  <section class="max-w-5xl m-auto max-h-max box-border">
    <header class="pt-2 pb-4 sticky top-0 bg-white z-10">
      <nav class="flex flex-wrap justify-center gap-2">
        <LinkButton v-for="(route,id) in ROUTES" :class="getRouteStyleClass(routeName, id)" :to="route.to" :text="route.nm" />
      </nav>
      <section v-if="getSubroutes(routeName)" class="flex flex-wrap justify-center gap-2 mt-2">
        <LinkButton v-for="(route,id) in getSubroutes(routeName)" :class="getRouteStyleClass(subRouteName, id)" :to="route.to" :text="route.nm"/>
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
    filter: blur(0.5rem);
  }
</style>