import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Divider from "@material-ui/core/Divider"
import MarkButton from "./buttons/MarkButton"
import BlockButton from "./buttons/BlockButton"
import AlignButton from "./buttons/AlignButton"
import LinkButton from "./buttons/LinkButton"
import FontColorButton from "./buttons/FontColorButton"
import LineSpacingButton from "./buttons/LineSpacingButton"
import ImageButton from "./buttons/ImageButton"
import VideoButton from "./buttons/VideoButton"
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
import LinkIcon from "./icons/LinkIcon"
import DividerIcon from "./icons/DividerIcon"
import LineSpacingIcon from "./icons/LineSpacingIcon"
import ImageIcon from "./icons/ImageIcon"
import VideoIcon from "./icons/VideoIcon"
import UnorderedListIcon from "./icons/UnorderedListIcon"
import OrderedListIcon from "./icons/OrderedListIcon"
// align icons
import AlignLeftIcon from "./icons/AlignLeftIcon"
import AlignCenterIcon from "./icons/AlignCenterIcon"
import AlignRightIcon from "./icons/AlignRightIcon"
import AlignJustifyIcon from "./icons/AlignJustifyIcon"
// dropdowns
import Dropdown from "./dropdowns/Dropdown"
import FontColorIcon from "./icons/FontColorIcon"
// utils
import { FontFamilyList, FontSizeList } from "../utils/dropdownValues"
// types
import { types, alignments } from "../constants/types"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}))

/**
 * Toolbar is the display for the editor toolbar.
 */
const EditorToolbar = () => {
  const classes = useStyles()

  return (
    <AppBar color="default" position="static" className={classes.container}>
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
        <LinkButton icon={<LinkIcon />} />
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <AlignButton align={alignments.left} icon={<AlignLeftIcon />} />
        <AlignButton align={alignments.center} icon={<AlignCenterIcon />} />
        <AlignButton align={alignments.right} icon={<AlignRightIcon />} />
        <AlignButton align={alignments.justify} icon={<AlignJustifyIcon />} />
        <BlockButton format={types.divider} icon={<DividerIcon />} />
        <BlockButton
          format={types.unorderedList}
          icon={<UnorderedListIcon />}
        />
        <BlockButton format={types.orderedList} icon={<OrderedListIcon />} />
        <LineSpacingButton icon={<LineSpacingIcon />} />
        <ImageButton icon={<ImageIcon />} />
        <VideoButton icon={<VideoIcon />} />
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <FontColorButton icon={<FontColorIcon />} />
        <Dropdown
          mark="fontFamily"
          defaultValue="Roboto"
          values={FontFamilyList}
        />
        <Dropdown
          mark="fontSize"
          defaultValue="1rem"
          values={FontSizeList}
          minWidth="90px"
        />
      </Toolbar>
    </AppBar>
  )
}

export default EditorToolbar
