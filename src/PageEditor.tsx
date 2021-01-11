import React, { useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"

const PageEditor = () => {
  // Create a Slate editor object that won't change across renders
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}>
      <Editable />
    </Slate>
  )
}

export default PageEditor
