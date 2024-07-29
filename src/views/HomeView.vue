<template>
  <div class="home-view w-full flex flex-col items-center py-10">
    <OctocatMascot />
    <div class="w-full flex justify-center">
      <SearchInput @submit="submitSearch" v-model="searchValue" />
    </div>

    <div class="w-full flex flex-col items-center">
      <div v-if="searchData?.items.length" class="w-[95%] sm:w-5/6 xl:w-2/3 flex flex-col pt-10">
        <PerPageDropdown @change="handlePerPageChange" v-model="pagination.perPage" class="self-center xs:self-end" />
        <ul id="results" role="list" class="divide-y divide-gray-100">
          <template v-for="item in searchData.items" :key="item.id">
            <router-link v-if="item.owner" target="_blank" :to="{ name: 'repository', params: { owner: item.owner.login, repo: item.name } }">
              <RepoBasicItem :item="item" class="group hover:shadow-md" />
            </router-link>
          </template>
        </ul>
        <PrevNextPaginator @change="handlePageChange" class="w-full flex justify-center mt-2" :current-page="pagination.page" :has-next="pagesRemaining" />
      </div>
      <div v-else-if="noResults" class="w-2/3 text-center pt-10">
        <div><i>There are no results for your search.</i></div>
        <div @click="clearSearch" class="underline cursor-pointer mt-2 inline-block">Try another search</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { providerRepoSearch } from '@/api/providerSearch'
import type { SearchRepoResponseDataType } from '@/types/octokit'
import { determinePagesRemaining } from '@/utilities/octakit'
import { type Ref, ref } from 'vue'
import { focusElement, scrollTo } from '@/utilities'
import PerPageDropdown from '@/components/pagination/PerPageDropdown.vue'
import type { Pagination, PaginatorOption, PerPageOption } from '@/types/pagination'
import PrevNextPaginator from '@/components/pagination/PrevNextPaginator.vue'
import RepoBasicItem from '@/components/repository/RepoBasicItem.vue'
import SearchInput from '@/components/search/SearchInput.vue'
import OctocatMascot from '@/components/search/OctocatMascot.vue'

let searchData: Ref<SearchRepoResponseDataType | null> = ref(null)
let pagesRemaining = ref(true)
let searchValue = ref('')
let pagination: Ref<Pagination> = ref({
  perPage: 10,
  page: 1,
})
let noResults = ref(false)

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

function clearSearch() {
  searchValue.value = ''
  noResults.value = false
  focusElement('search')
}

function submitSearch() {
  pagination.value.page = 1
  loadInitialData()
}

async function loadInitialData() {
  noResults.value = false
  const res = await providerRepoSearch(searchValue.value, pagination.value.page, pagination.value.perPage)
  searchData.value = res.data
  pagesRemaining.value = determinePagesRemaining(res.headers.link)

  if (!searchData.value.items.length) {
    noResults.value = true
  }

  setTimeout(() => {
    scrollTo('#results')
  }, 0)
}
</script>

<style scoped lang="css"></style>
