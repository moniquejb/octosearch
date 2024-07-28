<template>
  <router-link v-if="item.owner" target="_blank" :to="{ name: 'repository', params: { owner: item.owner.login, repo: item.name } }">
    <li class="group flex w-full flex-wrap justify-between gap-x-6 gap-y-3 px-3 py-4 mb-3 rounded-md bg-white shadow hover:shadow-md">
      <div class="flex gap-x-4 w-full">
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="item.owner.avatar_url" alt="" />
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-bold leading-6 text-gray-900 group-hover:underline whitespace-nowrap overflow-x-hidden">{{ item.full_name }}</p>
          <p v-if="item.description" class="mt-1 truncate text-xs leading-5 text-gray-500">{{ item.description }}</p>
        </div>
      </div>
      <div class="w-full flex justify-between items-baseline gap-3 flex-wrap">
        <div v-if="item.topics?.length" class="flex gap-2 flex-wrap">
          <template v-for="(topic, i) in item.topics" :key="`topic-${i}-${topic}`">
            <a v-if="i < 6" target="_blank" :href="`${gitHubUrl}/topics/${topic}`" class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200">
              {{ topic }}
            </a>
          </template>
        </div>
        <div class="ml-auto">
          <a :href="`${gitHubUrl}/${item.full_name}/stargazers`" target="_blank" class="text-xs flex gap-2 items-baseline text-gray-400 hover:text-gray-500">
            <font-awesome-icon icon="fa-star" size="sm" />
            {{ formatStarCount(item.stargazers_count) }}
          </a>
        </div>
      </div>
    </li>
  </router-link>
</template>

<script setup lang="ts">
import type { SearchRepoResponseResultItem } from '@/types/octokit'
import { formatStarCount, gitHubUrl } from '@/utilities'

interface Props {
  item: SearchRepoResponseResultItem
}
const props = withDefaults(defineProps<Props>(), {})
</script>
