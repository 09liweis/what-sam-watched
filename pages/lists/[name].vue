<template>
  <main class="container p-5">
    <MovieList />
  </main>
</template>
<script setup>
  import MovieList from '~/components/MovieList';
  import { onMounted, ref, watch } from 'vue';
  import { useSeo } from '~/utils/seo';

  const {fetchMovieList} = useGlobalState();
  
  const route = useRoute();
  
  // set SEO based on list name
  useSeo({
    title: `Movies in ${route.params.name}`,
    description: `Explore the ${route.params.name} collection of movies Sam has watched.`,
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
  