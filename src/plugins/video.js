// @flow
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import VideoIcon from "@material-ui/icons/Videocam"
import getVideoId from "get-video-id"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

type VideoData = {
  height: string,
  width: string,
  url: string,
}

/**
 * Functions to set the video blocks.
 */
const insertVideo = (editor: Object, data: VideoData) => {
  const url = data.url
  const videoId = getVideoId(url).id
  let src
  if (url.match(/youtube\.com/)) {
    src = `https://www.youtube.com/embed/${videoId}`
  } else if (url.match(/vimeo\.com/)) {
    src = `https://player.vimeo.com/video/${videoId}`
  } else {
    alert("Can only accept YouTube or Vimeo URL.")
    return
  }

  editor
    .insertBlock({
      type: "video",
      data: { src, height: data.height, width: data.width },
    })
    .insertBlock("\n")
}

const useStyles = makeStyles({
  basicButton: {
    backgroundColor: "#15317e",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "50.66%",
    height: "0",
  },
  iframe: {
    position: "absolute",
    top: "0px",
    left: "0px",
  },
})

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const VideoNode = ({ children, attributes, node: { data } }: NodeProps) => {
  const classes = useStyles()
  const src = data.get("src")
  let height = data.get("height")
  let width = data.get("width")

  if (height === "") {
    height = "100%"
  }
  if (width === "") {
    width = "100%"
  }

  return (
    <div {...attributes} className={classes.videoWrapper}>
      <iframe
        title="video-embed"
        id="ytplayer"
        type="text/html"
        width={width}
        height={height}
        src={src}
        frameBorder="0"
        allowFullScreen
        className={classes.iframe}
      />
    </div>
  )
}

/**
 * Button components that use click handlers to connect to the editor.
 */
const VideoButton = ({ editor }: ButtonProps) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [url, setURL] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")

  const classes = useStyles()

  const data = {
    url,
    width,
    height,
  }

  const handleAddVideoClick = () => {
    setVideoModalOpen(false)
    editor.command(insertVideo, data)
  }

  return (
    <>
      <Tooltip title="Video" placement="bottom">
        <ToolbarButton
          onClick={() => {
            setVideoModalOpen(true)
          }}>
          <VideoIcon />
        </ToolbarButton>
      </Tooltip>
      {videoModalOpen && (
        <Dialog
          open={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          aria-labelledby="add-video-title">
          <DialogTitle id="add-video-title">Video Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="URL (YouTube or Vimeo)"
              type="url"
              onChange={e => setURL(e.target.value)}
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
              onClick={handleAddVideoClick}
              className={classes.basicButton}
              variant="contained"
              color="primary">
              Add Video
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

/**
 * Export everything needed for the editor.
 */
export { VideoNode, VideoButton, insertVideo }
