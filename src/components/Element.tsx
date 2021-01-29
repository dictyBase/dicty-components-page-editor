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
  const { align, type } = element

  switch (type) {
    case "align":
      return (
        <Typography
          component="span"
          variant="inherit"
          align={align}
          {...attributes}>
          {children}
        </Typography>
      )
    case "h1":
      return (
        <Typography variant="h1" align={align} {...attributes}>
          {children}
        </Typography>
      )
    case "h2":
      return (
        <Typography variant="h2" align={align} {...attributes}>
          {children}
        </Typography>
      )
    case "h3":
      return (
        <Typography variant="h3" align={align} {...attributes}>
          {children}
        </Typography>
      )
    default:
      return (
        <Typography component="p" align={align} variant="body1" {...attributes}>
          {children}
        </Typography>
      )
  }
}

export default Element
