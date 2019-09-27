// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import styles from "./editorStyles"

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Determines if editor is read only */
  readOnly: Boolean,
  /** Function called when cancel button is clicked */
  onCancel: Function,
  /** Function called when save button is clicked */
  onSave: Function,
}

/**
 * PageEditorBottomButtons contains the buttons at the bottom of the editable page.
 */

const PageEditorBottomButtons = (props: Props) => {
  const { classes, onCancel, onSave } = props

  return (
    <Grid container justify="flex-end">
      <Grid item xs={2} className={classes.buttonGrid}>
        <Button
          className={classes.cancelButton}
          size="small"
          variant="contained"
          onClick={onCancel}>
          Cancel
        </Button>
      </Grid>
      <Grid item xs={2} className={classes.buttonGrid}>
        <Button
          className={classes.saveButton}
          size="small"
          variant="contained"
          color="primary"
          onClick={onSave}>
          Save
        </Button>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PageEditorBottomButtons)
