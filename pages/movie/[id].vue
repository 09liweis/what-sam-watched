<script setup>
import Loading from '~/components/Loading';
import MovieHeader from '~/components/movie/detail/MovieHeader';
import MovieTabs from '~/components/movie/detail/MovieTabs';
import PhotosTab from '~/components/movie/detail/PhotosTab';
import VideoCard from '~/components/videos/VideoCard';
import { onMounted, ref } from 'vue';
import { useMoviesStore } from '@/stores/movies';

const route = useRoute();
const moviesStore = useMoviesStore();
let movie = moviesStore.currentMovie;

let loading = ref(false);
const currentTab = ref('summary');

onMounted(async () => {
  loading.value = true;
  const responseData = await $fetch(
    `https://samliweisen.onrender.com/api/movie/douban/${route.params.id}?imgserver=img9`
  );
  loading.value = false;
  movie = responseData;
  moviesStore.setCurrentMovie(movie);
});

const fetchMovieDetailAPI = async (api, name) => {
  currentTab.value = name;
  loading.value = true;
  const apiData = await $fetch(api);
  loading.value = false;
  movie = { ...movie, [name]: apiData[name] };
}
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
      <Loading color="text-indigo-600" />
    </div>

    <template v-else-if="movie">
      <MovieHeader :movie="movie" />

      <div class="mt-8">
        <MovieTabs 
          :currentTab="currentTab"
          :tabs="movie.apis"
          @tabChange="fetchMovieDetailAPI"
        />

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div v-if="loading" class="flex justify-center py-8">
            <Loading color="text-indigo-600" />
          </div>

          <!-- Summary Tab -->
          <section v-else-if="currentTab === 'summary'" class="space-y-8">
            <!-- Photos Grid -->
            <div v-if="movie.photos?.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <div v-for="photo in movie.photos" class="rounded-lg overflow-hidden shadow-md">
                <NuxtImg :src="photo.src" class="w-full h-48 object-cover" />
              </div>
            </div>

            <!-- Comments -->
            <div v-if="movie.comments?.length" class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-800">Comments</h2>
              <div class="space-y-3">
                <div v-for="comment in movie.comments" class="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <p class="text-gray-600">{{ comment.text }}</p>
                </div>
              </div>
            </div>

            <!-- Reviews -->
            <div v-if="movie.reviews?.length" class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-800">Reviews</h2>
              <div class="space-y-4">
                <article v-for="review in movie.reviews" class="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <h3 class="font-bold text-gray-800 mb-2">{{ review.title }}</h3>
                  <p class="text-gray-600">{{ review.content }}</p>
                </article>
              </div>
            </div>

            <!-- Recommendations -->
            <div v-if="movie.recommends?.length" class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-800">Recommended Movies</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div v-for="recommend in movie.recommends" class="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                  <Image :src="recommend.poster" :classes="'w-full aspect-[3/4] object-cover'" />
                </div>
              </div>
            </div>
          </section>

          <!-- Photos Tab -->
          <PhotosTab v-else-if="currentTab === 'photos'" :photos="movie.photos" />

          <!-- Comments Tab -->
          <section v-else-if="currentTab === 'comments'" class="space-y-4">
            <article v-for="comment in movie.comments" class="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p class="text-gray-600">{{ comment.text }}</p>
            </article>
          </section>

          <!-- Reviews Tab -->
          <section v-else-if="currentTab === 'reviews'" class="space-y-6">
            <article v-for="review in movie.reviews" class="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 class="text-xl font-bold text-gray-800 mb-3">{{ review.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ review.content }}</p>
            </article>
          </section>

          <!-- Casts Tab -->
          <section v-else-if="currentTab === 'casts'" class="space-y-8">
            <div v-for="castSection in movie.casts" class="space-y-4">
              <h3 class="text-xl font-bold text-indigo-600">{{castSection.tl}}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <article v-for="cast in castSection.casts" class="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <NuxtImg :src="cast.avt" class="w-24 h-24 object-cover" />
                  <div class="p-4">
                    <h4 class="font-semibold text-gray-800">{{cast.name}}</h4>
                    <p class="text-gray-600 text-sm">{{cast.role}}</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <!-- Videos Tab -->
          <section v-else-if="currentTab === 'videos'" class="space-y-8">
            <div v-for="{title, videos} in movie.videos" class="space-y-4">
              <h3 class="text-xl font-bold text-gray-800">{{ title }}</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <VideoCard v-for="video in videos" :video="video" :setCurVideo="moviesStore.setCurVideo" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </template>

    <!-- Video Modal -->
    <div v-if="moviesStore.showVideo" class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <button 
        @click="moviesStore.hideVideo()" 
        class="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
      >
        <span class="sr-only">Close</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="w-full max-w-3xl mx-4">
        <video autoplay controls class="w-full rounded-lg shadow-2xl">
          <source :src="moviesStore.curVideo.src" type="video/mp4">
        </video>
      </div>
    </div>
  </main>
</template>