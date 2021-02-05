import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Divider from "@material-ui/core/Divider"
import MarkButton from "./buttons/MarkButton"
import BlockButton from "./buttons/BlockButton"
import AlignButton from "./buttons/AlignButton"
// mark icons
import BoldIcon from "./icons/BoldIcon"
import ItalicIcon from "./icons/ItalicIcon"
import StrikethroughIcon from "./icons/StrikethroughIcon"
import SubscriptIcon from "./icons/SubscriptIcon"
import SuperscriptIcon from "./icons/SuperscriptIcon"
import UnderlinedIcon from "./icons/UnderlinedIcon"
// block icons
import H1Icon from "./icons/H1Icon"
import H2Icon from "./icons/H2Icon"
import H3Icon from "./icons/H3Icon"
// align icons
import AlignLeftIcon from "./icons/AlignLeftIcon"
import AlignCenterIcon from "./icons/AlignCenterIcon"
import AlignRightIcon from "./icons/AlignRightIcon"
import AlignJustifyIcon from "./icons/AlignJustifyIcon"
// types
import { types, alignments } from "../constants/types"

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
        <MarkButton format={types.bold} icon={<BoldIcon />} />
        <MarkButton format={types.italic} icon={<ItalicIcon />} />
        <MarkButton format={types.underline} icon={<UnderlinedIcon />} />
        <MarkButton format={types.strikethrough} icon={<StrikethroughIcon />} />
        <MarkButton format={types.subscript} icon={<SubscriptIcon />} />
        <MarkButton format={types.superscript} icon={<SuperscriptIcon />} />
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <BlockButton format={types.h1} icon={<H1Icon />} />
        <BlockButton format={types.h2} icon={<H2Icon />} />
        <BlockButton format={types.h3} icon={<H3Icon />} />
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <AlignButton align={alignments.left} icon={<AlignLeftIcon />} />
        <AlignButton align={alignments.center} icon={<AlignCenterIcon />} />
        <AlignButton align={alignments.right} icon={<AlignRightIcon />} />
        <AlignButton align={alignments.justify} icon={<AlignJustifyIcon />} />
      </Toolbar>
    </AppBar>
  )
}

export default EditorToolbar
