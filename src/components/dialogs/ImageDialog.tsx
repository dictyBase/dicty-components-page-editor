import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Image } from "../../types/image"

type Props = {
  /** Function to call when user clicks 'add image' button */
  handleAddImage: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Function called when user closes image dialog without clicking 'add image' 'button */
  handleClose: () => void
  /** Determines if dialog is open */
  imageDialogOpen: boolean
  /** Image value */
  image: Image
  /** Set image state */
  setImage: (arg0: Image) => void
}

const ImageDialog = ({
  handleAddImage,
  handleClose,
  imageDialogOpen,
  image,
  setImage,
}: Props) => {
  return (
    <Dialog
      open={imageDialogOpen}
      onClose={handleClose}
      aria-labelledby="image-dialog-title">
      <DialogTitle id="image-dialog-title">Image Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="URL"
          type="url"
          defaultValue={image.url}
          onChange={(e) =>
            setImage({
              ...image,
              url: e.target.value,
            })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          defaultValue={image.description}
          onChange={(e) =>
            setImage({
              ...image,
              description: e.target.value,
            })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          id="width"
          label="Width"
          type="number"
          defaultValue={image.width ? image.width : ""}
          onChange={(e) =>
            setImage({
              ...image,
              width: Number(e.target.value),
            })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          id="height"
          label="Height"
          type="number"
          defaultValue={image.height ? image.height : ""}
          onChange={(e) =>
            setImage({
              ...image,
              height: Number(e.target.value),
            })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddImage} variant="contained" color="primary">
          Add Image
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ImageDialog
