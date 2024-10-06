<script>
import Image from '~/components/Image';
export default {
  props: ['video'],
  setup(props) {
    // setup() receives props as the first argument.
  }
}
</script>
<template>
  <section class="w-1/2 sm:w-1/4 md:w-1/5 lg:w-1/6" @click="console.log(video.video_id)">
    <Image :src="video.photo" :alt="video.title" :classes="''" />
    <h4 class="text-sm">{{video.title}}</h4>
  </section>
</template>