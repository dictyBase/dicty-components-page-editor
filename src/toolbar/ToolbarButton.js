// @flow
import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import { isFunction } from "../utils/utils"

const useStyles = makeStyles({
  button: {
    color: "rgba(0, 0, 0, 0.87)",
    padding: "7px",
    minWidth: "20px",
  },
  tableBtn: {
    textTransform: "none",
    paddingLeft: "2px",
    paddingRight: "6px",
  },
})

type Props = {
  /** Any content wrapped inside the button */
  children: any,
  /** Function to handle button click event */
  onClick: Function,
  /** Boolean to indicate whether this is a special table button */
  table?: boolean,
}

/**
 * Material-UI button that has a click handler attached to it.
 */

const ToolbarButton = ({ children, onClick, table, ...props }: Props) => {
  const classes = useStyles()

  return (
    <Button
      className={table ? classes.tableBtn : classes.button}
      onClick={(event) => {
        isFunction(onClick) && onClick(event)
      }}>
      {children}
    </Button>
  )
}

export default ToolbarButton
