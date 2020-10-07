// @flow
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { NodeProps, ButtonProps } from "../flow/types"
import "typeface-roboto"
import "typeface-roboto-condensed"
import "typeface-roboto-mono"
import "typeface-roboto-slab"
import "typeface-lato"
import "typeface-merriweather"
import "typeface-montserrat"

/**
 * List of fonts available
 */
const FontFamilyList = [
  { name: "Lato", options: "400,700" },
  { name: "Merriweather", options: "400,700" },
  { name: "Montserrat", options: "400,700" },
  { name: "Roboto", options: "400,400i,700,700i" },
  { name: "Roboto Condensed", options: "400,400i,700,700i" },
  { name: "Roboto Mono", options: "400,400i,700,700i" },
  { name: "Roboto Slab", options: "400,700" },
]

/**
 * Functions to set the font family marks.
 */
const hasMark = (value) =>
  value.marks.some((mark) => mark.type === "font-family")
const getMark = (value) =>
  value.marks.filter((mark) => mark.type === "font-family").first()

const createMark = (fontFamilyIndex) => ({
  type: "font-family",
  data: { fontFamilyIndex },
})

const reapplyMark = ({ editor, fontFamilyIndex }) =>
  editor.removeMark(getMark(editor.value)).addMark(createMark(fontFamilyIndex))

const applyMark = ({ editor, fontFamilyIndex }) =>
  editor.addMark(createMark(fontFamilyIndex))

const fontFamilyMarkStrategy = (editor, fontFamilyIndex) => {
  const { value } = editor

  if (hasMark(value)) {
    if (value.selection.isExpanded) {
      return reapplyMark({ editor: editor, fontFamilyIndex })
    }
  } else {
    if (value.selection.isExpanded) {
      return applyMark({ editor: editor, fontFamilyIndex })
    }
  }

  return editor
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const FontFamilyMark = ({ children, mark: { data } }: NodeProps) => (
  <span
    style={{ fontFamily: FontFamilyList[data.get("fontFamilyIndex")].name }}>
    {children}
  </span>
)

const useStyles = makeStyles((theme) => ({
  fontFamilyDropdown: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}))

/**
 * Dropdown component that connects to the editor.
 */
const FontFamilyDropdown = ({ editor }: ButtonProps) => {
  const [currentFont, setCurrentFont] = useState(3)
  const classes = useStyles()

  const handleChange = ({ target: { value: fontFamilyIndex } }) => {
    setCurrentFont(fontFamilyIndex)
    fontFamilyMarkStrategy(editor, fontFamilyIndex)
  }

  return (
    <FormControl className={classes.fontFamilyDropdown}>
      <Select value={currentFont} onChange={handleChange}>
        {FontFamilyList.map((font, index) => (
          <MenuItem
            key={`font-family-${index}`}
            value={index}
            style={{ fontFamily: font.name }}>
            {font.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

/**
 * Export everything needed for the editor.
 */
export { FontFamilyMark, FontFamilyDropdown }
