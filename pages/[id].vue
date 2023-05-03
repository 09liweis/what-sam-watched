<template>
  <main>
    <h1>{{ visual.title }}</h1>
    <p>{{ visual.imdb_id }}</p>
    <p>{{ visual.douban_id }}</p>
    <p>{{ visual.douban_rating }}</p>
  </main>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig();
const API_HOST = runtimeConfig.public.apiHost || '';

const route = useRoute();
const { data } = await useFetch(`${API_HOST}/api/visual?id=${route.params.id}`);
const { visual } = data.value;
</script>
