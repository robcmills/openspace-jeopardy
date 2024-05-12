export function getCenterTransform(element: HTMLElement): string {
  const elementRect = element.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const elementWidth = elementRect.width;
  const elementHeight = elementRect.height;

  const centerX = (windowWidth - elementWidth) / 2;
  const centerY = (windowHeight - elementHeight) / 2;

  const translateX = centerX - elementRect.left;
  const translateY = centerY - elementRect.top;

  return `translate(${translateX}px, ${translateY}px)`;
}
