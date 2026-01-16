<template>
  <header class="site-header">
    <div class="header-content">
      <!-- Left side - could add title/logo here if needed -->
      <div class="header-left">
        <!-- Empty for now, can add page title or breadcrumbs -->
      </div>

      <!-- Right side - Profile & Language -->
      <div class="header-right">

        <!-- Profile Picture Icon -->
        <div class="profile-icon">
          <Avatar
              icon="pi pi-user"
              class="profile-avatar"
              shape="circle"
              size="large"
          />
        </div>

        <!-- Language Dropdown -->
        <Dropdown
          v-model="selectedLanguage"
          :options="languages"
          optionLabel="name"
          placeholder="Select Language"
          class="language-dropdown"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="language-item">
              <span>{{ slotProps.value.flag }}</span>
              <span>{{ slotProps.value.code }}</span>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="language-item">
              <span>{{ slotProps.option.flag }}</span>
              <span>{{ slotProps.option.name }}</span>
            </div>
          </template>
        </Dropdown>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import Avatar from 'primevue/avatar';

interface Language {
  name: string;
  code: string;
  flag: string;
}

const languages = ref<Language[]>([
  { name: 'English', code: 'EN', flag: '🇬🇧' },
  { name: 'Deutsch', code: 'DE', flag: '🇩🇪' },
  { name: 'Français', code: 'FR', flag: '🇫🇷' },
]);

const selectedLanguage = ref<Language>(languages.value[0]);
</script>

