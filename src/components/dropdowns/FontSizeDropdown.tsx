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
    minWidth: 100,
  },
}))

const FontSizeList = [
  "0.8rem",
  "0.9rem",
  "1rem",
  "1.1rem",
  "1.2rem",
  "1.3rem",
  "1.4rem",
  "1.5rem",
  "1.8rem",
  "2rem",
]

const FontSizeDropdown = () => {
  const editor = useSlate()
  const classes = useStyles()
  const mark = "fontSize"

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    Editor.addMark(editor, mark, event.target.value)
  }

  return (
    <FormControl className={classes.dropdown}>
      <Select
        value={getCurrentMark(editor, mark) || "1rem"}
        onChange={handleChange}>
        {FontSizeList.map((size) => (
          <MenuItem key={size} value={size} style={{ fontSize: size }}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FontSizeDropdown
