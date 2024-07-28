import { Octokit } from 'octokit'
import { type OctokitOptions } from '@octokit/core'
import { useMiscStore } from '@/stores/misc'

class InterceptedOctokit extends Octokit {
  constructor(params?: OctokitOptions) {
    super()

    this.hook.before('request', async (options) => {
      const miscStore = useMiscStore()
      miscStore.loading = true
    })

    this.hook.after('request', async (response, options) => {
      const miscStore = useMiscStore()
      setTimeout(() => {
        miscStore.loading = false
      }, 150)
    })

    this.hook.error('request', async (error, options) => {
      const miscStore = useMiscStore()
      miscStore.loading = false
      throw error
    })
  }
}

export const octokit = new InterceptedOctokit({ auth: `${import.meta.env.VITE_GITHUB_TOKEN}` })
