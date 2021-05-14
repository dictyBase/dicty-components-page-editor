import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useSelected, useFocused } from "slate-react"
import { Props } from "../types/element"

type StyleProps = {
  align: string | unknown
  selected: boolean
  focused: boolean
}

const useStyles = makeStyles(() => ({
  video: (props: StyleProps) => ({
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: props.selected && props.focused ? "0 0 0 3px #B4D5FF" : "none",
  }),
  videoContainer: (props: StyleProps) => ({
    textAlign: props.align,
    display: "block",
  }),
}))

/**
 * Video handles the display of any videos.
 */
const Video = ({ attributes, element, children }: Props) => {
  const { align, url, width, height } = element
  const selected = useSelected()
  const focused = useFocused()
  const styleProps = {
    align,
    selected,
    focused,
  }
  const classes = useStyles(styleProps)

  return (
    <div className={classes.videoContainer} {...attributes}>
      <div contentEditable={false}>
        <iframe
          title="video-embed"
          id="videoplayer"
          width={width}
          height={height}
          src={url}
          frameBorder="0"
          className={classes.video}
          allowFullScreen
        />
      </div>
      {children}
    </div>
  )
}

export default Video
