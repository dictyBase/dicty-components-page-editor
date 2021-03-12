import React from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

type Link = {
  /** Text for link */
  text: string
  /** URL for link */
  url: string
}

type Props = {
  /** Function to call when  */
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Determines if modal is open */
  linkModalOpen: boolean
  /** Toggle link modal */
  setLinkModalOpen: (arg0: boolean) => void
  /** Link value */
  link: Link
  /** Set link state */
  setLink: (arg0: Link) => void
}

const LinkDialog = ({
  handleClick,
  linkModalOpen,
  setLinkModalOpen,
  link,
  setLink,
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
        <Button onClick={handleClick} variant="contained" color="primary">
          Add Link
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LinkDialog
