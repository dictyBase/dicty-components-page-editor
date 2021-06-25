import React from "react"
import { Editor, Transforms } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import AccordionDialog from "../dialogs/AccordionDialog"
import { Accordion } from "../../types/accordion"
import { types } from "../../constants/types"
import useStyles from "../../styles/buttons"

// this is necessary to maintain editor selection when accordion dialog appears;
// the deselect method unsets the editor selection
Transforms.deselect = () => {}

const insertAccordion = (editor: Editor, accordion: Accordion) => {
  const { title, body } = accordion
  const accordionData = {
    type: types.accordion,
    children: [
      {
        type: types.accordionTitle,
        children: [{ text: title }],
      },
      {
        type: types.accordionBody,
        children: [{ text: body }],
      },
    ],
  }
  Transforms.insertNodes(editor, accordionData)
}

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * AccordionButton is a button specifically for adding accordions.
 */
const AccordionButton = ({ icon }: Props) => {
  const editor = useSlate()
  const [accordionDialogOpen, setAccordionDialogOpen] = React.useState(false)
  const [accordion, setAccordion] = React.useState<Accordion>({
    title: "",
    body: "",
  })
  const props = {
    active: false,
  }
  const classes = useStyles(props)

  const handleAddAccordion = () => {
    insertAccordion(editor, accordion)
    setAccordionDialogOpen(false)
  }

  // if the user has clicked away without adding the accordion then
  // we don't need to do anything with their data
  const handleClose = () => setAccordionDialogOpen(false)

  return (
    <React.Fragment>
      <Tooltip title="accordion">
        <IconButton
          className={classes.button}
          size="small"
          aria-label="accordion"
          onMouseDown={() => setAccordionDialogOpen(true)}>
          {icon}
        </IconButton>
      </Tooltip>
      <AccordionDialog
        handleAddClick={handleAddAccordion}
        handleClose={handleClose}
        dialogOpen={accordionDialogOpen}
        accordion={accordion}
        setAccordion={setAccordion}
      />
    </React.Fragment>
  )
}

export default AccordionButton
