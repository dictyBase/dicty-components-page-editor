// @flow
import React, { useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import HelpIcon from "@material-ui/icons/Help"
import { withStyles } from "@material-ui/core/styles"
import ToolbarButton from "../toolbar/ToolbarButton"
import HelpModal from "../toolbar/HelpModal"

/** import toolbar button groups */
import MarkButtons from "./buttons/MarkButtons"
import AlignmentButtons from "./buttons/AlignmentButtons"
import ListButtons from "./buttons/ListButtons"
import HeadingButtons from "./buttons/HeadingButtons"
import FeatureButtons from "./buttons/FeatureButtons"
import TableButtons from "./buttons/TableButtons"
import FontDropdowns from "./buttons/FontDropdowns"
import { DividerButton } from "../plugins/divider"
import { FontColorButton, FontColorPicker } from "../plugins/fontcolor"
import { LineSpacingButton } from "../plugins/linespacing"
import Separator from "./Separator"

import styles from "./toolbarStyles"

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Function for saving page content */
  onSave: Function,
}

/**
 * The toolbar for the page editor. It uses Material-UI's AppBar component as the foundation, then displays individual buttons inside of it.
 */

export const EditorToolbar = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showTableOptions, setShowTableOptions] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const { classes, onSave } = props

  return (
    <>
      <AppBar className={classes.toolbar} position="static" color="default">
        <Toolbar>
          <Grid container>
            <Grid item xs={12}>
              <MarkButtons {...props} />
              <Separator />
              <AlignmentButtons {...props} />
              <Separator />
              <DividerButton {...props} />
              <Separator />
              <ListButtons {...props} />
              <Separator />
              <HeadingButtons {...props} />
              <Separator />
              <LineSpacingButton {...props} />
              <Separator />
              <FeatureButtons
                showTableOptions={showTableOptions}
                setShowTableOptions={setShowTableOptions}
                {...props}
              />
              <Separator />
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
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={10}>
                  {showTableOptions && <TableButtons {...props} />}
                  <FontDropdowns {...props} />
                  <Separator />
                  <Tooltip title="Editor Help">
                    <ToolbarButton
                      onClick={() => {
                        setShowHelpModal(true)
                      }}>
                      <HelpIcon className={classes.largeIcon} />
                    </ToolbarButton>
                  </Tooltip>
                  {showHelpModal && (
                    <HelpModal
                      handleClose={() => {
                        setShowHelpModal(false)
                      }}
                      onClick={() => window.scrollTo(0, 0)}
                    />
                  )}
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1}>
                  <Button
                    className={classes.saveButton}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onSave}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default withStyles(styles)(EditorToolbar)
