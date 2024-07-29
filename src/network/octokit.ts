import { Octokit } from 'octokit'
import { type OctokitOptions } from '@octokit/core'
import { useMiscStore } from '@/stores/misc'
import { useNotification } from '@kyvg/vue3-notification'

class InterceptedOctokit extends Octokit {
  // Intercept api requests to handle loader visibility and error messages

  constructor(options: OctokitOptions) {
    super(options)
    this.interceptRequests()
  }

  private interceptRequests() {
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
      const { notify } = useNotification()

      miscStore.loading = false
      notify({
        title: error.name || 'Error',
        text: error.message || 'An error occurred.',
        type: 'error',
        duration: -1,
      })
    })
  }
}

export const octokit = new InterceptedOctokit({
  auth: `${import.meta.env.VITE_GITHUB_TOKEN}`,
})
