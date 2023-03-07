import type { Ref } from "vue"
import { useCommonWithOut } from "~/store/modules/common"

/**
 * @Description 弹窗的dom
 * @date 2022-11-14
 * @param {any} visibleClass:Ref<string>
 * @returns {any}
 */
export function useCrossDom(visibleClass: Ref<string>, type = '') {
  const store = useCommonWithOut()
  const modalDom = document.querySelector(`.${visibleClass.value}`) as Element as any
  modalDom.uuid = visibleClass.value
  store.setCrossDom(modalDom, type)
}


/**
 * @Description 菜单、下拉裁切的dom
 * @date 2022-11-15
 * @returns {any}
 */
export function useCutDom(className: string, popperName?: string) {
  const store = useCommonWithOut()
  function handler() {
    // el-popper 下类名有重复，并不是唯一值，导致关闭的时候dom不能全部清除
    if (popperName) {
      store.cutDomList = Array.from(document.querySelectorAll(popperName)).filter(item => item.className.includes(className)).filter((el: any) => el.style.display !== 'none')
      return
    }

    store.cutDomList = Array.from(
      document.querySelectorAll(className)
    ).filter((el: any) => el.style.display !== 'none')

  }

  setTimeout(() => {
    handler()

    // setTimeout(() => {
    //   handler()
    // }, 300)
  }, 500)
}