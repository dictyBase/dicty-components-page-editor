// @flow
import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import ImageIcon from "@material-ui/icons/Image"
import ToolbarButton from "../toolbar/ToolbarButton"
import styles from "../toolbar/toolbarStyles"
import { ButtonProps, NodeProps } from "../flow/types"

type ImageData = {
  src: string,
  description: string,
  height: string,
  width: string,
}

/**
 * Functions to set the image blocks.
 */
const insertImage = (editor: Object, data: ImageData) => {
  editor.insertBlock({
    type: "image",
    data: {
      src: data.src,
      description: data.description,
      height: data.height,
      width: data.width,
    },
  })
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const ImageNode = ({ attributes, isFocused, node: { data } }: NodeProps) => {
  const src = data.get("src")
  const description = data.get("description")
  const height = data.get("height")
  const width = data.get("width")

  return (
    <img
      src={src}
      height={height}
      width={width}
      alt={description}
      style={{ boxShadow: `${isFocused ? "0 0 0 2px #15317e" : "none"}` }}
      {...attributes}
    />
  )
}

/**
 * Button component that uses a click handler to connect to the editor.
 */
const ImageButtonUnconnected = ({ editor, classes }: ButtonProps) => {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [url, setURL] = useState("")
  const [description, setDescription] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")

  const data = {
    src: url,
    description,
    width,
    height,
  }

  const handleAddImageClick = () => {
    setImageModalOpen(false)
    editor.command(insertImage, data)
  }

  return (
    <>
      <Tooltip title="Image" placement="bottom">
        <ToolbarButton
          onClick={() => {
            setImageModalOpen(true)
          }}>
          <ImageIcon />
        </ToolbarButton>
      </Tooltip>
      {imageModalOpen && (
        <Dialog
          open={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
          aria-labelledby="image-dialog-title">
          <DialogTitle id="image-dialog-title">Image Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="URL"
              type="url"
              onChange={e => setURL(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label="Description (optional)"
              type="description"
              onChange={e => setDescription(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="width"
              label="Width (optional)"
              type="width"
              onChange={e => setWidth(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="height"
              label="Height (optional)"
              type="height"
              onChange={e => setHeight(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAddImageClick}
              className={classes.basicButton}
              variant="contained"
              color="primary">
              Add Image
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

const ImageButton = withStyles(styles)(ImageButtonUnconnected)

/**
 * Export everything needed for the editor.
 */
export { ImageNode, ImageButton, insertImage }
