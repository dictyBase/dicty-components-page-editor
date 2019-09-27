// @flow
import React from "react"
import DeepTable from "slate-deep-table"
import Tooltip from "@material-ui/core/Tooltip"
import TableIcon from "@material-ui/icons/BorderAll"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import DeleteIcon from "@material-ui/icons/Delete"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

type tableProps = {
  showTableOptions: boolean,
  setShowTableOptions: Function,
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const TableNode = ({ attributes, children }: NodeProps) => (
  <table>
    <tbody {...attributes}>{children}</tbody>
  </table>
)
const TableRowNode = ({ attributes, children }: NodeProps) => (
  <tr {...attributes}>{children}</tr>
)
const TableCellNode = ({ attributes, children }: NodeProps) => (
  <td {...attributes}>{children}</td>
)

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const InsertInitialTableButton = ({
  showTableOptions,
  setShowTableOptions,
}: tableProps) => (
  <Tooltip title="Table" placement="bottom">
    <ToolbarButton
      onClick={() => {
        setShowTableOptions(!showTableOptions)
      }}>
      <TableIcon />
    </ToolbarButton>
  </Tooltip>
)

const InsertTableButton = ({ editor, classes }: ButtonProps) => (
  <Tooltip title="Insert Table" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        editor.insertTable()
      }}>
      <AddIcon /> Add Table
    </ToolbarButton>
  </Tooltip>
)

const InsertTableColumnButton = ({ editor, classes }: ButtonProps) => (
  <Tooltip title="Insert Column" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        editor.insertColumn()
      }}>
      <AddIcon /> &nbsp;Add Column
    </ToolbarButton>
  </Tooltip>
)

const InsertTableRowButton = ({ editor, classes }: ButtonProps) => (
  <Tooltip title="Insert Row" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        editor.insertRow()
      }}>
      <AddIcon /> &nbsp;Add Row
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableColumnButton = ({ editor, classes }: ButtonProps) => (
  <Tooltip title="Remove Column" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        editor.removeColumn()
      }}>
      <RemoveIcon /> &nbsp;Remove Column
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableRowButton = ({ editor, classes }: ButtonProps) => (
  <Tooltip title="Remove Row" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        editor.removeRow()
      }}>
      <RemoveIcon /> &nbsp;Remove Row
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableButton = ({ editor, classes }: ButtonProps) => (
  <Tooltip title="Remove Table" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        editor.removeTable()
      }}>
      <DeleteIcon /> &nbsp;Remove Table
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more in the future.
 */
const TablePlugin = DeepTable({
  typeTable: "table",
  typeRow: "table-row",
  typeCell: "table-cell",
})

/**
 * Export the necessary assets for use with the editor.
 */
export {
  TableNode,
  TableRowNode,
  TableCellNode,
  InsertInitialTableButton,
  InsertTableButton,
  InsertTableColumnButton,
  InsertTableRowButton,
  RemoveTableColumnButton,
  RemoveTableRowButton,
  RemoveTableButton,
  TablePlugin,
}
