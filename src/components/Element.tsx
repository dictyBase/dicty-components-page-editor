import React from "react"
import { RenderElementProps } from "slate-react"
import { makeStyles } from "@material-ui/core/styles"
import Typography, { TypographyProps } from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Image from "./Image"
import { types } from "../constants/types"

type StyleProps = {
  lineSpacing: string | unknown
}

const useStyles = makeStyles(() => ({
  lineSpacing: (props: StyleProps) => ({
    lineHeight: props.lineSpacing,
  }),
}))

type ElementProps = {
  element: {
    /** Type of element to render */
    type: string
    /** Text alignment (left, center, right, justify) */
    align?: TypographyProps["align"]
    /** URL used for links and images */
    url?: string
    /** Description of image (used for alt attribute) */
    description?: string
    /** Width of element (image) */
    width?: string
    /** Height of element (image) */
    height?: string
    /** URL link used for an image */
    linkURL?: string
    /** Any children to render */
    children: any
  }
}
type Props = ElementProps & RenderElementProps

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: Props) => {
  const { type, align = "left", lineSpacing, url } = element
  const styleProps = {
    lineSpacing: lineSpacing ? lineSpacing : "normal",
  }
  const classes = useStyles(styleProps)

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
    case types.divider:
      return <Divider {...attributes} />
    case types.lineSpacing:
      return (
        <Typography
          component="div"
          className={classes.lineSpacing}
          {...attributes}>
          {children}
        </Typography>
      )
    case types.image:
      return (
        <Image element={element} attributes={attributes}>
          {children}
        </Image>
      )
    default:
      return (
        <Typography component="p" align={align} {...attributes}>
          {children}
        </Typography>
      )
  }
}

export type { Props }
export default Element
