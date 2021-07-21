import React from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import MarkButton from "./buttons/MarkButton"
import BlockButton from "./buttons/BlockButton"
import AlignButton from "./buttons/AlignButton"
import LinkButton from "./buttons/LinkButton"
import AutolinkIDsButton from "./buttons/AutolinkIDsButton"
import FontColorButton from "./buttons/FontColorButton"
import LineSpacingButton from "./buttons/LineSpacingButton"
import ImageButton from "./buttons/ImageButton"
import VideoButton from "./buttons/VideoButton"
import ScientificSymbolsButton from "./buttons/ScientificSymbolsButton"
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
import IndentIncreaseIcon from "./icons/IndentIncreaseIcon"
import IndentDecreaseIcon from "./icons/IndentDecreaseIcon"
// align icons
import AlignLeftIcon from "./icons/AlignLeftIcon"
import AlignCenterIcon from "./icons/AlignCenterIcon"
import AlignRightIcon from "./icons/AlignRightIcon"
import AlignJustifyIcon from "./icons/AlignJustifyIcon"
// dropdowns
import Dropdown from "./dropdowns/Dropdown"
// utils
import { FontFamilyList, FontSizeList } from "../utils/dropdownValues"
// types
import { types, alignments } from "../constants/types"
import { toggleBlock } from "../utils/blocks"
import { toggleList } from "../utils/lists"
import { indentItem, undentItem } from "../plugins/withLists"
import TableButtons from "./buttons/TableButtons"
import Separator from "./Separator"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: theme.spacing(1),
  },
  toolbar: {
    cursor: "default",
  },
  divider: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}))

const listButtons = (editor: Editor) => [
  {
    format: types.unorderedList,
    icon: <UnorderedListIcon />,
    callback: () => toggleList(editor, types.unorderedList),
  },
  {
    format: types.orderedList,
    icon: <OrderedListIcon />,
    callback: () => toggleList(editor, types.orderedList),
  },
  {
    format: types.indentIncrease,
    icon: <IndentIncreaseIcon />,
    callback: () => indentItem(editor),
  },
  {
    format: types.indentDecrease,
    icon: <IndentDecreaseIcon />,
    callback: () => undentItem(editor),
  },
]

/**
 * Toolbar is the display for the editor toolbar.
 */
const EditorToolbar = () => {
  const editor = useSlate()
  const classes = useStyles()

  return (
    <AppBar color="default" position="sticky" className={classes.container}>
      <Toolbar disableGutters variant="dense" className={classes.toolbar}>
        <Grid container>
          <Grid item xs={12}>
            <MarkButton format={types.bold} icon={<BoldIcon />} />
            <MarkButton format={types.italic} icon={<ItalicIcon />} />
            <MarkButton format={types.underline} icon={<UnderlinedIcon />} />
            <MarkButton
              format={types.strikethrough}
              icon={<StrikethroughIcon />}
            />
            <MarkButton format={types.subscript} icon={<SubscriptIcon />} />
            <MarkButton format={types.superscript} icon={<SuperscriptIcon />} />
            <Separator />
            <BlockButton
              format={types.h1}
              icon={<H1Icon />}
              clickFn={() => toggleBlock(editor, types.h1)}
            />
            <BlockButton
              format={types.h2}
              icon={<H2Icon />}
              clickFn={() => toggleBlock(editor, types.h2)}
            />
            <BlockButton
              format={types.h3}
              icon={<H3Icon />}
              clickFn={() => toggleBlock(editor, types.h3)}
            />
            <LinkButton icon={<LinkIcon />} />
            <AutolinkIDsButton />
            <Separator />
            <AlignButton align={alignments.left} icon={<AlignLeftIcon />} />
            <AlignButton align={alignments.center} icon={<AlignCenterIcon />} />
            <AlignButton align={alignments.right} icon={<AlignRightIcon />} />
            <AlignButton
              align={alignments.justify}
              icon={<AlignJustifyIcon />}
            />
            <BlockButton
              format={types.divider}
              icon={<DividerIcon />}
              clickFn={() => toggleBlock(editor, types.divider)}
            />
            <Separator />
            {listButtons(editor).map((item) => (
              <BlockButton
                format={item.format}
                icon={item.icon}
                clickFn={item.callback}
                key={item.format}
              />
            ))}
            <Separator />
            <TableButtons />
            <Separator />
            <LineSpacingButton icon={<LineSpacingIcon />} />
            <ImageButton icon={<ImageIcon />} />
            <VideoButton icon={<VideoIcon />} />
            <Separator />
            <FontColorButton />
            <ScientificSymbolsButton />
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
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default EditorToolbar
