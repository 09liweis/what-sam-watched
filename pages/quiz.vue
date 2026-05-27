<script setup>
import { ref, onMounted } from 'vue';
import {
  API_QUIZ,
} from "~/constants/api";
import QuizCard from '~/components/quiz/QuizCard.vue';
import { useSeo } from '~/utils/seo';

// Set SEO for quiz page
useSeo({
  title: 'Movie Quiz | What Sam Watched',
  description: 'Test your movie knowledge with our interactive quiz. Guess movie titles from their descriptions and see how many you can get right!',
  keywords: 'movie quiz, film quiz, movie trivia, guess the movie',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'EducationalWebsite',
    name: 'Movie Quiz',
    description: 'Test your movie knowledge with our interactive quiz.',
    url: 'https://movies.samliweisen.dev/quiz',
  },
});

const currentQuiz = ref(null);
const selectedAnswer = ref(null);
const isCorrect = ref(null);
const loading = ref(false);

const generateNewQuiz = async () => {
  currentQuiz.value = await await $fetch(API_QUIZ);
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