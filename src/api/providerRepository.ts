import { octokit } from '@/network/octokit'
import type { GetRepoIssuesListResponseType, GetRepoResponseType } from '@/types/octokit'
import type { IssueState } from '@/types/repos'

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

export function providerRepoGetIssues(owner: string, repo: string, state: IssueState = 'all', page: number = 1, per_page: number = 10): Promise<GetRepoIssuesListResponseType> {
  return new Promise((resolve, reject) => {
    octokit
      .request(`https://api.github.com/repos/${owner}/${repo}/issues?state=${state}&page=${page}&per_page=${per_page}`)
      .then((res) => {
        resolve(res as GetRepoIssuesListResponseType)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

const queryIssues = (owner: string, repo: string, state: 'OPEN' | 'CLOSED'): string => {
  // Gave this a try but got a 'API rate limit exceeded' every time
  return `query { 
  repository(owner:"${owner}", name:"${repo}") { 
    issues(states:${state}) {
      totalCount
    }
  }
}`
}

export function providerIssueCount(owner: string, repo: string, state: 'OPEN' | 'CLOSED'): Promise<number> {
  return new Promise((resolve, reject) => {
    octokit
      .graphql(queryIssues(owner, repo, state))
      .then((res) => {
        resolve(res as number)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
