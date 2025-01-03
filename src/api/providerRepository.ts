import { octokit } from '@/network/octokit'
import type { GetRepoIssuesListResponseType, GetRepoResponseType, IssueResult } from '@/types/octokit'
import type { IssueState } from '@/types/repos'

export function providerRepoGet(owner: string, repo: string): Promise<GetRepoResponseType> {
  // Fetch individual repo
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
  // Fetch issues for individual repo
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

// GraphQL query to fetch total count of issues in a specific state
const queryIssues = `query issueCount($owner: String!, $repo: String!, $states: [IssueState!]!) {
  repository(owner: $owner, name: $repo) {
    issues(states: $states) {
      totalCount
    }
  }
}`

export function providerIssueCount(owner: string, repo: string, states: 'OPEN' | 'CLOSED'): Promise<number | null> {
  // Fetch issue count of specific issue state for individual repo via graphQl
  return new Promise((resolve, reject) => {
    octokit
      .graphql(queryIssues, { owner, repo, states })
      .then((res) => {
        const total = (res as IssueResult).repository?.issues?.totalCount || null
        resolve(total)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
