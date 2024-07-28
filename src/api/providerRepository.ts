import { octokit } from '@/network/octokit'
import type { GetRepoResponseType } from '@/types/octokit'

export function providerRepoGet(owner: string, repo: string): Promise<GetRepoResponseType> {
  return new Promise((resolve, reject) => {
    octokit.rest.repos
      .get({ owner, repo })
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
