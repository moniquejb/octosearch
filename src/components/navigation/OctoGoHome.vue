<template>
  <div class="flex justify-center items-center">
    <router-link :to="{ name: 'home' }" class="cursor-pointer group gap-2 inline-flex justify-center items-center">
      <OctocatMascot :animate="false" className="cursor-pointer w-16" />
      <div class="bg-white px-2 py-1 rounded-md shadow group-hover:underline">Home</div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import OctocatMascot from '@/components/search/OctocatMascot.vue'
</script>
