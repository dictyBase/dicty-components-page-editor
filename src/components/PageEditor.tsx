import React, { useCallback, useMemo, useState } from "react"
import { createEditor, Descendant } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { withHistory } from "slate-history"
import Toolbar from "./Toolbar"
import Element from "./Element"
import Leaf from "./Leaf"
import withLinks from "../plugins/withLinks"
import withLists from "../plugins/withLists"
import withMedia from "../plugins/withMedia"
import withNormalize from "../plugins/withNormalize"
import onKeyDown from "../utils/onKeyDown"

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        fontFamily: "Roboto",
        fontSize: "inherit",
        fontColor: "rgba(0, 0, 0, 0.87)",
        text: "",
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
    () =>
      withHistory(
        withReact(
          withNormalize(withMedia(withLists(withLinks(createEditor())))),
        ),
      ),
    [],
  )
  // store the value of the editor
  const [value, setValue] = useState<Descendant[]>(initialValue)
  // render expected element based on type passed as props
  // memoize this function for subsequent renders
  const renderElement = useCallback((props) => <Element {...props} />, [])
  // render expected leaf based on type (i.e. bold, italic, etc)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    onKeyDown(event, editor)
  }
  console.log(value)
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
        placeholder="Enter some text..."
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

export default PageEditor
