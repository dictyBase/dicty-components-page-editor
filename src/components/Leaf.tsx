import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { useSlate, RenderLeafProps } from "slate-react"
import getFontSize from "../utils/getFontSize"
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
    lineHeight: "inherit",
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
  const editor = useSlate()
  const theme = useTheme()
  const props = {
    fontFamily: leaf.fontFamily ? leaf.fontFamily : theme.typography.fontFamily,
    fontSize: getFontSize(editor, leaf.fontSize as string),
    fontColor: leaf.fontColor ? leaf.fontColor : theme.palette.text.primary,
  }
  const classes = useStyles(props)

  if (leaf.bold) {
    children = <strong data-testid="bold">{children}</strong>
  }

  if (leaf.italic) {
    children = <em data-testid="italic">{children}</em>
  }

  if (leaf.underline) {
    children = <u data-testid="underline">{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s data-testid="strikethrough">{children}</s>
  }

  if (leaf.subscript) {
    children = <sub data-testid="subscript">{children}</sub>
  }

  if (leaf.superscript) {
    children = <sup data-testid="superscript">{children}</sup>
  }

  return (
    <Typography
      component="span"
      variant="inherit"
      className={classes.text}
      {...attributes}>
      {children}
    </Typography>
  )
}

export default Leaf
