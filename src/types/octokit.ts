import { type GetResponseTypeFromEndpointMethod, type GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { octokit } from '@/network/octokit'

export type SearchRepoResponseType = GetResponseTypeFromEndpointMethod<typeof octokit.rest.search.repos>
export type SearchRepoResponseDataType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.search.repos>
export type SearchRepoResponseResultItem = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.search.repos>['items'][number]

export type GetRepoResponseType = GetResponseTypeFromEndpointMethod<typeof octokit.rest.repos.get>
export type GetRepoResponseDataType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.get>
