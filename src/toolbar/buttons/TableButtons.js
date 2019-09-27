// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import {
  InsertTableButton,
  InsertTableColumnButton,
  InsertTableRowButton,
  RemoveTableColumnButton,
  RemoveTableRowButton,
  RemoveTableButton,
} from "../../plugins/table"
import styles from "../toolbarStyles"
import { ToolbarProps } from "../../flow/types"

const TableButtons = (props: ToolbarProps) => {
  const { classes } = props
  return (
    <div className={classes.tableButtons}>
      <InsertTableButton {...props} />
      <InsertTableColumnButton {...props} />
      <InsertTableRowButton {...props} />
      &nbsp;&nbsp;
      <RemoveTableRowButton {...props} />
      <RemoveTableColumnButton {...props} />
      <RemoveTableButton {...props} />
      <br />
    </div>
  )
}

export default withStyles(styles)(TableButtons)
