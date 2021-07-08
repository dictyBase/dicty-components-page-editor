import React, { MouseEvent } from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Popper from "@material-ui/core/Popper"
import ScientificSymbolIcon from "../icons/ScientificSymbolIcon"

const getSymbolsList = () => {
  const start = 0x0391
  const end = 0x03c9
  const symbols = []
  for (let i = start; i < end; i++) {
    symbols.push(String.fromCharCode(i))
  }
  return symbols
}

const useStyles = makeStyles((theme: Theme) => ({
  popper: {
    marginTop: theme.spacing(1.5),
    backgroundColor: theme.palette.grey[100],
    width: "400px",
  },
  button: {
    borderRadius: "0px",
    border: `1px solid ${theme.palette.grey[200]}`,
    width: "21px",
  },
}))

/**
 * ScientificSymbolsButton displays a button and popper for scientific symbols.
 */
const ScientificSymbolsButton = () => {
  const editor = useSlate()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleItemClick = (item: string) => {
    Editor.insertText(editor, item)
    setAnchorEl(null)
  }

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const symbols = getSymbolsList()
  const open = Boolean(anchorEl)

  return (
    <React.Fragment>
      <Tooltip title="scientific symbols">
        <IconButton
          size="small"
          aria-label="scientific symbols"
          aria-haspopup="true"
          onMouseDown={handleMenuOpen}>
          <ScientificSymbolIcon />
        </IconButton>
      </Tooltip>
      <Popper
        className={classes.popper}
        id={open ? "symbol-popper" : undefined}
        open={open}
        anchorEl={anchorEl}>
        {symbols.map((item: string, index: number) => {
          return (
            <IconButton
              className={classes.button}
              key={index}
              onClick={() => handleItemClick(item)}
              size="small">
              {item}
            </IconButton>
          )
        })}
      </Popper>
    </React.Fragment>
  )
}

export default ScientificSymbolsButton
