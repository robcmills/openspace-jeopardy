export function getScaleTransform(element: HTMLElement): string {
  const elementRect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  const scaleX = windowWidth / elementRect.width;
  const scaleY = windowHeight / elementRect.height;
  const scale = Math.min(scaleX, scaleY);

  return `scale(${scale})`;
}
