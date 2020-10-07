// @flow
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import NativeSelect from "@material-ui/core/NativeSelect"
import { NodeProps, ButtonProps } from "../flow/types"

/**
 * List of font sizes
 */
const FontSizeList = [
  { size: "12px" },
  { size: "14px" },
  { size: "16px" },
  { size: "18px" },
  { size: "20px" },
  { size: "22px" },
  { size: "26px" },
  { size: "30px" },
]

/**
 * Functions to set the font size blocks.
 */
const hasMark = (value) => value.marks.some((mark) => mark.type === "font-size")
const getMark = (value) =>
  value.marks.filter((mark) => mark.type === "font-size").first()

const createMark = (fontSizeIndex) => ({
  type: "font-size",
  data: { fontSizeIndex },
})

const reapplyMark = ({ editor, fontSizeIndex }) =>
  editor.removeMark(getMark(editor.value)).addMark(createMark(fontSizeIndex))

const applyMark = ({ editor, fontSizeIndex }) =>
  editor.addMark(createMark(fontSizeIndex))

const fontSizeMarkStrategy = (editor, fontSizeIndex) => {
  const { value } = editor

  if (hasMark(value)) {
    if (value.selection.isExpanded) {
      return reapplyMark({ editor: editor, fontSizeIndex })
    }
  } else {
    if (value.selection.isExpanded) {
      return applyMark({ editor: editor, fontSizeIndex })
    }
  }

  return editor
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const FontSizeMark = ({ children, mark: { data } }: NodeProps) => (
  <span
    style={{
      fontSize: FontSizeList[data.get("fontSizeIndex")].size,
    }}>
    {children}
  </span>
)

const useStyles = makeStyles((theme) => ({
  fontSizeDropdown: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}))

/**
 * Button components that use click handlers to connect to the editor.
 */
const FontSizeDropdown = ({ editor }: ButtonProps) => {
  const [currentFontSize, setCurrentFontSize] = useState(2)
  const classes = useStyles()

  const handleChange = ({ target: { value: fontSizeIndex } }) => {
    setCurrentFontSize(fontSizeIndex)
    fontSizeMarkStrategy(editor, fontSizeIndex)
  }

  return (
    <FormControl className={classes.fontSizeDropdown}>
      <NativeSelect value={currentFontSize} onChange={handleChange}>
        {FontSizeList.map((font, index) => (
          <MenuItem
            key={`font-size-${index}`}
            value={index}
            style={{ fontSize: font.size }}>
            {font.size}
          </MenuItem>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

/**
 * Export everything needed for the editor.
 */
export { FontSizeMark, FontSizeDropdown }
