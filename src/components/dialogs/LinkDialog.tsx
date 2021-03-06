import React from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

type Props = {
  /** Function to call when  */
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Determines if modal is open */
  linkModalOpen: boolean
  /** Toggle link modal */
  setLinkModalOpen: (arg0: boolean) => void
  /** URL for link */
  url: string
  /** Set link URL state */
  setURL: (arg0: string) => void
  /** Text for link */
  text: string
  /** Set text for link */
  setText: (arg0: string) => void
}

const LinkDialog = ({
  handleClick,
  linkModalOpen,
  setLinkModalOpen,
  url,
  setURL,
  text,
  setText,
}: Props) => {
  return (
    <Dialog
      open={linkModalOpen}
      onClose={() => setLinkModalOpen(false)}
      aria-labelledby="link-dialog-title">
      <DialogTitle id="link-dialog-title">Link Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label={"URL"}
          type="url"
          defaultValue={url}
          onChange={(e) => setURL(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="text"
          label="Text"
          type="text"
          defaultValue={text ? text : ""}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} variant="contained" color="primary">
          Add Link
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LinkDialog
