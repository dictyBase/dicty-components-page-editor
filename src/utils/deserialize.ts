import { jsx } from "slate-hyperscript"
import { types } from "../constants/types"
import { DeserializeElement, DeserializeLeafValue } from "../types/deserialize"

const elementTags = {
  A: (el: HTMLElement) => ({ type: types.link, url: el.getAttribute("href") }),
  H1: () => ({ type: types.h1 }),
  H2: () => ({ type: types.h2 }),
  H3: () => ({ type: types.h3 }),
  IMG: (el: HTMLElement) => ({
    type: types.image,
    url: el.getAttribute("src"),
  }),
  LI: () => ({ type: types.listItem }),
  OL: () => ({ type: types.orderedList }),
  UL: () => ({ type: types.unorderedList }),
  P: () => ({ type: types.paragraph }),
  HR: () => ({ type: types.divider }),
} as DeserializeElement

const leafTags = {
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  B: () => ({ bold: true }),
  U: () => ({ underline: true }),
  SUB: () => ({ subscript: true }),
  SUP: () => ({ superscript: true }),
} as DeserializeLeafValue

const deserialize = (el: any) => {
  // text
  if (el.nodeType === 3) {
    return el.textContent
  }
  // not a tag
  if (el.nodeType !== 1) {
    return null
  }
  // new line
  if (el.nodeName === "BR") {
    return "\n"
  }

  const { nodeName } = el
  let parent = el

  const children: any[] = Array.from(parent.childNodes).map(deserialize).flat()

  // body
  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children)
  }

  if (elementTags[nodeName]) {
    const attrs = elementTags[nodeName](el)
    return jsx("element", attrs, children)
  }

  if (leafTags[nodeName]) {
    const attrs = leafTags[nodeName](el)
    return children
      .filter((child) => typeof child === "string")
      .map((child) => jsx("text", attrs, child))
  }

  return children
}

export default deserialize
