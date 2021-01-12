import React from "react"
import { RenderElementProps } from "slate-react"
// import Typography from "@material-ui/core/Typography"

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default Element
