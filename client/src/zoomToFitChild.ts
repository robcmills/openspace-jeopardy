export function zoomToFitChild(parent: HTMLElement, child: HTMLElement) {
  const childRect = child.getBoundingClientRect()
  if (!parent.parentElement) throw new Error('Parent has no parentElement')
  const parentRect = parent.parentElement.getBoundingClientRect()

  const widthRatio = parentRect.width / childRect.width
  const heightRatio = parentRect.height / childRect.height
  const scale = Math.min(widthRatio, heightRatio)

  const isLandscape = parentRect.width > parentRect.height
  const translateX = isLandscape
    ? (parentRect.width - childRect.width * scale) / 2 - childRect.left
    : -childRect.left
  const translateY =
    (parentRect.height - childRect.height * scale) / 2 - childRect.top

  parent.style.transformOrigin = '0 0'
  parent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
}
