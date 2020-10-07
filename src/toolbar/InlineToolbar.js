// @flow
import React, { useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"

/** import toolbar button groups */
import { BoldButton } from "../plugins/bold"
import { ItalicButton } from "../plugins/italic"
import { SubscriptButton } from "../plugins/subscript"
import { SuperscriptButton } from "../plugins/superscript"
import { UnderlineButton } from "../plugins/underline"
import { LinkButton } from "../plugins/link"
import { FontColorButton, FontColorPicker } from "../plugins/fontcolor"

const useStyles = makeStyles({
  toolbar: {
    position: "sticky",
    top: 0,
    backgroundColor: "#ccd9ff",
    cursor: "default",
  },
  colorPicker: {
    position: "absolute",
    zIndex: "100",
    borderRadius: "5px",
  },
})

/**
 * The toolbar for the page editor. It uses Material-UI's AppBar component as the foundation, then displays individual buttons inside of it.
 */

export const InlineToolbar = (props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const classes = useStyles()

  return (
    <AppBar className={classes.toolbar} position="static" color="default">
      <Toolbar disableGutters variant="dense">
        <Grid container>
          <Grid item xs={12} className={classes.buttonGrid}>
            <BoldButton {...props} />
            <ItalicButton {...props} />
            <UnderlineButton {...props} />
            <SubscriptButton {...props} />
            <SuperscriptButton {...props} />
            <LinkButton {...props} />
            <FontColorButton
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
              {...props}
            />
            &nbsp;&nbsp;
            <span className={classes.colorPicker}>
              {showColorPicker && <FontColorPicker {...props} />}
            </span>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default InlineToolbar
