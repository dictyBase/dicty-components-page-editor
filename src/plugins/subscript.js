// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSubscript } from "@fortawesome/free-solid-svg-icons"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps } from "../flow/types"

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const SubscriptMark = ({ children }: any) => <sub>{children}</sub>

/**
 * Subscript button that uses a click handler to connect the button to the editor.
 */
const SubscriptButton = ({ editor }: ButtonProps) => (
  <Tooltip title="Subscript" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.toggleMark("subscript")
      }}>
      <FontAwesomeIcon icon={faSubscript} />
    </ToolbarButton>
  </Tooltip>
)

export { SubscriptMark, SubscriptButton }
