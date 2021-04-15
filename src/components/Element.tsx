import React from "react"
import { RenderElementProps } from "slate-react"
import Typography, { TypographyProps } from "@material-ui/core/Typography"
import { types } from "../constants/types"

type ElementProps = {
  element: {
    /** Type of element to render */
    type: string
    /** Text alignment (left, center, right, justify) */
    align?: TypographyProps["align"]
    /** URL used for links */
    url?: string
    /** Any children to render */
    children: any
  }
}
type Props = ElementProps & RenderElementProps

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: Props) => {
  const { type, align = "left", url } = element

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
    default:
      return (
        <Typography component="p" variant="body1" align={align} {...attributes}>
          {children}
        </Typography>
      )
  }
}

export default Element
