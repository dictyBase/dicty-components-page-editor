import React from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import Menu from "@material-ui/core/Menu"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import ColorPicker from "../dropdowns/ColorPicker"
import useAnchorElement from "../../hooks/useAnchorElement"
import getCurrentMark from "../../utils/getCurrentMark"
import { attributes } from "../../constants/types"

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * FontColorButton displays a button with associated click logic for selecting
 * a font color.
 */
const FontColorButton = ({ icon }: Props) => {
  const editor = useSlate()
  const { anchorEl, handleClose, handleMouseDown } = useAnchorElement()

  const handleChange = (value: string) => {
    Editor.addMark(editor, attributes.fontColor, value)
  }
  const activeColor = getCurrentMark(editor, attributes.fontColor) as string

  return (
    <React.Fragment>
      <Tooltip title="font color">
        <IconButton
          size="small"
          aria-label="font color"
          aria-haspopup="true"
          onMouseDown={handleMouseDown}>
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        id="font-color-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        MenuListProps={{ disablePadding: true }}
        onClose={handleClose}>
        <div>
          <ColorPicker handleChange={handleChange} activeColor={activeColor} />
        </div>
      </Menu>
    </React.Fragment>
  )
}

export default FontColorButton
