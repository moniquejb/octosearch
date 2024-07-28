import { type GetResponseTypeFromEndpointMethod, type GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { octokit } from '@/network/octokit'

// Search
export type SearchRepoResponseType = GetResponseTypeFromEndpointMethod<typeof octokit.rest.search.repos>
export type SearchRepoResponseDataType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.search.repos>
export type SearchRepoResponseResultItem = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.search.repos>['items'][number]

// Repos
export type GetRepoResponseType = GetResponseTypeFromEndpointMethod<typeof octokit.rest.repos.get>
export type GetRepoResponseDataType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.get>

// Repo Issues
export type GetRepoIssuesListResponseType = GetResponseTypeFromEndpointMethod<typeof octokit.rest.issues.list>
export type GetRepoIssuesListResponseDataType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.list>
export type GetRepoIssuesListResultItem = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.list>[number]
