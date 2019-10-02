// @flow
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  InsertTableButton,
  InsertTableColumnButton,
  InsertTableRowButton,
  RemoveTableColumnButton,
  RemoveTableRowButton,
  RemoveTableButton,
} from "../../plugins/table"
import { ToolbarProps } from "../../flow/types"

const useStyles = makeStyles({
  tableButtons: {
    border: "1px solid #bcbcbc",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "space-between",
    padding: "1px",
  },
})

const TableButtons = (props: ToolbarProps) => {
  const classes = useStyles()

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

export default TableButtons
