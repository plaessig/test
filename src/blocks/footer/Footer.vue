<template>
  <footer class="portal-footer">
    <div class="portal-footer-inner">
      <div class="portal-footer-left" v-html="left"></div>
      <div class="portal-footer-right" v-html="right"></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Props {
  left?: string;
  right?: string;
}

defineProps<Props>();
</script>
