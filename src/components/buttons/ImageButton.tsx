import React from "react"
import { Editor, Transforms } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import ImageDialog from "../dialogs/ImageDialog"
import { Image } from "../../types/image"
import { types } from "../../constants/types"
import useStyles from "../../styles/buttons"

// this is necessary to maintain editor selection when image dialog appears;
// the deselect method unsets the editor selection
Transforms.deselect = () => {}

const insertImage = (editor: Editor, image: Image) => {
  const { url, description, width, height, linkURL } = image
  const imageData = {
    type: types.image,
    url,
    description,
    width,
    height,
    linkURL,
    children: [{ text: "" }],
  }
  Transforms.insertNodes(editor, imageData)
}

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * ImageButton is a button specifically for adding images.
 */
const ImageButton = ({ icon }: Props) => {
  const editor = useSlate()
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false)
  const [image, setImage] = React.useState<Image>({
    url: "",
    description: "",
  })
  const props = {
    active: false,
  }
  const classes = useStyles(props)

  const handleAddImage = () => {
    insertImage(editor, image)
    setImageDialogOpen(false)
  }

  // if the user has clicked away without adding the image then we don't need to do anything with their data
  const handleClose = () => setImageDialogOpen(false)

  return (
    <React.Fragment>
      <Tooltip title="image">
        <IconButton
          className={classes.button}
          size="small"
          aria-label="image-button"
          onClick={() => setImageDialogOpen(true)}>
          {icon}
        </IconButton>
      </Tooltip>
      <ImageDialog
        handleAddClick={handleAddImage}
        handleClose={handleClose}
        dialogOpen={imageDialogOpen}
        image={image}
        setImage={setImage}
      />
    </React.Fragment>
  )
}

export default ImageButton
