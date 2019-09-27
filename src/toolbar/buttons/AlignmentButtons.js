// @flow
import React from "react"
import {
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
  AlignmentJustifyButton,
} from "../../plugins/alignment"
import { ToolbarProps } from "../../flow/types"

const AlignmentButtons = (props: ToolbarProps) => (
  <>
    <AlignmentLeftButton {...props} />
    <AlignmentCenterButton {...props} />
    <AlignmentRightButton {...props} />
    <AlignmentJustifyButton {...props} />
  </>
)

export default AlignmentButtons
