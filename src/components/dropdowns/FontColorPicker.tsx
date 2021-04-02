import React from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import { HexColorPicker, HexColorInput } from "react-colorful"

// get the current font color for a given selection
const getCurrentMark = (editor: Editor) => {
  const marks = Editor.marks(editor)
  if (marks && marks.fontColor) {
    return marks.fontColor
  }
  return "#aabbcc"
}

const FontColorPicker = () => {
  const editor = useSlate()

  const handleChange = (value: string) => {
    Editor.addMark(editor, "fontColor", value)
  }

  return (
    <div>
      <HexColorPicker color={getCurrentMark(editor)} onChange={handleChange} />
      <HexColorInput color={getCurrentMark(editor)} onChange={handleChange} />
    </div>
  )
}

export default FontColorPicker
