<script setup>
import { ref, computed } from "vue";
const {data} = await useFetch('https://samliweisen.cyclic.app/api/visuals');
const {visuals} = data.value;

async function updateEpisode(v) {
  await useFetch(`/api/update?id=${v._id}`);
}

let input = ref('');

async function searchAndUpsert() {
  const douban_id = input.value;
  if (!douban_id) {
    return;
  }
  const body = {douban_id}
  const visualSummary = await $fetch('https://samliweisen.herokuapp.com/api/visuals/summary', {
    method: 'POST',
    body
  });
  const {douban_rating,poster,imdb_id,imdb_rating,visual_type,title} = visualSummary;
  const upsertBody = {
    douban_id,
    douban_rating,
    title,
    imdb_id,
    imdb_rating,
    poster,
    visual_type
  }
  const upsertResult = await $fetch('https://samliweisen.cyclic.app/api/visuals',{
    method:'POST',
    body
  });
  console.log(upsertResult);
}
</script>
<template>
  <NuxtLayout>
    <main class="conatiner">
      <h1 class="text-xl text-center text-red-500 font-bold mb-8">What Sam Watched in Nuxt.js</h1>
      <input placeholder="Enter Douban Id" v-model="input" />
      <button @click="searchAndUpsert()">Add</button>
      <article v-for="v in visuals" :key="v.id">
        <h3 class="font-mono text-red-400 hover:text-red-900 underline decoration-blue-300 hover:decoration-blue-400">
          <NuxtLink :to="{ name: 'id', params: { id: v._id }}">{{ v.title }}</NuxtLink>
          <span class="ml-8 mr-8">{{v.current_episode}}/{{v.episodes}}</span>
          <button @click="updateEpisode(v)">+1</button>
        </h3>
      </article>
    </main>
  </NuxtLayout>
</template>