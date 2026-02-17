<script setup>
import Header from '@/components/Header.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
</script>

<template>
  <section class="max-w-7xl m-auto max-h-max box-border">
    <Header />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>

    <ScrollToTop />
  </section>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>