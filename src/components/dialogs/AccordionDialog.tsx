import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { AccordionDialogProps } from "../../types/dialog"

const AccordionDialog = ({
  handleAddClick,
  handleClose,
  dialogOpen,
  accordion,
  setAccordion,
}: AccordionDialogProps) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="accordion-dialog-title">
      <DialogTitle id="accordion-dialog-title">Accordion Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          onChange={(e) =>
            setAccordion({
              ...accordion,
              title: e.target.value,
            })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          id="body"
          label="Body"
          type="text"
          onChange={(e) =>
            setAccordion({
              ...accordion,
              body: e.target.value,
            })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddClick} variant="contained" color="primary">
          Add Accordion
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccordionDialog
