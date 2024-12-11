<script setup>
defineProps({
  answers: {
    type: Array,
    required: true
  },
  selectedAnswer: {
    type: String,
    default: null
  },
  correctTitle: {
    type: String,
    required: true
  }
});

defineEmits(['select']);
</script>

<template>
  <div class="p-6 space-y-4">
    <button
      v-for="answer in answers"
      :key="answer"
      @click="$emit('select', answer)"
      :disabled="selectedAnswer"
      :class="[
        'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200',
        selectedAnswer ? (
          answer === correctTitle
            ? 'bg-green-100 text-green-800 border-green-300'
            : answer === selectedAnswer
              ? 'bg-red-100 text-red-800 border-red-300'
              : 'bg-gray-50 text-gray-500'
        ) : 'bg-white border hover:bg-gray-50 text-gray-700'
      ]"
    >
      {{ answer }}
    </button>
  </div>
</template>