<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from './stores/auth';
import {SAM, ROUTES, getSubroutes} from './constants/route';
import LinkButton from '@/components/LinkButton';
import LoginPopup from '@/components/auth/LoginPopup.vue';

const route = useRoute();
const authStore = useAuthStore();

const showLoginPopup = ref(false);

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

const handleLogin = (userData) => {
  authStore.login(userData);
  showLoginPopup.value = false;
}

watch(() => route.params, () => {
  routeName.value = getRouteName(route);
});

watch(() => route.query, () => {
  subRouteName.value = getSubRouteName(route);
});
</script>

<template>
  <section class="max-w-5xl m-auto max-h-max box-border">
    <header class="pt-2 pb-4 sticky top-0 bg-white z-10">
      <nav class="flex flex-wrap justify-between items-center px-4">
        <div class="flex flex-wrap gap-2">
          <LinkButton v-for="(route,id) in ROUTES" :class="getRouteStyleClass(routeName, id)" :to="route.to" :text="route.nm" />
        </div>
        <button
          v-if="!authStore.isAuthenticated"
          @click="showLoginPopup = true"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
        <button
          v-else
          @click="authStore.logout()"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Sign Out
        </button>
      </nav>
      <section v-if="getSubroutes(routeName)" class="flex flex-wrap justify-center gap-2 mt-2">
        <LinkButton v-for="(route,id) in getSubroutes(routeName)" :class="getRouteStyleClass(subRouteName, id)" :to="route.to" :text="route.nm"/>
      </section>
    </header>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>

    <LoginPopup
      :show="showLoginPopup"
      @close="showLoginPopup = false"
      @login="handleLogin"
    />
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