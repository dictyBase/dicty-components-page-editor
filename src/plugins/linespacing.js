// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ToolbarButton from "../toolbar/ToolbarButton"
import LineSpacingIcon from "@material-ui/icons/FormatLineSpacing"
import { ButtonProps, NodeProps } from "../flow/types"

/**
 * Functions to set the line spacing blocks.
 */
const lineSpacingNodeStrategy = (editor, size) =>
  editor.unwrapBlock("line-spacing").wrapBlock({
    type: "line-spacing",
    data: { size },
  })

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const LineSpacingNode = ({
  children,
  attributes,
  node: { data },
}: NodeProps) => (
  <div style={{ lineHeight: `${data.get("size")}` }} {...attributes}>
    {children}
  </div>
)

/**
 * Dropdown component that connects to the editor.
 */
const LineSpacingButton = ({ editor }: ButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleItemClick = (size) => {
    setAnchorEl(null)
    lineSpacingNodeStrategy(editor, size)
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}>
      <MenuItem onClick={() => handleItemClick("1.0")}>1.0</MenuItem>
      <MenuItem onClick={() => handleItemClick("1.1")}>1.1</MenuItem>
      <MenuItem onClick={() => handleItemClick("1.2")}>1.2</MenuItem>
      <MenuItem onClick={() => handleItemClick("1.3")}>1.3</MenuItem>
      <MenuItem onClick={() => handleItemClick("1.4")}>1.4</MenuItem>
      <MenuItem onClick={() => handleItemClick("1.5")}>1.5</MenuItem>
      <MenuItem onClick={() => handleItemClick("1.6")}>1.6 (default)</MenuItem>
      <MenuItem onClick={() => handleItemClick("2.0")}>2.0</MenuItem>
      <MenuItem onClick={() => handleItemClick("2.5")}>2.5</MenuItem>
      <MenuItem onClick={() => handleItemClick("3.0")}>3.0</MenuItem>
    </Menu>
  )

  return (
    <>
      <Tooltip title="Line Spacing" placement="bottom">
        <ToolbarButton
          onClick={handleMenuOpen}
          aria-owns={anchorEl ? "line-spacing-menu" : undefined}
          aria-haspopup="true">
          <LineSpacingIcon />
        </ToolbarButton>
      </Tooltip>
      {renderMenu}
    </>
  )
}

/**
 * Export everything needed for the editor.
 */
export { LineSpacingNode, LineSpacingButton }
