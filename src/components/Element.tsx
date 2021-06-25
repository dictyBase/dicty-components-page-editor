import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Image from "./Image"
import Video from "./Video"
import ExpandMoreIcon from "./icons/ExpandMoreIcon"
import { Props } from "../types/element"
import { types } from "../constants/types"

type StyleProps = {
  lineSpacing: string | unknown
}

const useStyles = makeStyles(() => ({
  lineSpacing: (props: StyleProps) => ({
    lineHeight: props.lineSpacing,
  }),
  table: {
    border: "1px solid grey",
    borderCollapse: "collapse",
  },
}))

/**
 * Element is used to render blocks based on a given type.
 */
const Element = ({ attributes, children, element }: Props) => {
  const { type, align = "left", lineSpacing, url, accordionTitle } = element
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
        <table className={classes.table}>
          <tbody {...attributes}>{children}</tbody>
        </table>
      )
    case types.tableRow:
      return <tr {...attributes}>{children}</tr>
    case types.tableCell:
      return (
        <td className={classes.table} {...attributes}>
          {children}
        </td>
      )
    case types.tableWrap:
      return (
        <Typography component="div" {...attributes}>
          {children}
        </Typography>
      )
    case types.accordion:
      return <Accordion {...attributes}>{children}</Accordion>
    case types.accordionTitle:
      return (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${accordionTitle}-content`}
          id={`${accordionTitle}-header`}>
          <Typography {...attributes}>{children}</Typography>
        </AccordionSummary>
      )
    case types.accordionBody:
      return (
        <AccordionDetails>
          <Typography {...attributes}>{children}</Typography>
        </AccordionDetails>
      )
    default:
      return (
        <Typography component="p" align={align} {...attributes}>
          {children}
        </Typography>
      )
  }
}

export default Element
