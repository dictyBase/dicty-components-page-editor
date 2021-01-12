import React from "react"
import { RenderLeafProps } from "slate-react"
import Typography from "@material-ui/core/Typography"

/**
 * Leaf is used to render text based on a given style.
 */

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return (
    <Typography component="span" variant="body1" {...attributes}>
      {children}
    </Typography>
  )
}

export default Leaf
