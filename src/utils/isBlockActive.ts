import { Editor, Element as SlateElement } from "slate"
import { ReactEditor } from "slate-react"

/**
 * isBlockActive determines if the current text selection contains an active block
 */
const isBlockActive = (
  editor: ReactEditor,
  property: string,
  value: string,
) => {
  // Editor.nodes returns a generator that iterates through all of the editor's
  // nodes. We are looking for matches for the selected format.
  // https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/interfaces/node.ts#L467
  const nodeGenerator = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n[property] === value,
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
}

export default isBlockActive
