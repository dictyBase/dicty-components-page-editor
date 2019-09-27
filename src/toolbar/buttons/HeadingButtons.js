// @flow
import React from "react"
import { H1Button, H2Button, H3Button } from "../../plugins/heading"
import { ToolbarProps } from "../../flow/types"

const HeadingButtons = (props: ToolbarProps) => (
  <>
    <H1Button {...props} />
    <H2Button {...props} />
    <H3Button {...props} />
  </>
)

export default HeadingButtons
