import { Editor, Transforms, Range, Node, Element as SlateElement } from "slate"
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

const ImageHelpers = {
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

const BlockHelpers = {
  /**
   * isBlockActive determines if the current text selection contains an active block
   */
  isBlockActive(editor: Editor, property: string, value: string) {
    // Editor.nodes returns a generator that iterates through all of the editor's
    // nodes. We are looking for matches for the selected format.
    // https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/interfaces/node.ts#L467
    const nodeGenerator = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[property] === value,
    })
    // run the generator to find the nearest match
    const node = nodeGenerator.next()
    // if it finds a match then return true to indicate the block is currently
    // active
    while (!node.done) {
      return true
    }
    // if it doesn't find a match, then the generator has yielded its last value
    // meaning that it did not find a match for this block type
    return false
  },
  /**
   * toggleBlock will set the appropriate nodes for the given selection
   */
  toggleBlock(editor: Editor, format: string) {
    // first find if the selected block is currently active
    const isActive = CustomEditor.isBlockActive(editor, "type", format)

    // setNodes is used to set properties at the currently selected element.
    // If the block is active, then we want to toggle it back to the default
    // paragraph type. If the block is not active, we toggle the type to match it.
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : format,
    })
  },
  /**
   * toggleList toggles the given selection as a list type.
   */
  toggleList(editor: Editor, format: string) {
    const lists = [types.orderedList, types.unorderedList]
    // first find if the selected block is currently active
    const isActive = CustomEditor.isBlockActive(editor, "type", format)
    const isList = lists.includes(format)

    Transforms.unwrapNodes(editor, {
      match: (n) => lists.includes(n.type as string),
      split: true,
    })

    let type = format
    if (isList) {
      type = types.listItem
    }
    if (isActive) {
      type = types.paragraph
    }

    Transforms.setNodes(editor, {
      type: type,
    })

    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  },
}

const CustomEditor = {
  ...Editor,
  ...BlockHelpers,
  ...LinkHelpers,
  ...ImageHelpers,
}

export default CustomEditor
