<template>
  <div v-if="owner && repo" id="issues" class="flex w-full flex-wrap justify-center gap-x-6 gap-y-4 px-3 py-4 mb-3 rounded-md bg-white shadow">
    <div class="flex gap-2 font-bold text-lg justify-center pt-2 w-full items-center">
      <font-awesome-icon icon="fa-regular fa-circle-dot" size="sm" />
      Issues
    </div>
    <div v-if="repoIssues?.length" class="flex flex-col w-full">
      <div v-if="loadingChart || chartData" class="w-full pb-6 pt-1">
        <div class="max-w-80 mx-auto">
          <BarChart :data="chartData" />
        </div>
      </div>

      <div class="flex flex-wrap w-full gap-x-2 justify-center md:justify-end">
        <RepoIssueStateFilter @change="handleIssueStateChange" v-model="stateFilter" box-class="bg-gray-100" />
        <PerPageDropdown @change="handlePerPageChange" v-model="pagination.perPage" box-class="bg-gray-100" />
      </div>
      <ul role="list" class="divide-y divide-gray-400 w-full">
        <template v-for="item in repoIssues" :key="item.id">
          <a :href="`${gitHubUrl}/${owner}/${repo}/issues/${item.number}`" target="_blank">
            <RepoIssueItem :item="item" />
            <hr />
          </a>
        </template>
      </ul>
      <PrevNextPaginator @change="handlePageChange" class="w-full flex justify-center mt-4" box-class="bg-gray-100 hover:bg-gray-200" :current-page="pagination.page" :has-next="pagesRemaining" />
    </div>
    <div v-else-if="noResults" class="w-2/3 text-center py-5">
      <div v-if="stateFilter === 'all'"><i>This repo has no issues.</i></div>
      <div v-else>
        <i>There are no {{ stateFilter }} issues.</i>
      </div>
      <div v-if="stateFilter !== 'all'" @click="clearFilter" class="underline cursor-pointer mt-2 inline-block">Show all issues</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetRepoIssuesListResponseDataType } from '@/types/octokit'
import RepoIssueStateFilter from './RepoIssueStateFilter.vue'
import type { IssueState } from '@/types/repos'
import { onMounted, ref, type Ref } from 'vue'
import { providerIssueCount, providerRepoGetIssues } from '@/api/providerRepository'
import { determinePagesRemaining } from '@/utilities/octakit'
import type { Pagination, PaginatorOption, PerPageOption } from '@/types/pagination'
import PrevNextPaginator from '@/components/pagination/PrevNextPaginator.vue'
import { gitHubUrl, scrollTo } from '@/utilities'
import PerPageDropdown from '@/components/pagination/PerPageDropdown.vue'
import RepoIssueItem from './RepoIssueItem.vue'
import BarChart from '@/components/charts/BarChart.vue'

interface Props {
  owner: string
  repo: string
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'change', option: IssueState): void
}>()

let pagesRemaining = ref(true)
let stateFilter: Ref<IssueState> = ref('all')
let repoIssues: Ref<GetRepoIssuesListResponseDataType | null> = ref(null)
let pagination: Ref<Pagination> = ref({
  perPage: 25,
  page: 1,
})
let noResults = ref(false)
const loadingChart = ref(true)
const chartData: Ref<[number, number] | null> = ref(null)

onMounted(async () => {
  await loadInitialData(false)
})

function clearFilter() {
  stateFilter.value = 'all'
  loadInitialData()
}

function handleIssueStateChange(id: IssueState) {
  pagination.value.page = 1
  stateFilter.value = id
  loadInitialData()
}

function handlePerPageChange(option: PerPageOption) {
  pagination.value.perPage = option
  pagination.value.page = 1
  loadInitialData()
}

function handlePageChange(option: PaginatorOption) {
  const newPage = option === 'next' ? (pagination.value.page += 1) : (pagination.value.page -= 1)

  if (newPage > 0) {
    pagination.value.page = newPage
    loadInitialData()
  }
}

async function loadIssueTotals() {
  const openIssues = await providerIssueCount(props.owner, props.repo, 'OPEN')
  const closedIssues = await providerIssueCount(props.owner, props.repo, 'CLOSED')

  if (typeof openIssues === 'number' && typeof closedIssues === 'number') {
    chartData.value = [openIssues, closedIssues]
  }

  loadingChart.value = false
}

async function loadInitialData(scroll = true) {
  noResults.value = false
  if (props.owner && props.repo) {
    const res = await providerRepoGetIssues(props.owner, props.repo, stateFilter.value, pagination.value.page, pagination.value.perPage)
    repoIssues.value = res.data
    pagesRemaining.value = determinePagesRemaining(res.headers.link)

    if (!repoIssues.value.length) {
      noResults.value = true
    } else {
      loadIssueTotals()
    }

    if (scroll) {
      setTimeout(() => {
        scrollTo('#issues', -10)
      }, 0)
    }
  }
}
</script>
