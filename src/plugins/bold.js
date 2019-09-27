// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"
import { ButtonProps } from "../flow/types"

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const BoldMark = ({ children }: any) => <strong>{children}</strong>

/**
 * Bold button that uses a click handler to connect the button to the editor.
 */
const BoldButton = ({ editor }: ButtonProps) => (
  <Tooltip title="Bold" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.toggleMark("bold")
      }}>
      <FormatBoldIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcut to use for bold.
 * It accepts event and change as arguments.
 */
const BoldKeyboardShortcut = (event, editor, next) => {
  if (isMod(event) && event.key === "b") {
    return editor.toggleMark("bold")
  }
  return next()
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const BoldPlugin = (options?: Object) => ({
  onKeyDown(...args: Array<any>) {
    return BoldKeyboardShortcut(...args)
  },
})

export { BoldPlugin, BoldMark, BoldButton }
