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
  image: (props: StyleProps) => ({
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: props.selected && props.focused ? "0 0 0 3px #B4D5FF" : "none",
  }),
  imageContainer: (props: StyleProps) => ({
    textAlign: props.align,
    display: "block",
  }),
}))

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
      className={classes.image}
    />
  )

  return (
    <div className={classes.imageContainer} {...attributes}>
      <div contentEditable={false}>
        {linkURL !== "" ? <a href={linkURL}>{img}</a> : { img }}
      </div>
      {children}
    </div>
  )
}

export default Image
