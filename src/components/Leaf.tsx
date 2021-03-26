import React from "react"
import { RenderLeafProps } from "slate-react"
import "../utils/fonts"

/**
 * Leaf is used to render text based on a given style.
 *
 * We need to use standard if conditionals and not if/else if because
 * a leaf can have multiple matching properties. If a leaf is both bold
 * and italic, for example, then ultimately this component would render:
 *
 * <span {...attributes}><strong><em>{children}</em></strong></span>
 */
const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  switch (true) {
    case leaf.hasOwnProperty("bold"):
      children = <strong>{children}</strong>
    case leaf.hasOwnProperty("italic"):
      children = <em>{children}</em>
    case leaf.hasOwnProperty("underline"):
      children = <u>{children}</u>
    case leaf.hasOwnProperty("strikethrough"):
      children = <s>{children}</s>
    case leaf.hasOwnProperty("subscript"):
      children = <sub>{children}</sub>
    case leaf.hasOwnProperty("superscript"):
      children = <sup>{children}</sup>
    default:
      children = children
  }

  return <span {...attributes}>{children}</span>
}

export default Leaf
