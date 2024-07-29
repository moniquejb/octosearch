import { octokit } from '@/network/octokit'
import type { SearchRepoResponseType } from '@/types/octokit'

export function providerRepoSearch(q: string, page: number = 1, per_page: number = 10): Promise<SearchRepoResponseType> {
  // Fetch repos based on search query
  return new Promise((resolve, reject) => {
    octokit.rest.search
      .repos({ q, page, per_page })
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
