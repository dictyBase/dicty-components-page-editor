import React from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles((theme: Theme) => ({
  dropdown: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}))

const FontFamilyList = [
  "Lato",
  "Merriweather",
  "Montserrat",
  "Roboto",
  "Roboto Condensed",
  "Roboto Mono",
  "Roboto Slab",
]

// get the current font family for a given selection
const getCurrentMark = (editor: Editor) => {
  const marks = Editor.marks(editor)
  if (marks && marks.fontFamily) {
    return marks.fontFamily
  }
  return "Roboto"
}

const FontFamilyDropdown = () => {
  const editor = useSlate()
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    Editor.addMark(editor, "fontFamily", event.target.value)
  }

  return (
    <FormControl className={classes.dropdown}>
      <Select value={getCurrentMark(editor)} onChange={handleChange}>
        {FontFamilyList.map((font) => (
          <MenuItem key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FontFamilyDropdown
