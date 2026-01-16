<template>
  <!-- PrimeVue Cards Grid -->
  <div class="cards-container">
    <Card
      v-for="(card, index) in cards"
      :key="index"
      class="card-item"
    >
      <template #header>
        <div class="cards-card-image" v-html="card.picture"></div>
      </template>
      <template #title>
        <span v-if="card.title">{{ card.title }}</span>
        <span v-else>Card {{ index + 1 }}</span>
      </template>
      <template #content>
        <div class="cards-card-content" v-html="card.body"></div>
      </template>
      <template #footer>
        <div class="card-footer">
          <Button
            label="Test234"
            icon="pi pi-arrow-right"
            iconPos="right"
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
}

interface Props {
  cards: CardData[];
  borderColor?: string;
  theme?: string;
}

defineProps<Props>();
</script>


