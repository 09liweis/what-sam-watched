<script setup>
import { ref, computed } from "vue";
const {data} = await useFetch('/api/visuals');
let {visuals} = data.value;

async function updateEpisode(v) {
  await useFetch(`/api/update?id=${v._id}`);
}

async function updateVisual(v) {
  console.log(v);
}

let input = ref('');

async function searchAndUpsert() {
  const douban_id = input.value;
  if (!douban_id) {
    return;
  }
  const body = {douban_id}
  await $fetch('/api/upsert',{
    method:'POST',
    body
  });
  const responseData = await $fetch('/api/visuals');
  visuals = responseData.visuals;
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
          <button @click="updateVisual(v)">Update</button>
          <button @click="updateEpisode(v)">+1</button>
        </h3>
      </article>
    </main>
  </NuxtLayout>
</template>