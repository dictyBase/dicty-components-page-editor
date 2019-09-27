// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough"
import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"
import { ButtonProps } from "../flow/types"

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const StrikethroughMark = ({ children }: any) => <del>{children}</del>

/**
 * Strikethrough button that uses a click handler to connect the button to the editor.
 */
const StrikethroughButton = ({ editor }: ButtonProps) => (
  <Tooltip title="Strikethrough" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.toggleMark("strikethrough")
      }}>
      <FormatStrikethroughIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcut to use for strikethrough.
 * It accepts event and change as arguments.
 */
const StrikethroughKeyboardShortcut = (event, editor, next) => {
  if (isMod(event) && event.key === "s") {
    return editor.toggleMark("strikethrough")
  }
  return next()
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const StrikethroughPlugin = (options?: Object) => ({
  onKeyDown(...args: Array<any>) {
    return StrikethroughKeyboardShortcut(...args)
  },
})

export { StrikethroughPlugin, StrikethroughMark, StrikethroughButton }
