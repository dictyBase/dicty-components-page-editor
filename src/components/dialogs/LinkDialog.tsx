import React from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { Link } from "../../types/link"

type Props = {
  /** Function to call when user clicks 'add link' button */
  handleAddLink: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Function called when user closes link dialog without clicking 'add link' 'button */
  handleClose: () => void
  /** Determines if modal is open */
  linkModalOpen: boolean
  /** Link value */
  link: Link
  /** Set link state */
  setLink: (arg0: Link) => void
}

const LinkDialog = ({
  handleAddLink,
  handleClose,
  linkModalOpen,
  link,
  setLink,
}: Props) => {
  return (
    <Dialog
      open={linkModalOpen}
      onClose={handleClose}
      aria-labelledby="link-dialog-title">
      <DialogTitle id="link-dialog-title">Link Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label={"URL"}
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
        <Button onClick={handleAddLink} variant="contained" color="primary">
          Add Link
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LinkDialog
