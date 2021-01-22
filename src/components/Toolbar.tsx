import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Divider from "@material-ui/core/Divider"
import MarkButton from "./buttons/MarkButton"
import BlockButton from "./buttons/BlockButton"
import BoldIcon from "./icons/BoldIcon"
import H1Icon from "./icons/H1Icon"
import H2Icon from "./icons/H2Icon"
import H3Icon from "./icons/H3Icon"
import ItalicIcon from "./icons/ItalicIcon"
import StrikethroughIcon from "./icons/StrikethroughIcon"
import SubscriptIcon from "./icons/SubscriptIcon"
import SuperscriptIcon from "./icons/SuperscriptIcon"
import UnderlinedIcon from "./icons/UnderlinedIcon"

const useStyles = makeStyles({
  divider: {
    marginLeft: "4px",
    marginRight: "4px",
  },
})

/**
 * Toolbar is the display for the editor toolbar.
 */
const EditorToolbar = () => {
  const classes = useStyles()

  return (
    <AppBar color="default" position="static">
      <Toolbar disableGutters variant="dense">
        <MarkButton format="bold" icon={<BoldIcon />} />
        <MarkButton format="italic" icon={<ItalicIcon />} />
        <MarkButton format="underline" icon={<UnderlinedIcon />} />
        <MarkButton format="strikethrough" icon={<StrikethroughIcon />} />
        <MarkButton format="subscript" icon={<SubscriptIcon />} />
        <MarkButton format="superscript" icon={<SuperscriptIcon />} />
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <BlockButton format="h1" icon={<H1Icon />} />
        <BlockButton format="h2" icon={<H2Icon />} />
        <BlockButton format="h3" icon={<H3Icon />} />
      </Toolbar>
    </AppBar>
  )
}

export default EditorToolbar
