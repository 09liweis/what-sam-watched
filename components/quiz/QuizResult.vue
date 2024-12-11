<script setup>
defineProps({
  isCorrect: {
    type: Boolean,
    required: true
  }
});

defineEmits(['next']);
</script>

<template>
  <div class="px-6 pb-6">
    <p :class="[
      'text-center font-medium mb-4',
      isCorrect ? 'text-green-600' : 'text-red-600'
    ]">
      {{ isCorrect ? 'Correct! 🎉' : 'Wrong answer! Try again.' }}
    </p>
    <button
      @click="$emit('next')"
      class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
    >
      Next Quiz
    </button>
  </div>
</template>