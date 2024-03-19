<script>
export default {
  props:['movies','updateMovie','updateEpisode']
}
</script>
<template>
  <article
    v-for="v in movies"
    :key="v._id"
    class="movie-article"
  >
    <section class="flex">
      <NuxtImg :src="v.poster" width="100" :alt="v.title" loading="lazy" class="rounded hidden sm:block aspect-[3/4] mr-3 bg-gray-100" />
      <h3
        class="movie-title"
      >
        <NuxtLink
          @click="moviesStore.setCurrentMovie(v)"
          :to="{ name: 'id', params: { id: v.douban_id } }"
          >{{ v.title }}</NuxtLink
        >
        <section>
          <a :href="`https://movie.douban.com/subject/${v.douban_id}`" target="_blank" class="mr-4 text-green-700"
            >Douban: {{ v.douban_rating }}</a
          >
          <a v-if="v.imdb_rating" :href="`https://www.imdb.com/title/${v.imdb_id}`" target="_blank" class="mr-4 text-yellow-700">IMDB: {{ v.imdb_rating }}</a>
        </section>
        <span class="mr-4 text-sky-600">{{ v.current_episode }}/{{ v.episodes }}</span>
      </h3>
    </section>
    <div class="flex">
      <button
        v-if="v.current_episode !== v.episodes"
        class="movie-episode-btn"
        @click="updateEpisode(v)"
      >
        +1
      </button>
      <button
        class="movie-update-btn"
        @click="updateMovie(v)"
      >
        <Loading v-if="v.loading" />
        <span>{{ v.loading ? 'Updating' : 'Update' }}</span>
      </button>
    </div>
  </article>
</template>