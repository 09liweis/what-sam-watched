<script setup>
import LinkButton from "@/components/LinkButton";
const { pages, curPage } = useGlobalState();

const getClass = (curPage, page) => {
  return `menu-item ${curPage == page ? "active" : ""}`;
};
</script>
<template>
  <section class="flex flex-wrap items-center justify-center gap-2 mb-2">
    <LinkButton
      v-for="page in pages"
      :class="getClass(curPage, page)"
      :to="{ query: { page } }"
      :text="page"
    />
  </section>
</template>
