export const classNameToArray = (cls = '') => cls.split(' ').filter(item => !!item.trim())

export const addClass = (el: HTMLElement | undefined, cls: string | undefined) => {
  if (!el || !cls.trim())
    return
  el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: HTMLElement | undefined, cls: string | undefined) => {
  if (!el || !cls.trim())
    return
  el.classList.remove(...classNameToArray(cls))
}

