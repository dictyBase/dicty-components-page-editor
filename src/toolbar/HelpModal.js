// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import HelpModalContent from "./HelpModalContent"

const styles = (theme) => ({
  closeBtn: {
    width: "50%",
    color: "#fff",
    backgroundColor: "#15317e",

    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
  link: {
    textDecoration: "none",
  },
  container: {
    fontFamily: "Roboto, sans-serif",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Function to handle closing of the modal */
  handleClose: Function,
}

const HelpMuiModal = (props: Props) => {
  const { classes, handleClose } = props

  return (
    <Dialog className={classes.container} open={true} onClose={handleClose}>
      <DialogTitle id="help-dialog-title">Editor Help</DialogTitle>
      <DialogContent>
        <Grid container justify="center" direction="column">
          <Grid item xs={12}>
            <HelpModalContent classes={classes} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className={classes.closeBtn} onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const HelpModal = withStyles(styles)(HelpMuiModal)

export default HelpModal
