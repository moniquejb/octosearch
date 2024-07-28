<template>
  <main class="relative">
    <SearchLoader v-if="miscStore.loading" />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import SearchLoader from './components/loaders/SearchLoader.vue'
import { useMiscStore } from './stores/misc'

const miscStore = useMiscStore()
</script>
