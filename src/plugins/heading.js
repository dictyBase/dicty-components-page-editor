// @flow
import React from "react"
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

/**
 * Functions to set the heading blocks.
 */
const headingStrategy = (editor, heading) => {
  const { value } = editor
  const isActive = hasBlock(value, heading)
  return editor.setBlocks(isActive ? "paragraph" : heading)
}

const hasBlock = (value, type) => value.blocks.some(node => node.type === type)

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const HeaderNode = ({ attributes, children, variant }: NodeProps) => (
  <Typography variant={variant} {...attributes}>
    {children}
  </Typography>
)

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const H1Button = ({ editor }: ButtonProps) => (
  <Tooltip title="Heading 1" placement="bottom">
    <ToolbarButton
      onClick={() => {
        headingStrategy(editor, "h1")
      }}>
      <strong>H1</strong>
    </ToolbarButton>
  </Tooltip>
)

const H2Button = ({ editor }: ButtonProps) => (
  <Tooltip title="Heading 2" placement="bottom">
    <ToolbarButton
      onClick={() => {
        headingStrategy(editor, "h2")
      }}>
      <strong>H2</strong>
    </ToolbarButton>
  </Tooltip>
)

const H3Button = ({ editor }: ButtonProps) => (
  <Tooltip title="Heading 3" placement="bottom">
    <ToolbarButton
      onClick={() => {
        headingStrategy(editor, "h3")
      }}>
      <strong>H3</strong>
    </ToolbarButton>
  </Tooltip>
)

/**
 * Export everything needed for the editor.
 */
export { HeaderNode, H1Button, H2Button, H3Button }
