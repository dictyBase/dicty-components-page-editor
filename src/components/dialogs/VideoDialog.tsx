import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { VideoDialogProps } from "../../types/dialog"

const VideoDialog = ({
  handleAddClick,
  handleClose,
  dialogOpen,
  video,
  setVideo,
}: VideoDialogProps) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="video-dialog-title">
      <DialogTitle id="video-dialog-title">Video Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="URL"
          type="url"
          onChange={(e) =>
            setVideo({
              ...video,
              url: e.target.value,
            })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          id="width"
          label="Width (optional)"
          type="number"
          onChange={(e) =>
            setVideo({
              ...video,
              width: Number(e.target.value),
            })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          id="height"
          label="Height (optional)"
          type="number"
          onChange={(e) =>
            setVideo({
              ...video,
              height: Number(e.target.value),
            })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddClick} variant="contained" color="primary">
          Add Video
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VideoDialog
