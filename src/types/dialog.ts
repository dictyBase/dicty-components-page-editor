import { Link } from "./link"
import { Image } from "./image"
import { Video } from "./video"

type DialogProps = {
  /** Function to call when user clicks 'add' button */
  handleAddClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Function called when user closes dialog without clicking 'add' 'button */
  handleClose: () => void
  /** Determines if dialog is open */
  dialogOpen: boolean
}

type LinkDialogProps = {
  /** Link value */
  link: Link
  /** Set link state */
  setLink: (arg0: Link) => void
} & DialogProps

type ImageDialogProps = {
  /** Image value */
  image: Image
  /** Set image state */
  setImage: (arg0: Image) => void
} & DialogProps

type VideoDialogProps = {
  /** Video value */
  video: Video
  /** Set video state */
  setVideo: (arg0: Video) => void
} & DialogProps

export type { DialogProps, LinkDialogProps, ImageDialogProps, VideoDialogProps }
