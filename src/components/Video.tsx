import React from "react"
import { useSelected, useFocused } from "slate-react"
import useStyles from "../styles/media"
import { Props } from "../types/element"

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
    <div className={classes.container} {...attributes}>
      <div contentEditable={false}>
        <iframe
          title="video-embed"
          id="videoplayer"
          width={width}
          height={height}
          src={url}
          frameBorder="0"
          className={classes.media}
          allowFullScreen
        />
      </div>
      {children}
    </div>
  )
}

export default Video
