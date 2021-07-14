import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import MarkButton from "./buttons/MarkButton"
import LinkButton from "./buttons/LinkButton"
import AutolinkIDsButton from "./buttons/AutolinkIDsButton"
import ScientificSymbolsButton from "./buttons/ScientificSymbolsButton"
import BoldIcon from "./icons/BoldIcon"
import ItalicIcon from "./icons/ItalicIcon"
import StrikethroughIcon from "./icons/StrikethroughIcon"
import SubscriptIcon from "./icons/SubscriptIcon"
import SuperscriptIcon from "./icons/SuperscriptIcon"
import UnderlinedIcon from "./icons/UnderlinedIcon"
import LinkIcon from "./icons/LinkIcon"
import { types } from "../constants/types"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: theme.spacing(1),
  },
  toolbar: {
    position: "sticky",
    top: 0,
    cursor: "default",
  },
}))

/**
 * InlineToolbar is a condensed toolbar used for inline editing.
 */
const InlineToolbar = () => {
  const classes = useStyles()

  return (
    <AppBar color="default" position="static" className={classes.container}>
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
            <LinkButton icon={<LinkIcon />} />
            <AutolinkIDsButton />
            <ScientificSymbolsButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default InlineToolbar
