import React, { useCallback, useMemo, useState } from "react"
import { createEditor, Descendant } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { withHistory } from "slate-history"
import Toolbar from "./Toolbar"
import Element from "./Element"
import Leaf from "./Leaf"
import ActionButtons from "./ActionButtons"
import withHTML from "../plugins/withHTML"
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

type Props = {
  /** Page content taken from JSON */
  pageContent?: string
  /** Whether the editor is in read-only mode or not */
  readOnly: boolean
  /** Function called when user clicks save button */
  handleSave: () => void
  /** Function called when user clicks cancel button */
  handleCancel: () => void
}

/**
 * PageEditor is the main editor component.
 */
const PageEditor = ({
  pageContent,
  readOnly,
  handleSave,
  handleCancel,
}: Props) => {
  // create a slate editor object that won't change across renders
  const editor = useMemo(
    () =>
      withHTML(
        withHistory(
          withReact(
            withNormalize(withMedia(withLists(withLinks(createEditor())))),
          ),
        ),
      ),
    [],
  )
  let defaultValue = initialValue
  if (pageContent) {
    defaultValue = JSON.parse(pageContent)
  }

  // store the value of the editor
  const [value, setValue] = useState<Descendant[]>(defaultValue)
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
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
        placeholder="Enter some text..."
        spellCheck
        autoFocus
      />
      <ActionButtons handleSave={handleSave} handleCancel={handleCancel} />
    </Slate>
  )
}

export default PageEditor
