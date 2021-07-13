import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Image from "./Image"
import Video from "./Video"
import { Props } from "../types/element"
import { types } from "../constants/types"

type StyleProps = {
  lineSpacing: string | unknown
  borderColor: string | unknown
}

const useStyles = makeStyles(() => ({
  lineSpacing: (props: StyleProps) => ({
    lineHeight: props.lineSpacing,
  }),
  table: (props: StyleProps) => ({
    border: `1px solid ${props.borderColor}`,
    borderCollapse: "collapse",
  }),
}))

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: Props) => {
  const { type, align = "inherit", lineSpacing, borderColor, url } = element
  const styleProps = {
    lineSpacing: lineSpacing ? lineSpacing : "normal",
    borderColor: borderColor ? borderColor : "grey",
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
    case types.video:
      return (
        <Video element={element} attributes={attributes}>
          {children}
        </Video>
      )
    case types.unorderedList:
      return <ul {...attributes}>{children}</ul>
    case types.orderedList:
      return <ol {...attributes}>{children}</ol>
    case types.listItem:
      return <li {...attributes}>{children}</li>
    case types.table:
      return (
        <Table className={classes.table}>
          <TableBody {...attributes}>{children}</TableBody>
        </Table>
      )
    case types.tableRow:
      return <TableRow {...attributes}>{children}</TableRow>
    case types.tableCell:
      return (
        <TableCell className={classes.table} {...attributes}>
          {children}
        </TableCell>
      )
    case types.tableWrap:
      return (
        <Typography component="div" {...attributes}>
          {children}
        </Typography>
      )
    default:
      return (
        <Typography component="div" align={align} {...attributes}>
          {children}
        </Typography>
      )
  }
}

export default Element
