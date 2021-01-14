import React from "react"
import { RenderElementProps } from "slate-react"
import Typography from "@material-ui/core/Typography"

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    default:
      return (
        <Typography component="p" variant="body1" {...attributes}>
          {children}
        </Typography>
      )
  }
}

export default Element
