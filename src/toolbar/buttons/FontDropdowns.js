// @flow
import React from "react"
import { FontFamilyDropdown } from "../../plugins/fontfamily"
import { FontSizeDropdown } from "../../plugins/fontsize"
import Separator from "../../toolbar/Separator"
import { ToolbarProps } from "../../flow/types"

const FontDropdowns = (props: ToolbarProps) => (
  <>
    <FontFamilyDropdown {...props} />
    <Separator />
    <FontSizeDropdown {...props} />
  </>
)

export default FontDropdowns
