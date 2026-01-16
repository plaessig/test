<template>
  <nav class="nav-sidebar" :class="{ 'nav-collapsed': collapsed }">
    <!-- Brand Banner -->
    <div v-if="brandName || brandLogo" class="nav-brand">
      <div class="nav-brand-container">
        <div v-if="brandLogo" class="nav-brand-logo" v-html="brandLogo"></div>
        <span v-if="brandName && !collapsed" class="nav-brand-name">{{ brandName }}</span>
      </div>
    </div>

    <div class="nav-header">
      <button
        class="nav-toggle"
        @click="collapsed = !collapsed"
        :aria-label="collapsed ? 'Expand navigation' : 'Collapse navigation'"
      >
        <span class="nav-toggle-icon">☰</span>
      </button>
      <h2 v-if="!collapsed  && title" class="nav-title">{{ title }}</h2>
    </div>

    <ul class="nav-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="nav-item"
        :class="{ 'active': item.active }"
      >
        <a
          :href="item.link"
          class="nav-link"
          :title="item.name"
        >
          <span
            v-if="item.icon"
            class="nav-icon"
            v-html="item.icon"
          ></span>
          <span
            v-if="item.name"
            class="nav-label"
          >
            {{ item.name }}
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface NavItem {
  icon?: string;
  name: string;
  link: string;
  active?: boolean;
}

interface Props {
  items: NavItem[];
  title?: string;
  defaultCollapsed?: boolean;
  brandName?: string;
  brandLogo?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false,
});

const collapsed = ref(props.defaultCollapsed);
</script>

