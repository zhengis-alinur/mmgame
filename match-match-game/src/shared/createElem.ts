// function, which gets two params 1st - tag name, 2nd - class name, and returns HTML element.
export function createElem(tag: keyof HTMLElementTagNameMap, className: string) {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  return elem;
}
