import React from "react"
import Box from "@material-ui/core/Box"
import ActionButton from "./buttons/ActionButton"

type Props = {
  /** Function called when cancel button is clicked */
  handleCancel: () => void
  /** Function called when save button is clicked */
  handleSave: () => void
}

/**
 * ActionButtons contains the cancel and save buttons used at the bottom of the editor.
 */
const ActionButtons = ({ handleCancel, handleSave }: Props) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="flex-end">
      <ActionButton handleClick={handleCancel} text="Cancel" />
      <ActionButton handleClick={handleSave} text="Save" color="primary" />
    </Box>
  )
}

export default ActionButtons
