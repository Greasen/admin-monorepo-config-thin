import { defineStore } from 'pinia'
import { store } from '../index'

interface socket {
  eventNames: string[]
}

export const socketState = defineStore({
  id: 'app-socket',
  state: (): socket => ({
    eventNames: [],
  }),

  actions: {
    /**
     * @Description 添加事件名称
     * @date 2022-03-26
     * @param {any} name:string
     * @returns {any}
     */
    addEventName(name: string): void {
      this.eventNames.push(name)
    },

    /**
     * @Description 删除事件名称
     * @date 2022-03-26
     * @param {any} name:string
     * @returns {any}
     */
    removeEventName(name: string): void {
      const index = this.eventNames.indexOf(name)
      this.eventNames.splice(index, 1)
    },
  },

})

export function useSocketWidthOut(): any {
  return socketState(store)
}
