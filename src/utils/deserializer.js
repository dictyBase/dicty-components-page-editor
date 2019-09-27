import Html from "slate-html-serializer"

const BLOCK_TAGS = {
  p: "paragraph",
  ul: "unordered-list",
  ol: "ordered-list",
  li: "list-item",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  hr: "divider",
  table: "table",
  th: "table-cell",
  tr: "table-row",
  td: "table-cell",
  center: "center",
  div: "div",
}

const MARK_TAGS = {
  strong: "bold",
  b: "bold",
  em: "italic",
  i: "italic",
  u: "underline",
  s: "strikethrough",
  del: "strikethrough",
  sub: "subscript",
  sup: "superscript",
}

const rules = [
  {
    // Special case for images, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === "img") {
        return {
          object: "block",
          type: "image",
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute("src"),
          },
        }
      }
    },
  },
  {
    // Special case for lists, to get all descendants.
    deserialize(el, next) {
      const tag = el.tagName.toLowerCase()
      if (tag === "ol" || tag === "ul") {
        // We get all descendant <li> tags, so even if there is a deep nesting
        // of lists, we get all items and don't lose any.
        // Note that this does lose nesting, however.
        const itemsNodes = Array.from(el.querySelectorAll("li"))

        return {
          object: "block",
          type: tag === "ol" ? "ordered-list" : "unordered-list",
          nodes: next(itemsNodes),
        }
      }
    },
  },
  {
    // Special case for links, to grab their href.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === "a") {
        return {
          object: "mark",
          type: "link",
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute("href"),
          },
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (block) {
        return {
          object: "block",
          type: block,
          nodes: next(el.childNodes),
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()]
      if (mark) {
        return {
          object: "mark",
          type: mark,
          nodes: next(el.childNodes),
        }
      }
    },
  },
]

const deserializer = new Html({ rules: rules })

export default deserializer
