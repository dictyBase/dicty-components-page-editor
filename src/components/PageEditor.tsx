import React, { useCallback, useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { withHistory } from "slate-history"
import Toolbar from "./Toolbar"
import Element from "./Element"
import Leaf from "./Leaf"
import withLinks from "../plugins/withLinks"

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        fontFamily: "Roboto",
        fontColor: "rgba(0, 0, 0, 0.87)",
        text: "A line of text in a paragraph.",
      },
    ],
  },
]

/**
 * PageEditor is the main editor component.
 */
const PageEditor = () => {
  // create a slate editor object that won't change across renders
  const editor = useMemo(
    () => withReact(withHistory(withLinks(createEditor()))),
    [],
  )
  // store the value of the editor
  const [value, setValue] = useState<Node[]>(initialValue)
  // render expected element based on type passed as props
  // memoize this function for subsequent renders
  const renderElement = useCallback((props) => <Element {...props} />, [])
  // render expected leaf based on type (i.e. bold, italic, etc)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  console.log(value)
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some text..."
      />
    </Slate>
  )
}

export default PageEditor
