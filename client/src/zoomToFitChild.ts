export function zoomToFitChild(parent: HTMLElement, child: HTMLElement) {
  const childRect = child.getBoundingClientRect();

  const widthRatio = window.innerWidth / childRect.width;
  const heightRatio = window.innerHeight / childRect.height;
  const scale = Math.min(widthRatio, heightRatio);

  const isLandscape = window.innerWidth > window.innerHeight
  const translateX = isLandscape
    ? (window.innerWidth - childRect.width * scale) / 2 - childRect.left
    : -childRect.left
  const translateY = (window.innerHeight - childRect.height * scale) / 2 - childRect.top

  parent.style.transformOrigin = '0 0';
  parent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}
