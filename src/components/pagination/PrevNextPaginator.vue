<template>
  <div v-if="!(!hasNext && currentPage === 1)">
    <nav class="isolate inline-flex -space-x-px rounded-md shadow" aria-label="Pagination">
      <div @click="handlePageChange('prev')" :class="{ 'pointer-events-none !text-gray-200': !hasPrev, [`${boxClass}`]: true }" class="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 focus:z-20 focus:outline-offset-0">
        <font-awesome-icon class="w-5" icon="fa-chevron-left" size="sm" aria-hidden="true" />
      </div>
      <div :class="boxClass" class="pointer-events-none cursor-default aspect-square relative inline-flex items-center px-4 py-2 text-gray-400 focus:z-20 focus:outline-offset-0">
        {{ currentPage }}
      </div>
      <div @click="handlePageChange('next')" :class="boxClass" class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 focus:z-20 focus:outline-offset-0">
        <font-awesome-icon class="w-5" icon="fa-chevron-right" size="sm" aria-hidden="true" />
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { PaginatorOption } from '@/types/pagination'
import { computed } from 'vue'

interface Props {
  hasNext: boolean
  currentPage: number
  boxClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  hasNext: true,
  boxClass: 'bg-white hover:bg-gray-100',
})

const emit = defineEmits<{
  (e: 'change', option: PaginatorOption): void
}>()

const hasPrev = computed(() => props.currentPage > 1)

function handlePageChange(option: PaginatorOption) {
  emit('change', option)
}
</script>
