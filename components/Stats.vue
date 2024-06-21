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
    <section class="flex gap-x-3">
      <a>Total: {{stats.total}}</a>
      <a>Movie: {{stats.movie}}</a>
      <a>TV: {{stats.tv}}</a>
      <a>Not Started: {{ stats.not_started }}</a>
    </section>

    <section class="flex gap-x-3 flex-wrap">
      <span>Countries: </span>
      <NuxtLink :class="getFilterCssClass(curCountry, '')" :to="{query:{genre:curGenre,lang:curLang}}">All</NuxtLink>
      <NuxtLink v-for="count,country of stats.countries" :class="getFilterCssClass(curCountry, country)" :to="{query:{lang:curLang,country,genre:curGenre}}">{{ `${country}(${count})` }}</NuxtLink>
    </section>
    
    <section class="flex gap-x-3 flex-wrap">
      <span>Languages: </span>
      <NuxtLink :class="getFilterCssClass(curLang, '')" :to="{query:{genre:curGenre}}">All</NuxtLink>
      <NuxtLink v-for="count,lang of stats.languages" :class="getFilterCssClass(curLang, lang)" :to="{query:{lang,genre:curGenre,country:curCountry}}">{{ `${lang}(${count})` }}</NuxtLink>
    </section>

    <section class="flex gap-x-3 flex-wrap">
      <span>Genres: </span>
      <NuxtLink :class="getFilterCssClass(curGenre, '')" :to="{query:{lang:curLang}}">All</NuxtLink>
      <NuxtLink v-for="count,genre of stats.genres" :class="getFilterCssClass(curGenre, genre)" :to="{query:{genre,lang:curLang,country:curCountry}}">{{ `${genre}(${count})` }}</NuxtLink>
    </section>

  </template>
</template>