import { Editor, Transforms, Range, Node } from "slate"
import { types } from "../constants/types"
import { Link } from "../types/link"
import { Image } from "../types/image"

// look for a match of the link type
const linkNodeOptions = {
  match: (n: Node) => n.type === types.link,
}

const LinkHelpers = {
  isLinkActive(editor: Editor) {
    const nodeGenerator = Editor.nodes(editor, linkNodeOptions)
    const node = nodeGenerator.next()
    while (!node.done) {
      return true
    }
    return false
  },
  /**
   * upsertLink updates or adds a new link. If there is no selection,
   * it adds a new link with the provided text. Otherwise it will wrap the
   * selection with a link node using the user's link and text.
   */
  upsertLink(editor: Editor, link: Link) {
    const { url, text } = link
    // check if there is an existing link first then unwrap it
    if (LinkHelpers.isLinkActive(editor)) {
      Transforms.unwrapNodes(editor, linkNodeOptions)
    }
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
  },
}

const CustomEditor = {
  ...Editor,
  ...LinkHelpers,
  insertImage(editor: Editor, image: Image) {
    const { url, description, width, height, linkURL } = image
    const imageData = {
      type: types.image,
      url,
      description,
      width,
      height,
      linkURL,
      children: [{ text: "" }],
    }
    Transforms.insertNodes(editor, imageData)
  },
}

export default CustomEditor
