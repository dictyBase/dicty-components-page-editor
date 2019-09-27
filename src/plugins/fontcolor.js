// @flow
import React from "react"
import SketchPicker from "react-color/lib/Sketch"
import Tooltip from "@material-ui/core/Tooltip"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

type colorProps = {
  showColorPicker: boolean,
  setShowColorPicker: Function,
}

/**
 * Functions to set the font color marks.
 */
const hasMark = value => value.marks.some(mark => mark.type === "font-color")
const getMark = value =>
  value.marks.filter(mark => mark.type === "font-color").first()

const createMark = color => ({
  type: "font-color",
  data: { color },
})

const reapplyMark = ({ editor, color }) =>
  editor.removeMark(getMark(editor.value)).addMark(createMark(color))

const applyMark = ({ editor, color }) => editor.addMark(createMark(color))

const fontColorMarkStrategy = (editor, color) => {
  const { value } = editor

  if (hasMark(value)) {
    if (value.selection.isExpanded) {
      return reapplyMark({ editor: editor, color })
    }
  } else {
    if (value.selection.isExpanded) {
      return applyMark({ editor: editor, color })
    }
  }
  return editor
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const FontColorMark = ({ children, mark: { data } }: NodeProps) => (
  <span style={{ color: data.get("color") }}>{children}</span>
)

/**
 * Button component that uses a click handler to connect to the ColorPicker component.
 */
const FontColorButton = ({
  showColorPicker,
  setShowColorPicker,
}: colorProps) => (
  <Tooltip title="Font Color" placement="bottom">
    <ToolbarButton
      onClick={() => {
        setShowColorPicker(!showColorPicker)
      }}>
      <FormatColorTextIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * The font color picker widget-style component
 */
const FontColorPicker = ({ editor }: ButtonProps) => {
  let color = "#000"
  const value = editor.value
  if (hasMark(value)) {
    color = getMark(value).data.get("color")
  }
  return (
    <SketchPicker
      disableAlpha
      color={color}
      onChangeComplete={(color, e) => {
        fontColorMarkStrategy(editor, color.hex)
      }}
    />
  )
}

export { FontColorMark, FontColorButton, FontColorPicker }
