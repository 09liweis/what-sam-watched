<script>
import Loading from './Loading.vue';
import {getFilterCssClass} from '../utils/movie';

export default {
  props: ['stats','curLang','curGenre','curCountry'],
  setup(props) {
  }
}
</script>

<template>
  <Loading v-if="!stats.total" />
  <template v-else>
    <!-- Overview Stats -->
    <section class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow">
        <span class="text-gray-600">Total:</span>
        <span class="font-semibold text-indigo-600">{{ stats.total }}</span>
      </div>
      <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow">
        <span class="text-gray-600">Movies:</span>
        <span class="font-semibold text-indigo-600">{{ stats.movie }}</span>
      </div>
      <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow">
        <span class="text-gray-600">TV Shows:</span>
        <span class="font-semibold text-indigo-600">{{ stats.tv }}</span>
      </div>
      <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow">
        <span class="text-gray-600">Not Started:</span>
        <span class="font-semibold text-indigo-600">{{ stats.not_started }}</span>
      </div>
    </section>

    <!-- Filter Sections -->
    <div class="space-y-2">
      <!-- Countries Filter -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-gray-700 font-medium mb-3">Countries</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink 
            :class="getFilterCssClass(curCountry, '')" 
            :to="{query:{genre:curGenre,lang:curLang}}"
            class="px-3 py-1.5 text-sm"
          >
            All
          </NuxtLink>
          <NuxtLink 
            v-for="(count, country) in stats.countries" 
            :key="country"
            :class="getFilterCssClass(curCountry, country)" 
            :to="{query:{lang:curLang,country,genre:curGenre}}"
            class="px-3 py-1.5 text-sm"
          >
            {{ country }} ({{ count }})
          </NuxtLink>
        </div>
      </section>

      <!-- Languages Filter -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-gray-700 font-medium mb-3">Languages</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink 
            :class="getFilterCssClass(curLang, '')" 
            :to="{query:{genre:curGenre}}"
            class="px-3 py-1.5 text-sm"
          >
            All
          </NuxtLink>
          <NuxtLink 
            v-for="(count, lang) in stats.languages" 
            :key="lang"
            :class="getFilterCssClass(curLang, lang)" 
            :to="{query:{lang,genre:curGenre,country:curCountry}}"
            class="px-3 py-1.5 text-sm"
          >
            {{ lang }} ({{ count }})
          </NuxtLink>
        </div>
      </section>

      <!-- Genres Filter -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-gray-700 font-medium mb-3">Genres</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink 
            :class="getFilterCssClass(curGenre, '')" 
            :to="{query:{lang:curLang}}"
            class="px-3 py-1.5 text-sm"
          >
            All
          </NuxtLink>
          <NuxtLink 
            v-for="(count, genre) in stats.genres" 
            :key="genre"
            :class="getFilterCssClass(curGenre, genre)" 
            :to="{query:{genre,lang:curLang,country:curCountry}}"
            class="px-3 py-1.5 text-sm"
          >
            {{ genre }} ({{ count }})
          </NuxtLink>
        </div>
      </section>
    </div>
  </template>
</template>

<style scoped>
.movie-filter {
  @apply transition-all duration-200 border border-gray-200 rounded-md hover:border-indigo-500 hover:text-indigo-600 hover:shadow-sm;
}

.movie-filter.active {
  @apply border-indigo-500 bg-indigo-50 text-indigo-600;
}
</style>