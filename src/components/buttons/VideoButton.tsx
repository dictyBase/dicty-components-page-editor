import React from "react"
import { Editor, Transforms } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import VideoDialog from "../dialogs/VideoDialog"
import { types } from "../../constants/types"
import { Video } from "../../types/video"
import useStyles from "../../styles/buttons"
import getVideoID from "../../utils/getVideoID"

// this is necessary to maintain editor selection when video dialog appears;
// the deselect method unsets the editor selection
Transforms.deselect = () => {}

/**
 * addVideo inserts a new video node.
 */
const addVideo = (editor: Editor, video: Video) => {
  const { url, width, height } = video
  let transformedURL = url
  const videoID = getVideoID(url)
  if (url.match(/youtube\.com/)) {
    transformedURL = `https://www.youtube.com/embed/${videoID}`
  }
  if (url.match(/vimeo\.com/)) {
    transformedURL = `https://player.vimeo.com/video/${videoID}`
  }
  const videoData = {
    type: types.video,
    url: transformedURL,
    width,
    height,
    children: [{ text: "" }],
  }
  Transforms.insertNodes(editor, videoData)
}

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * VideoButton is a button specifically for adding videos.
 */
const VideoButton = ({ icon }: Props) => {
  const editor = useSlate()
  const [videoDialogOpen, setVideoDialogOpen] = React.useState(false)
  const [video, setVideo] = React.useState<Video>({
    url: "",
  })
  const props = {
    active: false,
  }
  const classes = useStyles(props)

  const handleAddVideo = () => {
    addVideo(editor, video)
    setVideoDialogOpen(false)
  }

  // if the user has clicked away without adding the video then we don't need to do anything with their data
  const handleClose = () => setVideoDialogOpen(false)

  return (
    <React.Fragment>
      <Tooltip title="video">
        <IconButton
          className={classes.button}
          size="small"
          aria-label="video"
          onMouseDown={() => setVideoDialogOpen(true)}>
          {icon}
        </IconButton>
      </Tooltip>
      <VideoDialog
        handleAddClick={handleAddVideo}
        handleClose={handleClose}
        dialogOpen={videoDialogOpen}
        video={video}
        setVideo={setVideo}
      />
    </React.Fragment>
  )
}

export default VideoButton
