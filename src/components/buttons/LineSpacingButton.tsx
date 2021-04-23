import React, { MouseEvent } from "react"
import { Transforms } from "slate"
import { useSlate } from "slate-react"
import { makeStyles } from "@material-ui/core/styles"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import CheckIcon from "../icons/CheckIcon"
import { types } from "../../constants/types"
import { LineSpacingList } from "../../utils/dropdownValues"
import getLineSpacing from "../../utils/getLineSpacing"

const useStyles = makeStyles(() => ({
  menuItem: {
    display: "flex",
    justifyContent: "flex-end",
    width: "75px",
  },
  icon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}))

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * LineSpacingButton displays a button with associated click logic for selecting
 * line spacing.
 */
const LineSpacingButton = ({ icon }: Props) => {
  const editor = useSlate()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleItemClick = (item: string) => {
    Transforms.setNodes(editor, {
      type: types.lineSpacing,
      lineSpacing: item,
    })
    setAnchorEl(null)
  }

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <React.Fragment>
      <Tooltip title="line spacing">
        <IconButton
          size="small"
          aria-label="line-spacing-button"
          aria-haspopup="true"
          onClick={handleMenuOpen}>
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        id="line-spacing-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        MenuListProps={{ disablePadding: true }}
        onClose={() => setAnchorEl(null)}>
        {LineSpacingList.map((item: string, index: number) => {
          const currentLineSpacing = getLineSpacing(editor)
          return (
            <MenuItem
              key={index}
              onClick={() => handleItemClick(item)}
              className={classes.menuItem}>
              <IconButton size="small" className={classes.icon}>
                {currentLineSpacing === item && <CheckIcon />}
              </IconButton>
              {item}
            </MenuItem>
          )
        })}
      </Menu>
    </React.Fragment>
  )
}

export default LineSpacingButton
