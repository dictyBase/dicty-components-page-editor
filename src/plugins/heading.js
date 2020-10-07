// @flow
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { ButtonProps, NodeProps } from "../flow/types"

/**
 * Functions to set the heading blocks.
 */
const headingStrategy = (editor, heading) => {
  const { value } = editor
  const isActive = hasBlock(value, heading)
  return editor.setBlocks(isActive ? "paragraph" : heading)
}

const hasBlock = (value, type) =>
  value.blocks.some((node) => node.type === type)

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const HeaderNode = ({ attributes, children, variant }: NodeProps) => (
  <Typography variant={variant} {...attributes}>
    {children}
  </Typography>
)

const useStyles = makeStyles((theme) => ({
  dropdown: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
}))

const HeadingList = ["H1", "H2", "H3", "H4", "H5", "H6"]

const HeadingDropdown = ({ editor }: ButtonProps) => {
  const [currentHeading, setCurrentHeading] = React.useState("")
  const classes = useStyles()

  const handleChange = ({ target: { value } }) => {
    setCurrentHeading(value)
    headingStrategy(editor, value.toLowerCase())
  }

  return (
    <FormControl className={classes.dropdown}>
      <Select value={currentHeading} onChange={handleChange} displayEmpty>
        <MenuItem value="" disabled>
          Heading
        </MenuItem>
        {HeadingList.map((heading, index) => (
          <MenuItem key={`h${index}`} value={heading}>
            {heading}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

/**
 * Export everything needed for the editor.
 */
export { HeaderNode, HeadingDropdown }
