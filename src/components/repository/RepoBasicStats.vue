<template>
  <div v-if="item">
    <div v-if="item.homepage">
      <a :href="item.homepage" target="_blank" class="font-bold feat-link">
        <font-awesome-icon icon="fa-link" size="sm" />
        {{ formatHomepageUrl(item.homepage) }}
      </a>
    </div>
    <div class="flex flex-wrap justify-center gap-x-6 gap-y-1 w-full md:w-auto" :class="{ 'mx-auto': !item.homepage }">
      <template v-for="link in linkTo" :key="link.name">
        <a v-if="typeof link.data === 'number'" :href="`${gitHubUrl}/${item.full_name}/${link.name}`" target="_blank" class="feat-link">
          <font-awesome-icon :icon="link.iconClass" size="sm" />
          {{ formatThousand(link.data) }}
        </a>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetRepoResponseDataType, SearchRepoResponseResultItem } from '@/types/octokit'
import { formatThousand, gitHubUrl } from '@/utilities'
import { computed } from 'vue'

interface Props {
  item: SearchRepoResponseResultItem | GetRepoResponseDataType
}
const props = withDefaults(defineProps<Props>(), {})

const linkTo = computed(() => {
  return [
    {
      name: 'stargazers',
      iconClass: 'fa-star',
      data: props.item?.stargazers_count,
    },
    {
      name: 'watchers',
      iconClass: 'fa-eye',
      data: props.item?.watchers,
    },
    {
      name: 'forks',
      iconClass: 'fa-code-fork',
      data: props.item?.forks,
    },
  ]
})

function formatHomepageUrl(url: string): string {
  return url.replace('https://', '').replace('http://', '').replace('www.', '')
}
</script>
