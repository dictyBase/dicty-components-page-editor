// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import Divider from "@material-ui/core/Divider"
import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"
import { ButtonProps } from "../flow/types"

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const DividerNode = ({ attributes }: any) => <Divider {...attributes} />

/**
 * Button components that use click handlers to connect to the editor.
 */
const DividerButton = ({ editor }: ButtonProps) => (
  <Tooltip title="Divider" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.setBlocks({
          type: "divider",
        })
      }}>
      <strong>—</strong>
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcuts to use for dividers.
 * It accepts event and change as arguments.
 */
const DividerKeyboardShortcut = (event, editor, next) => {
  if (isMod(event) && event.key === "]")
    return editor.setBlocks({
      type: "divider",
    })
  return next()
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const DividerPlugin = (options?: Object) => ({
  onKeyDown(...args: Array<any>) {
    return DividerKeyboardShortcut(...args)
  },
})

/**
 * Export everything needed for the editor.
 */
export { DividerNode, DividerButton, DividerPlugin }
