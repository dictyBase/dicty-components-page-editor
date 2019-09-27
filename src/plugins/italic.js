// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"
import { ButtonProps } from "../flow/types"

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const ItalicMark = ({ children }: any) => <em>{children}</em>

/**
 * Italic button that uses a click handler to connect the button to the editor.
 */
const ItalicButton = ({ editor }: ButtonProps) => (
  <Tooltip title="Italic" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.toggleMark("italic")
      }}>
      <FormatItalicIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcut to use for italic.
 * It accepts event and change as arguments.
 */
const ItalicKeyboardShortcut = (event, editor, next) => {
  if (isMod(event) && event.key === "i") {
    return editor.toggleMark("italic")
  }
  return next()
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const ItalicPlugin = (options?: Object) => ({
  onKeyDown(...args: Array<any>) {
    return ItalicKeyboardShortcut(...args)
  },
})

export { ItalicPlugin, ItalicMark, ItalicButton }
