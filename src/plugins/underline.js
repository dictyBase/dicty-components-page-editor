// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"
import { ButtonProps } from "../flow/types"

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const UnderlineMark = ({ children }: any) => <u>{children}</u>

/**
 * Underline button that uses a click handler to connect the button to the editor.
 */
const UnderlineButton = ({ editor }: ButtonProps) => (
  <Tooltip title="Underline" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.toggleMark("underline")
      }}>
      <FormatUnderlinedIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcut to use for underline.
 * It accepts event and change as arguments.
 */
const UnderlineKeyboardShortcut = (event, editor, next) => {
  if (isMod(event) && event.key === "u") {
    return editor.toggleMark("underline")
  }
  return next()
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const UnderlinePlugin = (options?: Object) => ({
  onKeyDown(...args: Array<any>) {
    return UnderlineKeyboardShortcut(...args)
  },
})

export { UnderlinePlugin, UnderlineMark, UnderlineButton }
