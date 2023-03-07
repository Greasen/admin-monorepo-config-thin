import { defineStore } from 'pinia'
import { store } from '../index'

export const userStore = defineStore({
  id: 'app-layout',
  state: () => {
    return {
      type: 0,
    }
  },

  actions: {
    setType(type: number) {
      this.type = type
    },
  },
})

export function useLayoutWithOut() {
  return userStore(store)
}
