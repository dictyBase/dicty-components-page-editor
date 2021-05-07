import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { ImageDialogProps } from "../../types/dialog"

const ImageDialog = ({
  handleAddClick,
  handleClose,
  dialogOpen,
  image,
  setImage,
}: ImageDialogProps) => {
  const [checked, setChecked] = React.useState(false)

  const handleCheckboxChange = () => {
    setChecked(!checked)
  }

  return (
    <Dialog
      open={dialogOpen}
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
          label="Width (optional)"
          type="number"
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
          label="Height (optional)"
          type="number"
          onChange={(e) =>
            setImage({
              ...image,
              height: Number(e.target.value),
            })
          }
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              color="primary"
              name="checkedA"
            />
          }
          label="Is this a link?"
        />
        {checked && (
          <TextField
            margin="dense"
            id="link"
            label="Link URL"
            type="text"
            onChange={(e) =>
              setImage({
                ...image,
                linkURL: e.target.value,
              })
            }
            fullWidth
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddClick} variant="contained" color="primary">
          Add Image
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ImageDialog
