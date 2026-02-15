<script setup lang="ts">
import { computed } from 'vue';
import Loading from './Loading.vue';
import { getFilterCssClass } from '../utils/movie';

const props = defineProps<{ 
  stats: Record<string, any>;
  curLang: string;
  curGenre: string;
  curCountry: string;
}>();

// convenience computed accessors
const hasStats = computed(() => !!props.stats && props.stats.total);
</script>

<template>
  <Loading v-if="!hasStats" />
  <template v-else>
    <!-- Overview Stats -->
    <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <div class="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
        <span class="text-sm text-gray-500">Total</span>
        <span class="mt-1 text-2xl font-bold text-indigo-600">{{ props.stats.total }}</span>
      </div>
      <div class="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
        <span class="text-sm text-gray-500">Movies</span>
        <span class="mt-1 text-2xl font-bold text-indigo-600">{{ props.stats.movie }}</span>
      </div>
      <div class="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
        <span class="text-sm text-gray-500">TV Shows</span>
        <span class="mt-1 text-2xl font-bold text-indigo-600">{{ props.stats.tv }}</span>
      </div>
      <div class="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
        <span class="text-sm text-gray-500">Not Started</span>
        <span class="mt-1 text-2xl font-bold text-indigo-600">{{ props.stats.not_started }}</span>
      </div>
    </section>

    <!-- Filter Sections -->
    <div class="space-y-4">
      <!-- Countries Filter -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg text-gray-700 font-semibold mb-3">Countries</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            :class="getFilterCssClass(props.curCountry, '')"
            :to="{query:{genre:props.curGenre,lang:props.curLang}}"
            class="px-4 py-2 text-sm"
          >
            All
          </NuxtLink>
          <NuxtLink
            v-for="(count, country) in props.stats.countries"
            :key="country"
            :class="getFilterCssClass(props.curCountry, country)"
            :to="{query:{lang:props.curLang,country,genre:props.curGenre}}"
            class="px-4 py-2 text-sm"
          >
            {{ country }}
            <span class="ml-1 text-xs text-gray-500">({{ count }})</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Languages Filter -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg text-gray-700 font-semibold mb-3">Languages</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            :class="getFilterCssClass(props.curLang, '')"
            :to="{query:{genre:props.curGenre}}"
            class="px-4 py-2 text-sm"
          >
            All
          </NuxtLink>
          <NuxtLink
            v-for="(count, lang) in props.stats.languages"
            :key="lang"
            :class="getFilterCssClass(props.curLang, lang)"
            :to="{query:{lang,genre:props.curGenre,country:props.curCountry}}"
            class="px-4 py-2 text-sm"
          >
            {{ lang }}
            <span class="ml-1 text-xs text-gray-500">({{ count }})</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Genres Filter -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg text-gray-700 font-semibold mb-3">Genres</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            :class="getFilterCssClass(props.curGenre, '')"
            :to="{query:{lang:props.curLang}}"
            class="px-4 py-2 text-sm"
          >
            All
          </NuxtLink>
          <NuxtLink
            v-for="(count, genre) in props.stats.genres"
            :key="genre"
            :class="getFilterCssClass(props.curGenre, genre)"
            :to="{query:{genre,lang:props.curLang,country:props.curCountry}}"
            class="px-4 py-2 text-sm"
          >
            {{ genre }}
            <span class="ml-1 text-xs text-gray-500">({{ count }})</span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </template>
</template>

<style scoped>
/* pills used for filters */
.movie-filter {
  @apply inline-flex items-center transition-all duration-150 border border-gray-200 rounded-full text-gray-700 bg-white hover:border-indigo-400 hover:text-indigo-600 hover:shadow;
}
.movie-filter.active {
  @apply border-indigo-500 bg-indigo-50 text-indigo-600 font-medium;
}

/* small badge counts inside links */
.movie-filter span {
  @apply ml-1 text-xs text-gray-500;
}
</style>