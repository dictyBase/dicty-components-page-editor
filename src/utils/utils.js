import { getEventTransfer } from "slate-react"
import isUrl from "is-url"
import deserializer from "./deserializer"
import { insertImage } from "../plugins/image"
import { insertVideo } from "../plugins/video"
import { insertLink } from "../plugins/link"

/**
 * Helper function that checks if a given item is a function.
 */
const isFunction = (v) => {
  if (v instanceof Function) {
    return true
  }
  return false
}

/**
 * Helper function that checks if the meta or ctrl key is pressed.
 * metaKey = ⌘ for Mac, ⊞ for Windows
 */
const isMod = (event) => (event.metaKey && !event.ctrlKey) || event.ctrlKey

/**
 * fixHTML receives pasted HTML and wraps inlines with blocks. This is
 * necessary due to the way Slate handles mixed inline and block level
 * content. If we didn't parse the pasted HTML, all of the mixed
 * content would be stripped (i.e. lists would completely disappear).
 * https://github.com/ianstormtaylor/slate/issues/1497
 */
const fixHTML = (html) => {
  const dom = document.createElement("div")
  html = html.replace(/\s+/g, " ").replace(/> </g, "><") // removes white space

  while (html.match(/<(h[1-6]|p|strong|div|u|em|a|b|i) ?[^>]*>\s?<\/\1>/g)) {
    html = html.replace(
      /<(h[1-6]|p|strong|div|u|em|a|b|i) ?[^>]*>\s?<\/\1>/g,
      "",
    ) //removes empty tags recursively
  }
  dom.innerHTML = html
  return dom.innerHTML
    .replace(/\s+/g, " ") // replace whitespace
    .replace(/> </g, "><") // remove space between tags
}

/**
 * Function to handle any pasted HTML
 */
const onPasteHtml = (event, editor, next) => {
  if (event.shiftKey) return

  const transfer = getEventTransfer(event)
  const { html, rich, text } = transfer
  if (rich) {
    return editor.insertText(text)
  }
  const fixedHTML = fixHTML(html)
  const { document } = deserializer.deserialize(fixedHTML)
  editor.insertFragment(document)
  return true
}

/**
 * Function to handle any pasted text
 */
const onPasteText = (event, editor, next) => {
  const transfer = getEventTransfer(event)
  const { text } = transfer

  // if text isn't a URL, then no need for special use case
  if (!isUrl(text)) return next()

  if (
    text.slice(-3) === "png" ||
    text.slice(-3) === "jpg" ||
    text.slice(-3) === "gif"
  ) {
    const data = {
      src: text,
    }
    return editor.command(insertImage, data)
  }

  if (text.match(/youtube\.com|vimeo\.com/)) {
    const data = {
      url: text,
      height: "100%",
      width: "100%",
    }
    return editor.command(insertVideo, data)
  }

  return editor.command(insertLink, text)
}

/**
 * Export our helpers
 */
export { isFunction, isMod, onPasteHtml, onPasteText }
