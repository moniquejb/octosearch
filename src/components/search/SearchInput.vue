<template>
  <div class="relative rounded-md shadow w-[95%] sm:w-2/3 xl:w-1/2 h-16">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <span class="text-gray-500 flex-center px-1">
        <font-awesome-icon icon="fa-search" size="lg" />
      </span>
    </div>
    <input id="search" type="text" placeholder="Search GitHub repositories..." v-model="modelValue" @keyup.enter="emit('submit')" class="block w-full h-full outline-none rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-700 placeholder:text-gray-400 sm:text-base sm:leading-6" />
    <div class="absolute inset-y-0 right-0 flex items-center">
      <button :disabled="!modelValue" @click="emit('submit')" class="bg-gray-300 py-0 text-gray-500 sm:text-xl font-bold h-full flex-center aspect-square rounded-e-md border-0 transition-colors hover:bg-gray-200 disabled:bg-gray-300/60 disabled:text-gray-500/60">GO</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ required: true })

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>
