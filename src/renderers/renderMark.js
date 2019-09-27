// @flow
import React from "react"
import { BoldMark } from "../plugins/bold"
import { FontColorMark } from "../plugins/fontcolor"
import { FontFamilyMark } from "../plugins/fontfamily"
import { FontSizeMark } from "../plugins/fontsize"
import { ItalicMark } from "../plugins/italic"
import { StrikethroughMark } from "../plugins/strikethrough"
import { SubscriptMark } from "../plugins/subscript"
import { SuperscriptMark } from "../plugins/superscript"
import { UnderlineMark } from "../plugins/underline"

type markProps = {
  mark: Object,
}

/**
 * Necessary renderMark function that receives the mark type then renders the HTML
 * In our case, we are returning custom components
 */
const renderMark = (props: markProps, editor: Object, next: Function) => {
  const { mark } = props

  switch (mark.type) {
    case "bold":
      return <BoldMark {...props} />
    case "font-color":
      return <FontColorMark {...props} />
    case "font-family":
      return <FontFamilyMark {...props} />
    case "font-size":
      return <FontSizeMark {...props} />
    case "italic":
      return <ItalicMark {...props} />
    case "strikethrough":
      return <StrikethroughMark {...props} />
    case "subscript":
      return <SubscriptMark {...props} />
    case "superscript":
      return <SuperscriptMark {...props} />
    case "underline":
      return <UnderlineMark {...props} />
    default:
      return next()
  }
}

export default renderMark
