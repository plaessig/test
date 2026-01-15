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
<script setup lang="ts">
import { computed } from 'vue';
import { slugify } from "../../utils/string-utils.ts";

interface CardData {
  picture: string;
  body: string;
}

interface Props {
  cards: CardData[];
  borderColor?: string;
  theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  borderColor: '#dadada',
  theme: 'default',
});

const processText = computed(() => {
  return slugify('hello world');
});
</script>

