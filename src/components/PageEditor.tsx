import React, { useCallback, useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import Toolbar from "./Toolbar"
import Element from "./Element"
import Leaf from "./Leaf"
import withAlignment from "./plugins/withAlignment"

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
]

/**
 * PageEditor is the main editor component.
 */
const PageEditor = () => {
  // create a slate editor object that won't change across renders
  const editor = useMemo(() => withReact(withAlignment(createEditor())), [])
  // store the value of the editor
  const [value, setValue] = useState<Node[]>(initialValue)
  // render expected element based on type passed as props
  // memoize this function for subsequent renders
  const renderElement = useCallback((props) => <Element {...props} />, [])
  // render expected leaf based on type (i.e. bold, italic, etc)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar />
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  )
}

export default PageEditor
