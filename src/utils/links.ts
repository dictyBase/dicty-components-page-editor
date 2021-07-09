import { Editor, Element as SlateElement, Transforms, Range, Node } from "slate"
import { Link } from "../types/link"
import { types } from "../constants/types"

// look for a match of the link type
const linkNodeOptions = {
  match: (n: Node) =>
    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === types.link,
}

const isLinkActive = (editor: Editor) => {
  const [match] = Array.from(Editor.nodes(editor, linkNodeOptions))
  return !!match
}

/**
 * upsertLink updates or adds a new link. If there is no selection,
 * it adds a new link with the provided text. Otherwise it will wrap the
 * selection with a link node using the user's link and text.
 */
const upsertLink = (editor: Editor, link: Link) => {
  const { url, text } = link
  // check if there is an existing link first then unwrap it
  if (isLinkActive(editor)) {
    Transforms.unwrapNodes(editor, linkNodeOptions)
  }
  console.log(link)
  const linkData = {
    type: types.link,
    url,
    children: [{ text: text }],
  }
  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  if (isCollapsed) {
    Transforms.insertNodes(editor, linkData)
  } else {
    Transforms.wrapNodes(editor, linkData, { split: true })
    Editor.insertText(editor, text)
    Transforms.collapse(editor, { edge: "end" })
  }
}

// getLinkSelection gets the current text and URL for the user's current selection.
const getLinkSelection = (editor: Editor) => {
  const { selection } = editor
  let prevURL,
    selectedText = ""
  // if there is a current selection then pull the text and URL from it
  // and update state accordingly
  if (selection && !Range.isCollapsed(selection)) {
    selectedText = Editor.string(editor, selection)
    const [linkNode] = Array.from(Editor.nodes(editor, linkNodeOptions))
    if (linkNode && SlateElement.isElement(linkNode[0])) {
      prevURL = linkNode[0].url as string
    }
  }
  return {
    url: prevURL || "",
    text: selectedText,
  }
}

export { linkNodeOptions, isLinkActive, upsertLink, getLinkSelection }
