export type GetScaleTransformArgs = {
  element: HTMLElement
  container: HTMLElement
  contain: boolean
}

export function getScaleTransform({
  element,
  container,
  contain,
}: GetScaleTransformArgs): string {
  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  const containerHeight = containerRect.height
  const containerWidth = containerRect.width

  const scaleX = containerWidth / elementRect.width;
  const scaleY = containerHeight / elementRect.height;
  const scale = Math.min(scaleX, scaleY);

  return contain
    ? `scale(${scale})`
    : `scale(${scaleX}, ${scaleY})`
}
