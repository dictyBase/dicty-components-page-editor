import React from "react"
import { Editor, Element as SlateElement, Node, Transforms } from "slate"
import { useSlate } from "slate-react"
import Menu from "@material-ui/core/Menu"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import ColorPicker from "../dropdowns/ColorPicker"
import useAnchorElement from "../../hooks/useAnchorElement"
import getParentNode from "../../utils/getParentNode"
import { types } from "../../constants/types"

const getActiveColor = (editor: Editor) => {
  const parentNode = getParentNode(editor)
  return (
    (SlateElement.isElement(parentNode) && parentNode.borderColor) || "grey"
  )
}

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * TableBorderButton displays a button with associated click logic for selecting
 * a table border color.
 */
const TableBorderButton = ({ icon }: Props) => {
  const editor = useSlate()
  const { anchorEl, handleClose, handleMouseDown } = useAnchorElement()

  const handleChange = (value: string) => {
    const selection = editor.selection
    if (selection === null) {
      return
    }
    const nodes = Array.from(
      Node.ancestors(editor, selection.anchor.path, { reverse: true }),
    )
    // get table and tableCell elements that contain borderColor properties
    const elements = nodes.filter((item) => {
      // @ts-ignore
      return item[0].type === types.table || item[0].type === types.tableCell
    })
    // add borderColor to each matching element
    elements.forEach((item) =>
      Transforms.setNodes(
        editor,
        {
          borderColor: value,
        },
        {
          at: item[1],
        },
      ),
    )
  }

  return (
    <React.Fragment>
      <Tooltip title="table border color">
        <IconButton
          size="small"
          aria-label="table border color"
          aria-haspopup="true"
          onMouseDown={handleMouseDown}>
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        id="table-border-color-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        MenuListProps={{ disablePadding: true }}
        onClose={handleClose}>
        <div>
          <ColorPicker
            handleChange={handleChange}
            activeColor={getActiveColor(editor)}
          />
        </div>
      </Menu>
    </React.Fragment>
  )
}

export default TableBorderButton
