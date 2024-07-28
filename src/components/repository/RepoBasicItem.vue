<template>
  <component v-if="item.owner" is="li" class="flex w-full flex-wrap justify-between gap-x-6 gap-y-4 px-3 py-4 mb-3 rounded-md bg-white shadow">
    <div class="flex gap-x-4 w-full">
      <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="item.owner.avatar_url" alt="" />
      <div class="min-w-0 flex-auto">
        <p class="text-lg font-bold leading-6 text-gray-900 group-hover:underline" :class="{ '!text-sm whitespace-nowrap overflow-x-hidden': isList, truncate: !isList }">{{ item.full_name }}</p>
        <p v-if="item.description" :class="{ '!text-xs truncate': isList }" class="mt-1 text-[15px] leading-5 text-gray-500">{{ item.description }}</p>
      </div>
    </div>
    <div class="w-full flex justify-between items-end gap-3 flex-wrap">
      <div v-if="item.topics?.length" class="flex gap-2 flex-wrap">
        <template v-for="(topic, i) in item.topics" :key="`topic-${i}-${topic}`">
          <a v-if="i < 6" target="_blank" :href="`${gitHubUrl}/topics/${topic}`" :class="{ '!text-xs truncate': isList }" class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200">
            {{ topic }}
          </a>
        </template>
      </div>
      <slot>
        <div class="ml-auto">
          <a :href="`${gitHubUrl}/${item.full_name}/stargazers`" target="_blank" class="text-xs flex gap-2 items-baseline text-gray-400 hover:text-gray-500">
            <font-awesome-icon icon="fa-star" size="sm" />
            {{ formatThousand(item.stargazers_count) }}
          </a>
        </div>
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import type { GetRepoResponseDataType, SearchRepoResponseResultItem } from '@/types/octokit'
import { formatThousand, gitHubUrl } from '@/utilities'
import { computed } from 'vue'

interface Props {
  item: SearchRepoResponseResultItem | GetRepoResponseDataType
  componentType?: 'li' | 'div'
}
const props = withDefaults(defineProps<Props>(), {
  componentType: 'li',
})

const isList = computed(() => props.componentType === 'li')
</script>
