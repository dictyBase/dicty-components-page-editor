import React, { MouseEvent } from "react"
import Menu from "@material-ui/core/Menu"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import FontColorPicker from "../dropdowns/FontColorPicker"

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * FontColorButton displays a button with associated click logic for selecting
 * a font color.
 */
const FontColorButton = ({ icon }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      setAnchorEl(null)
    }
  }

  return (
    <React.Fragment>
      <Tooltip title="font color">
        <IconButton
          size="small"
          aria-label="font-color-button"
          aria-haspopup="true"
          onClick={handleClick}>
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
        <FontColorPicker />
      </Menu>
    </React.Fragment>
  )
}

export default FontColorButton
