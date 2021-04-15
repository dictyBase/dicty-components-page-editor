import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { RenderLeafProps } from "slate-react"
import "../utils/fonts"

type StyleProps = {
  fontFamily: string | unknown
  fontSize: string | unknown
  fontColor: string | unknown
}

const useStyles = makeStyles(() => ({
  text: (props: StyleProps) => ({
    fontFamily: props.fontFamily,
    fontSize: props.fontSize,
    color: props.fontColor,
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
  const theme = useTheme()
  const props = {
    fontFamily: leaf.fontFamily ? leaf.fontFamily : theme.typography.fontFamily,
    fontSize: leaf.fontSize ? leaf.fontSize : theme.typography.fontSize,
    fontColor: leaf.fontColor ? leaf.fontColor : theme.palette.text.primary,
  }
  const classes = useStyles(props)

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  if (leaf.subscript) {
    children = <sub>{children}</sub>
  }

  if (leaf.superscript) {
    children = <sup>{children}</sup>
  }

  return (
    <Typography component="span" className={classes.text} {...attributes}>
      {children}
    </Typography>
  )
}

export default Leaf
