<script setup>
defineProps({
  currentTab: {
    type: String,
    required: true
  },
  tabs: {
    type: Object,
    required: true
  }
});

defineEmits(['tabChange']);
</script>

<template>
  <nav class="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
    <button
      v-for="(api, key) of tabs"
      :key="key"
      @click="$emit('tabChange', api, key)"
      :class="[
        'px-4 py-2 font-medium rounded-t-lg transition-colors duration-200 capitalize',
        currentTab === key 
          ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
          : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
      ]"
    >
      {{ key }}
    </button>
  </nav>
</template>