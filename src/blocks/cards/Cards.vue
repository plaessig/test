<template>
  <ul :style="{ '--border-color': borderColor, '--card-theme': theme }">
    <li
      v-for="(card, index) in cards"
      :key="index"
      :class="['card-item', theme]"
    >
      <div class="cards-card-image" v-html="card.picture"></div>
      <div class="cards-card-body" v-html="card.body"></div>
    </li>
  </ul>
  <p>Test123</p>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
  cards: {
    type: Array,
    required: true,
  },
  // Optional props that authors can configure
  borderColor: {
    type: String,
    default: '#dadada',
  },
  theme: {
    type: String,
    default: 'default',
  },
});
</script>

