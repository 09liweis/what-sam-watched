<template>
  <main class="container p-5">
    <MovieList />
  </main>
</template>
<script setup lang="ts">
  import MovieList from '~/components/MovieList';
  import { onMounted, ref, watch } from 'vue';
  import { useSeo } from '~/utils/seo';

  const {fetchMovieList} = useGlobalState();
  
  const route = useRoute();
  const listName = (route.params.name as string) || '';
  
  // set SEO based on list name
  useSeo({
    title: `${listName} Movies | What Sam Watched`,
    description: `Explore the ${listName} collection of movies watched by Sam. Browse ratings, details, and discover films in this curated list.`,
    keywords: `movies, ${listName}, film collection, movie ratings, ${listName} films`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${listName} Movies`,
      description: `Explore the ${listName} collection of movies watched by Sam.`,
      url: route.fullPath,
    },
  });
  
  let loading = ref(false);

  const fetchMovies = async () => {
    await fetchMovieList(`${route.params?.name}/${route.query?.nm||''}`);
  }
  
  onMounted(() => {
    fetchMovies();
  });

  watch(() => route.query, () => {
    fetchMovies();
  });

  </script>
  