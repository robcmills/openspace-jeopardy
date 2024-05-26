import { zoomToFitChild } from './zoomToFitChild'

export function zoomInCategories() {
  const parent = document.querySelector('#Board')
  const child = document.querySelector('.category.tile:first-of-type')
  if (parent instanceof HTMLElement && child instanceof HTMLElement) {
    zoomToFitChild(parent, child)
  }
}

export function zoomOutCategories() {
  const parent = document.querySelector('#Board')
  if (parent instanceof HTMLElement) {
    parent.style.transform = ''
  }
}
