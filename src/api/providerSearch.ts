import { octokit } from '@/network/octokit'
import type { SearchRepoResponseType } from '@/types/octokit'

export function providerRepoSearch(
  q: string,
  page: number = 1,
  per_page: number = 10
): Promise<SearchRepoResponseType> {
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

// https://api.github.com/search/repositories?q=bootstrap
// const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
// let pagesRemaining = true;