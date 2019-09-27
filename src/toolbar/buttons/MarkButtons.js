// @flow
import React from "react"
import { BoldButton } from "../../plugins/bold"
import { ItalicButton } from "../../plugins/italic"
import { StrikethroughButton } from "../../plugins/strikethrough"
import { SubscriptButton } from "../../plugins/subscript"
import { SuperscriptButton } from "../../plugins/superscript"
import { UnderlineButton } from "../../plugins/underline"
import { ToolbarProps } from "../../flow/types"

const MarkButtons = (props: ToolbarProps) => (
  <>
    <BoldButton {...props} />
    <ItalicButton {...props} />
    <UnderlineButton {...props} />
    <StrikethroughButton {...props} />
    <SubscriptButton {...props} />
    <SuperscriptButton {...props} />
  </>
)

export default MarkButtons
