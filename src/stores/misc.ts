import { defineStore } from 'pinia'

interface MiscState {
  loading: boolean
}

export const useMiscStore = defineStore({
  id: 'misc',
  state: (): MiscState => {
    return {
      loading: false
    }
  }
})
