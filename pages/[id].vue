<template>
  <main>
    <h1>{{visual.title}}</h1>
    <p>{{visual.imdb_id}}</p>
    <p>{{visual.douban_id}}</p>
    <p>{{visual.douban_rating}}</p>
    
  </main>
</template>
<script setup>
const route = useRoute();
const { data } = await useFetch(`/api/visual?id=${route.params.id}`);
const {visual} = data.value;
</script>