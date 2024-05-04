export function getFullScreenScaleTransform(element: HTMLElement): string {
  const elementRect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  const scaleX = windowWidth / elementRect.width;
  const scaleY = windowHeight / elementRect.height;

  return `scale(${scaleX}, ${scaleY})`;
}
