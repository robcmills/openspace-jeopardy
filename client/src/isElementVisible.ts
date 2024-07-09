export function isElementVisible(
  element: HTMLElement,
  parent: HTMLElement = document.documentElement
): boolean {
  const elementRect = element.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()
  return (
    elementRect.top >= parentRect.top &&
    elementRect.left >= parentRect.left &&
    elementRect.bottom <= parentRect.bottom &&
    elementRect.right <= parentRect.right
  )
}
