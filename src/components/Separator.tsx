import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  separator: {
    borderLeftColor: "#c1c1c1",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    display: "inline-block",
    height: "20px",
    verticalAlign: "middle",
  },
})

const Separator = () => {
  const classes = useStyles()

  return <div className={classes.separator} />
}

export default Separator
