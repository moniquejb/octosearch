<template>
  <div v-if="repoData">
    <OctoGoHome class="px-10 pt-5 ml-7" />
    <div class="w-full flex flex-col items-center">
      <div class="w-[95%] sm:w-5/6">
        <RepoBasicItem :item="repoData" component-type="div">
          <div class="mr-auto ml-auto md:ml-auto md:mr-0">
            <a :href="`${gitHubUrl}/${repoData.full_name}`" class="font-bold feat-link !text-[15px]" target="_blank"> <GitHubIcon class="w-5" /> View on GitHub</a>
          </div>
        </RepoBasicItem>
        <RepoBasicStats class="flex w-full flex-wrap justify-center md:justify-between gap-x-6 gap-y-3 px-3 py-4 mb-3 rounded-md bg-white shadow" :item="repoData" />
        <RepoIssues v-if="owner" :owner="owner" :repo="repo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { providerRepoGet } from '@/api/providerRepository'
import OctoGoHome from '@/components/navigation/OctoGoHome.vue'
import RepoBasicItem from '@/components/repository/RepoBasicItem.vue'
import RepoBasicStats from '@/components/repository/RepoBasicStats.vue'
import RepoIssues from '@/components/repository/RepoIssues.vue'
import GitHubIcon from '@/components/svgs/GitHubIcon.vue'
import type { GetRepoResponseDataType } from '@/types/octokit'
import { gitHubUrl } from '@/utilities'
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
  const res = await providerRepoGet(props.owner, props.repo)

  if (res?.data) {
    repoData.value = res.data
  }
}
</script>

<style lang="css" scoped></style>
