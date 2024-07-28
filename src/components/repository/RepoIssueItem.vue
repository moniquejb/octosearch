<template>
  <li class="w-full px-3 py-4 group">
    <div class="w-full flex justify-between items-end gap-3 flex-wrap">
      <div>
        <font-awesome-icon v-if="item.state === 'open'" icon="fa-regular fa-circle-dot" size="sm" class="text-green-600" />
        <font-awesome-icon v-else icon="fa-regular fa-circle-check" size="sm" class="text-purple-500" />
        <span class="ps-2 group-hover:underline font-bold">{{ item.title }}</span>
      </div>
      <div class="w-full flex flex-wrap justify-between items-end gap-3">
        <div class="text-xs flex flex-wrap gap-3">
          <div>#{{ item.number }}</div>
          <div>
            Created {{ timeAgo(item.created_at) }}<span v-if="item.user"> by {{ item.user.login }}</span>
          </div>
          <div v-if="item.comments > 0" class="flex gap-1 items-center">
            <font-awesome-icon icon="fa-regular fa-message" size="sm" />
            {{ item.comments }}
          </div>
        </div>
        <div v-if="item.labels?.length" class="flex gap-2 flex-wrap">
          <template v-for="(label, i) in item.labels" :key="`label-${i}-${typeof label === 'object' ? label.name : label}`">
            <div v-if="typeof label === 'object'" :style="`background-color: #${label.color};color: #${label.color ? textColorByBg(label.color) : 'fff'}`" class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600">
              {{ label.name }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { GetRepoIssuesListResultItem } from '@/types/octokit'
import { textColorByBg, timeAgo } from '@/utilities'

interface Props {
  item: GetRepoIssuesListResultItem
}
const props = withDefaults(defineProps<Props>(), {})
</script>
