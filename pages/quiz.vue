<script setup>
import { ref, onMounted } from 'vue';
import { useMoviesStore } from '@/stores/movies';
import QuizCard from '~/components/quiz/QuizCard.vue';

const moviesStore = useMoviesStore();
const currentQuiz = ref(null);
const selectedAnswer = ref(null);
const isCorrect = ref(null);
const loading = ref(false);

const generateNewQuiz = async () => {
  currentQuiz.value = await moviesStore.getMovieQuiz();
  selectedAnswer.value = null;
  isCorrect.value = null;
};

const checkAnswer = (answer) => {
  selectedAnswer.value = answer;
  isCorrect.value = answer === currentQuiz.value.correctTitle;
};

onMounted(async () => {
  loading.value = true;
  generateNewQuiz();
  loading.value = false;
});
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Movie Quiz</h1>
      
      <div v-if="loading" class="flex justify-center">
        <Loading color="text-indigo-600" />
      </div>

      <QuizCard
        v-else-if="currentQuiz"
        :quiz="currentQuiz"
        :selected-answer="selectedAnswer"
        :is-correct="isCorrect"
        @check-answer="checkAnswer"
        @next-quiz="generateNewQuiz"
      />
    </div>
  </main>
</template>