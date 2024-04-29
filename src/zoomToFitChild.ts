export function zoomToFitChild(parent: HTMLElement, child: HTMLElement) {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  const widthRatio = window.innerWidth / childRect.width;
  const heightRatio = window.innerHeight / childRect.height;
  const scale = Math.min(widthRatio, heightRatio);

  const translateX = parentRect.left + Math.abs(parentRect.left - childRect.left) * scale;
  const translateY = (window.innerHeight - childRect.height * scale) / 2 - childRect.top

  parent.style.transformOrigin = '0 0';
  parent.style.transform = `translate(${-translateX}px, ${translateY}px) scale(${scale})`;
}
