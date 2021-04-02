import React, { MouseEvent } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Menu from "@material-ui/core/Menu"
import IconButton from "@material-ui/core/IconButton"
import FontColorPicker from "../dropdowns/FontColorPicker"

const useStyles = makeStyles((theme: Theme) => ({
  popper: {
    padding: theme.spacing(2),
  },
}))

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * FontColorButton displays a button with associated click logic for selecting
 * a font color.
 */
const FontColorButton = ({ icon }: Props) => {
  const classes = useStyles()
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
      <IconButton
        size="small"
        aria-label="font-color-button"
        aria-haspopup="true"
        onClick={handleClick}>
        {icon}
      </IconButton>
      <Menu
        id="font-color-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        MenuListProps={{ disablePadding: true }}
        onClose={handleClose}>
        <div className={classes.popper}>
          <FontColorPicker />
        </div>
      </Menu>
    </React.Fragment>
  )
}

export default FontColorButton
