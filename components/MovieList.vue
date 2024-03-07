<script>
export default {
  props:['movies','updateMovie','updateEpisode']
}
</script>
<template>
  <article
    v-for="v in movies"
    :key="v._id"
    class="flex justify-between items-center mb-1.5 p-1 border-2 rounded"
  >
    <NuxtImg :src="v.poster" width="100" class="rounded" />
    <h3
      class="
        font-mono
        text-red-400
        hover:text-red-900
        decoration-blue-300
        hover:decoration-blue-400
      "
    >
      <NuxtLink
        @click="moviesStore.setCurrentMovie(v)"
        :to="{ name: 'id', params: { id: v.douban_id } }"
        >{{ v.title }}</NuxtLink
      >
      <section>
        <span class="mr-4 text-green-700"
          >Douban: {{ v.douban_rating }}</span
        >
        <span v-if="v.imdb_rating" class="mr-4 text-yellow-700">IMDB: {{ v.imdb_rating }}</span>
        <span class="mr-4 text-sky-600"
          >{{ v.current_episode }}/{{ v.episodes }}</span
        >
      </section>
    </h3>
    <div class="flex">
      <button
        v-if="v.current_episode !== v.episodes"
        class="mr-2 border px-1.5 border-amber-600 rounded"
        @click="updateEpisode(v)"
      >
        +1
      </button>
      <button
        class="shadow bg-indigo-500 text-white p-1 flex rounded-md"
        @click="updateMovie(v)"
      >
        <Loading v-if="v.loading" />
        <span>{{ v.loading ? 'Updating' : 'Update' }}</span>
      </button>
    </div>
  </article>
</template>