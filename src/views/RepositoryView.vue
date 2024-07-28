<template>
  <pre>{{ repoData }}</pre>
</template>

<script setup lang="ts">
import { providerRepoGet } from '@/api/providerRepository'
import type { GetRepoResponseDataType } from '@/types/octokit'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps<{
  owner: string
  repo: string
}>()

let repoData: Ref<GetRepoResponseDataType | null> = ref(null)

onMounted(() => {
  loadInitialData()
})

async function loadInitialData() {
  repoData.value = (await providerRepoGet(props.owner, props.repo)).data
}
</script>

<style lang="css" scoped></style>
