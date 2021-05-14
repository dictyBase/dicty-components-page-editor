import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Image from "./Image"
import Video from "./Video"
import { Props } from "../types/element"
import { types } from "../constants/types"

type StyleProps = {
  lineSpacing: string | unknown
}

const useStyles = makeStyles(() => ({
  lineSpacing: (props: StyleProps) => ({
    lineHeight: props.lineSpacing,
  }),
}))

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: Props) => {
  const { type, align = "left", lineSpacing, url } = element
  const styleProps = {
    lineSpacing: lineSpacing ? lineSpacing : "normal",
  }
  const classes = useStyles(styleProps)

  switch (type) {
    case types.h1:
      return (
        <Typography variant="h1" align={align} {...attributes}>
          {children}
        </Typography>
      )
    case types.h2:
      return (
        <Typography variant="h2" align={align} {...attributes}>
          {children}
        </Typography>
      )
    case types.h3:
      return (
        <Typography variant="h3" align={align} {...attributes}>
          {children}
        </Typography>
      )
    case types.link:
      return (
        <a href={url} {...attributes}>
          {children}
        </a>
      )
    case types.divider:
      return <Divider {...attributes} />
    case types.lineSpacing:
      return (
        <Typography
          component="div"
          className={classes.lineSpacing}
          {...attributes}>
          {children}
        </Typography>
      )
    case types.image:
      return (
        <Image element={element} attributes={attributes}>
          {children}
        </Image>
      )
    case types.video:
      return (
        <Video element={element} attributes={attributes}>
          {children}
        </Video>
      )
    default:
      return (
        <Typography component="p" align={align} {...attributes}>
          {children}
        </Typography>
      )
  }
}

export default Element
