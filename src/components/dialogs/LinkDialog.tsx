import React from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useStyles from "../../styles/dialog"
import { LinkDialogProps } from "../../types/dialog"

const LinkDialog = ({
  handleAddClick,
  handleClose,
  dialogOpen,
  link,
  setLink,
}: LinkDialogProps) => {
  const classes = useStyles()

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="link-dialog-title">
      <DialogTitle id="link-dialog-title">Link Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="URL"
          type="url"
          defaultValue={link.url}
          onChange={(e) =>
            setLink({
              url: e.target.value,
              text: link.text,
            })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          id="text"
          label="Text"
          type="text"
          defaultValue={link.text ? link.text : ""}
          onChange={(e) =>
            setLink({
              text: e.target.value,
              url: link.url,
            })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={handleAddClick}
          variant="contained"
          color="primary">
          Add Link
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LinkDialog
