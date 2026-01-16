<template>
  <div class="columns-wrapper">
    <div
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="columns-row"
    >
      <div
          v-for="(col, colIndex) in row"
          :key="colIndex"
          class="columns-col"
          :class="{ 'columns-img-col': col.isImageCol }"
          v-html="col.html"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Column = {
  html: string;
  isImageCol?: boolean;
};

interface Props {
  rows: Column[][];
}

defineProps<Props>();
</script>
