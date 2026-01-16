<template>
  <!-- PrimeVue Cards Grid -->
  <div
    class="cards-container"
    :class="theme ? `cards-theme-${theme}` : ''"
    :style="borderColor ? `--cards-border-color: ${borderColor}` : ''"
  >
    <Card
      v-for="(card, index) in cards"
      :key="index"
      class="card-item"
    >
      <template #header>
        <div class="cards-card-image" v-html="card.picture"></div>
      </template>
      <template #title v-if="card.title">
        {{ `${card.title}`}}
      </template>
      <template #content>
        <div class="cards-card-content" v-html="card.body"></div>
      </template>
      <template #footer v-if="card.buttonText">
        <div class="card-footer">
          <Button
            :label="card.buttonText"
            size="small"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';

interface CardData {
  picture: string;
  body: string;
  title?: string;
  buttonText?: string;
}

interface Props {
  cards: CardData[];
  borderColor?: string;
  theme?: string;
}

defineProps<Props>();
</script>


