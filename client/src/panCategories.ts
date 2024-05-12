export function panCategories() {
  const [child1, child2] = document.querySelectorAll('.category.tile')
  if (!(child1 instanceof HTMLElement) || !(child2 instanceof HTMLElement)) return
  console.log({ child1, child2 })
  const child1Rect = child1.getBoundingClientRect();
  const child2Rect = child2.getBoundingClientRect();
  const delta = child1Rect.left - child2Rect.left
  const parent = document.querySelector('.board')
  if (!(parent instanceof HTMLElement)) return

  const regex = /translate\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)\s*scale\((\d+\.?\d*)\)/;
  const match = parent.style.transform.match(regex);

  if (!match) {
    console.log('No match found.');
    return
  }
  const [_, translateX, translateY, scale] = match;
  console.log('Translate X:', parseFloat(translateX));
  console.log('Translate Y:', parseFloat(translateY));
  console.log('Scale:', parseFloat(scale));
  parent.style.transform = `translate(${parseFloat(translateX) + delta}px, ${translateY}px) scale(${scale})`;
}
