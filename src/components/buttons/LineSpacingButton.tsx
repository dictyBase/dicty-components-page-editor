import React, { MouseEvent } from "react"
import { Transforms } from "slate"
import { useSlate } from "slate-react"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import { types } from "../../constants/types"
import { LineSpacingList } from "../../utils/dropdownValues"

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
        {LineSpacingList.map((item: string, index: number) => (
          <MenuItem key={index} onClick={() => handleItemClick(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default LineSpacingButton
