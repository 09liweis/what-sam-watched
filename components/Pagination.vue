<script setup>
import { useMoviesStore } from "@/stores/movies";
import LinkButton from "@/components/LinkButton";
const moviesStore = useMoviesStore();

const getClass = (curPage, page) => {
  return `menu-item ${curPage == page ? "active" : ""}`;
};
</script>
<template>
  <section class="flex flex-wrap items-center justify-center gap-2 mb-2">
    <LinkButton
      v-for="page in moviesStore.pages"
      :class="getClass(moviesStore.page, page)"
      :to="{ query: { page } }"
      :text="page"
    />
  </section>
</template>
