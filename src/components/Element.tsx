import React from "react"
import { RenderElementProps } from "slate-react"
import Typography from "@material-ui/core/Typography"

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: RenderElementProps) => {
  const { type } = element

  switch (type) {
    case "align-left":
      return (
        <Typography component="span" align="left" {...attributes}>
          {children}
        </Typography>
      )
    case "align-center":
      return (
        <Typography component="span" align="center" {...attributes}>
          {children}
        </Typography>
      )
    case "align-right":
      return (
        <Typography component="span" align="right" {...attributes}>
          {children}
        </Typography>
      )
    case "align-justify":
      return (
        <Typography component="span" align="justify" {...attributes}>
          {children}
        </Typography>
      )
    case "h1":
      return (
        <Typography variant="h1" {...attributes}>
          {children}
        </Typography>
      )
    case "h2":
      return (
        <Typography variant="h2" {...attributes}>
          {children}
        </Typography>
      )
    case "h3":
      return (
        <Typography variant="h3" {...attributes}>
          {children}
        </Typography>
      )
    default:
      return (
        <Typography component="p" variant="body1" {...attributes}>
          {children}
        </Typography>
      )
  }
}

export default Element
