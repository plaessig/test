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
  <p>{{ processText }}</p>
</template>
<script setup>
import {computed, defineProps} from 'vue';
import {slugify} from "../../utils/string-utils.js";

const processText  = computed(() => {
  return slugify('hello world');
});

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

