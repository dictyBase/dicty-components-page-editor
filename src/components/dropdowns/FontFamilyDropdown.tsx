import React from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import getCurrentMark from "../../utils/getCurrentMark"

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

const FontFamilyDropdown = () => {
  const editor = useSlate()
  const classes = useStyles()
  const mark = "fontFamily"

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    Editor.addMark(editor, mark, event.target.value)
  }

  return (
    <FormControl className={classes.dropdown}>
      <Select
        value={getCurrentMark(editor, mark) || "Roboto"}
        onChange={handleChange}>
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
