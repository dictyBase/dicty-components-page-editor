import React from "react"
import { RenderElementProps } from "slate-react"
import Typography from "@material-ui/core/Typography"

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
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
