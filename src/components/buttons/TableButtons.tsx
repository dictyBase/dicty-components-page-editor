import React, { MouseEvent } from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import BlockButton from "./BlockButton"
import TableIcon from "../icons/TableIcon"
import TableInsertColumnIcon from "../icons/TableInsertColumnIcon"
import TableInsertRowIcon from "../icons/TableInsertRowIcon"
import TableDeleteColumnIcon from "../icons/TableDeleteColumnIcon"
import TableDeleteRowIcon from "../icons/TableDeleteRowIcon"
import DeleteIcon from "../icons/DeleteIcon"
// import BorderColorIcon from "../icons/BorderColorIcon"
// import TableBorderButton from "./TableBorderButton"
import { isBlockActive } from "../../utils/blocks"
import useStyles from "../../styles/buttons"
import { types } from "../../constants/types"
import {
  insertTable,
  insertTableRow,
  insertTableColumn,
  deleteTable,
  deleteTableRow,
  deleteTableColumn,
} from "../../utils/tables"

const tableButtons = (editor: Editor) => [
  {
    format: types.tableColumn,
    icon: <TableInsertColumnIcon />,
    callback: () => insertTableColumn(editor),
  },
  {
    format: types.tableRow,
    icon: <TableInsertRowIcon />,
    callback: () => insertTableRow(editor),
  },
  {
    format: types.tableColumnDelete,
    icon: <TableDeleteColumnIcon />,
    callback: () => deleteTableColumn(editor),
  },
  {
    format: types.tableRowDelete,
    icon: <TableDeleteRowIcon />,
    callback: () => deleteTableRow(editor),
  },
  {
    format: types.tableDelete,
    icon: <DeleteIcon />,
    callback: () => deleteTable(editor),
  },
]

/**
 * TableButtons handles the display logic for the table buttons in the toolbar.
 */
const TableButtons = () => {
  const editor = useSlate()
  const active = isBlockActive(editor, "type", types.tableWrap)
  const props = {
    active: active,
  }
  const classes = useStyles(props)

  // when button is clicked, toggle the block within the editor
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    insertTable(editor)
  }

  return (
    <React.Fragment>
      <Tooltip title={types.table}>
        <IconButton
          className={classes.button}
          size="small"
          aria-label={types.table}
          // use onMouseDown to avoid editor selection becoming null
          // and losing cursor position
          onMouseDown={handleMouseDown}>
          <TableIcon />
        </IconButton>
      </Tooltip>
      {active && (
        <React.Fragment>
          {tableButtons(editor).map((item) => (
            <BlockButton
              format={item.format}
              icon={item.icon}
              clickFn={item.callback}
              key={item.format}
            />
          ))}
          {/* <TableBorderButton icon={<BorderColorIcon />} /> */}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default TableButtons
