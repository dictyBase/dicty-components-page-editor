import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: "70px",
    textTransform: "none",
    marginRight: theme.spacing(1),
  },
}))

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
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="row" justifyContent="flex-end">
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        onClick={handleCancel}>
        Cancel
      </Button>
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        color="primary"
        onClick={handleSave}>
        Save
      </Button>
    </Box>
  )
}

export default ActionButtons
