<template>
  <NuxtLayout>
    <main class="conatiner">
      <h1 class="text-xl text-center text-red-500 font-bold mb-8">What Sam Watched in Nuxt.js</h1>
      <article v-for="v in visuals" :key="v.id">
        <h3 class="font-mono text-red-400 hover:text-red-900 underline decoration-blue-300 hover:decoration-blue-400">
          <NuxtLink :to="{ name: 'id', params: { id: v._id }}">{{ v.title }}</NuxtLink>
        </h3>
      </article>
    </main>
  </NuxtLayout>
</template>

<script setup>
const { data } = await useFetch('/api/visuals')
const {visuals} = data.value;
</script>