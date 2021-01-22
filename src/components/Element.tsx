import React from "react"
import { RenderElementProps } from "slate-react"
import Typography, { TypographyProps } from "@material-ui/core/Typography"

interface ElementProps extends RenderElementProps {
  element: {
    align?: TypographyProps["align"]
    children: any
    type: {
      align?: boolean
      h1?: boolean
      h2?: boolean
      h3?: boolean
    }
  }
}

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: ElementProps) => {
  switch (element.type) {
    case "align":
      return (
        <Typography variant="inherit" align={element.align} {...attributes}>
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
