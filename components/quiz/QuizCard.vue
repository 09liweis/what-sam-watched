<script setup>
import QuizSummary from './QuizSummary.vue';
import QuizAnswers from './QuizAnswers.vue';
import QuizResult from './QuizResult.vue';

defineProps({
  quiz: {
    type: Object,
    required: true
  },
  selectedAnswer: {
    type: String,
    default: null
  },
  isCorrect: {
    type: Boolean,
    default: null
  }
});

defineEmits(['check-answer', 'next-quiz']);
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <QuizSummary :summary="quiz.summary" />
    <QuizAnswers
      :answers="quiz.answers"
      :selected-answer="selectedAnswer"
      :correct-title="quiz.correctTitle"
      @select="$emit('check-answer', $event)"
    />
    <QuizResult
      v-if="selectedAnswer"
      :is-correct="isCorrect"
      @next="$emit('next-quiz')"
    />
  </div>
</template>