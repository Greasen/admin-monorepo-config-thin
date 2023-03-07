/* eslint-disable no-void */
export const on = (element: HTMLElement | null, event: string, handler: (ev: KeyboardEvent) => void, useCapture = false) => {
  if (element && event && handler)
    element == null ? void 0 : element.addEventListener(event, handler, useCapture)
}
export const off = (element: HTMLElement | null, event: string, handler: (ev: KeyboardEvent) => void, useCapture = false) => {
  if (element && event && handler)
    element == null ? void 0 : element.removeEventListener(event, handler, useCapture)
}
