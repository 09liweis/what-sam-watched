<script setup>
import Loading from '../components/Loading';
import { ref, computed } from 'vue';

const runtimeConfig = useRuntimeConfig();
const API_HOST = runtimeConfig.public.apiHost || '';

const dataFetch = async () => {
  const result = await useFetch(`${API_HOST}/api/visuals`);
  return result;
};

let loading = ref(false);
let visuals = ref([]);

const { data } = await dataFetch();
visuals.value = data.value.visuals;

async function updateEpisode(v) {
  const response = await useFetch(`/api/update?id=${v._id}`);
  const { data } = await dataFetch();
  visuals.value = data;
}

async function updateVisual(v) {
  v.loading = true;
  await $fetch(`${API_HOST}/api/upsert`, {
    method: 'POST',
    body: v,
  });
  // v.loading = false;
}

let input = ref('');

async function searchAndUpsert() {
  const douban_id = input.value;
  if (!douban_id) {
    return;
  }
  loading.value = true;
  const body = { douban_id };
  await $fetch('/api/upsert', {
    method: 'POST',
    body,
  });
  input.value = '';
  loading.value = false;
  const responseData = await $fetch('/api/visuals');
  visuals.value = responseData.visuals;
}
</script>
<template>
  <NuxtLayout>
    <main class="conatiner p-5">
      <h1 class="text-xl text-center text-red-500 font-bold mb-8">
        What Sam Watched in Nuxt.js
      </h1>
      <input placeholder="Enter Douban Id" v-model="input" />
      <button
        class="border px-1.5 border-amber-600 rounded"
        @click="searchAndUpsert()"
      >
        {{ loading ? 'Loading' : 'Add' }}
      </button>
      <article
        v-for="v in visuals"
        :key="v.id"
        class="flex justify-between mb-1.5"
      >
        <h3
          class="
            font-mono
            text-red-400
            hover:text-red-900
            decoration-blue-300
            hover:decoration-blue-400
          "
        >
          <NuxtLink :to="{ name: 'id', params: { id: v._id } }">{{
            v.title
          }}</NuxtLink>
          <span class="ml-8 mr-8">Douban: {{ v.douban_rating }}</span>
          <span class="ml-8 mr-8"
            >{{ v.current_episode }}/{{ v.episodes }}</span
          >
        </h3>
        <div class="flex">
          <button
            class="mr-2 shadow bg-indigo-500 text-white p-1 flex rounded-md"
            @click="updateVisual(v)"
          >
            <Loading v-if="v - loading" />
            <span>Update</span>
          </button>
          <button
            class="border px-1.5 border-amber-600 rounded"
            @click="updateEpisode(v)"
          >
            +1
          </button>
        </div>
      </article>
    </main>
  </NuxtLayout>
</template>
