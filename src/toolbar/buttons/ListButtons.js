// @flow
import React from "react"
import {
  OrderedListButton,
  UnorderedListButton,
  ListDecreaseIndentButton,
  ListIncreaseIndentButton,
} from "../../plugins/list"
import { ToolbarProps } from "../../flow/types"

const ListButtons = (props: ToolbarProps) => (
  <>
    <UnorderedListButton {...props} />
    <OrderedListButton {...props} />
    <ListIncreaseIndentButton {...props} />
    <ListDecreaseIndentButton {...props} />
  </>
)

export default ListButtons
