// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import styles from "./toolbarStyles"

type Props = {
  classes: Object,
}

const Separator = ({ classes }: Props) => <div className={classes.separator} />

export default withStyles(styles)(Separator)
