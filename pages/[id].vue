<template>
  <h2>{{visual.title}}</h2>
  <p>{{visual.imdb_id}}</p>
  <p>{{visual.douban_id}}</p>
  <p>{{visual.douban_rating}}</p>
  <nuxt-img :src="visual.poster"/>
</template>
<script setup>
const route = useRoute();
const { data } = await useFetch(`/api/visual?id=${route.params.id}`);
const {visual} = data.value;
</script>