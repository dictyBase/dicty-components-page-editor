import { Image } from "./image"
import { Link } from "./link"

type DialogProps = {
  /** Function to call when user clicks 'add' button */
  handleAddClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Function called when user closes dialog without clicking 'add' 'button */
  handleClose: () => void
  /** Determines if dialog is open */
  dialogOpen: boolean
}

type ImageDialogProps = {
  /** Image value */
  image: Image
  /** Set image state */
  setImage: (arg0: Image) => void
} & DialogProps

type LinkDialogProps = {
  /** Link value */
  link: Link
  /** Set link state */
  setLink: (arg0: Link) => void
} & DialogProps

export type { DialogProps, ImageDialogProps, LinkDialogProps }
