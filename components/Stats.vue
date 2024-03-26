<script>
import Loading from './Loading.vue';

export default {
  props: ['stats','curLang','curGenre','curCountry'],
  setup(props) {
    
  }
}

</script>
<template>
  <section v-if="stats.total">
    <section class="flex gap-x-3">
      <a>Total: {{stats.total}}</a>
      <a>Movie: {{stats.movie}}</a>
      <a>TV: {{stats.tv}}</a>
    </section>

    <section class="flex gap-x-3 flex-wrap">
      <span>Countries: </span>
      <NuxtLink :class="curLang == ''?'text-red-500':'hover-lang'" :to="{query:{genre:curGenre,lang:curLang}}">All</NuxtLink>
      <NuxtLink v-for="count,country of stats.countries" :class="curCountry == country?'text-red-500':'hover-lang'" :to="{query:{lang:curLang,country,genre:curGenre}}">{{ `${country}(${count})` }}</NuxtLink>
    </section>
    
    <section class="flex gap-x-3 flex-wrap">
      <span>Languages: </span>
      <NuxtLink :class="curLang == ''?'text-red-500':'hover-lang'" :to="{query:{genre:curGenre}}">All</NuxtLink>
      <NuxtLink v-for="count,lang of stats.languages" :class="curLang == lang?'text-red-500':'hover-lang'" :to="{query:{lang,genre:curGenre,country:curCountry}}">{{ `${lang}(${count})` }}</NuxtLink>
    </section>

    <section class="flex gap-x-3 flex-wrap">
      <span>Genres: </span>
      <NuxtLink :class="curGenre == ''?'text-red-500':'hover-lang'" :to="{query:{lang:curLang}}">All</NuxtLink>
      <NuxtLink v-for="count,genre of stats.genres" :class="curGenre == genre?'text-red-500':'hover-lang'" :to="{query:{genre,lang:curLang,country:curCountry}}">{{ `${genre}(${count})` }}</NuxtLink>
    </section>

  </section>
  <section v-if="!stats.total">
    <Loading />
  </section>
</template>