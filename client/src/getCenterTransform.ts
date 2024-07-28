export function getCenterTransform(
  element: HTMLElement,
  container: HTMLElement,
): string {
  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  const containerWidth = containerRect.width
  const containerHeight = containerRect.height

  const elementWidth = elementRect.width
  const elementHeight = elementRect.height

  const centerX = (containerWidth - elementWidth) / 2
  const centerY = (containerHeight - elementHeight) / 2

  const translateX = centerX - elementRect.left
  const translateY = centerY - elementRect.top

  return `translate(${translateX}px, ${translateY}px)`
}
