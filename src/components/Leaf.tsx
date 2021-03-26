import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { RenderLeafProps } from "slate-react"
import "../utils/fonts"

type StyleProps = {
  fontFamily: string | unknown
}

const useStyles = makeStyles(() => ({
  text: (props: StyleProps) => ({
    fontFamily: props.fontFamily,
  }),
}))

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
  const props = {
    fontFamily: leaf.fontFamily ? leaf.fontFamily : "Roboto",
  }
  const classes = useStyles(props)

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

  return (
    <span className={classes.text} {...attributes}>
      {children}
    </span>
  )
}

export default Leaf
