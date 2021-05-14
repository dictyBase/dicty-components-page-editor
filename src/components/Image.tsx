import React from "react"
import { useSelected, useFocused } from "slate-react"
import useStyles from "../styles/media"
import { Props } from "../types/element"

/**
 * Image handles the display of any images.
 */
const Image = ({ attributes, element, children }: Props) => {
  const { align, url, description, width, height, linkURL } = element
  const selected = useSelected()
  const focused = useFocused()
  const styleProps = {
    align,
    selected,
    focused,
  }
  const classes = useStyles(styleProps)

  const img = (
    <img
      src={url}
      alt={description}
      height={height || "100%"}
      width={width || "100%"}
      className={classes.media}
    />
  )

  return (
    <div className={classes.container} {...attributes}>
      <div contentEditable={false}>
        {linkURL !== "" ? <a href={linkURL}>{img}</a> : { img }}
      </div>
      {children}
    </div>
  )
}

export default Image
