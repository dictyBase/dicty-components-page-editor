import React from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import getCurrentMark from "../../utils/getCurrentMark"

type StyleProps = {
  /** Minimum width of dropdown */
  minWidth: string
}

const useStyles = makeStyles((theme: Theme) => ({
  dropdown: (props: StyleProps) => ({
    margin: theme.spacing(1),
    minWidth: props.minWidth,
  }),
}))

type Props = {
  /** List of values to display in dropdown */
  values: string[]
  /** Default value of dropdown */
  defaultValue: string
  /** Mark to add to Slate data */
  mark: string
  /** Minimum width of dropdown */
  minWidth?: string
}

const Dropdown = ({
  values,
  defaultValue,
  mark,
  minWidth = "150px",
}: Props) => {
  const editor = useSlate()
  const props = { minWidth }
  const classes = useStyles(props)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    Editor.addMark(editor, mark, event.target.value)
  }

  return (
    <FormControl className={classes.dropdown}>
      <Select
        value={getCurrentMark(editor, mark) || defaultValue}
        onChange={handleChange}>
        {values.map((val) => (
          <MenuItem key={val} value={val} style={{ [mark]: val }}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Dropdown
