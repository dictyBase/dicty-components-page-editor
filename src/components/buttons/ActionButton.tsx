import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Button, { ButtonProps } from "@material-ui/core/Button"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: "70px",
    textTransform: "none",
    marginRight: theme.spacing(1),
  },
}))

type Props = {
  /** Function called when button is clicked */
  handleClick: () => void
  /** Text displayed inside button */
  text: string
  /** Color of button */
  color?: ButtonProps["color"]
}

/**
 * ActionButton is a small button used for actions like saving and cancelling.
 */
const ActionButton = ({ handleClick, text, color = "default" }: Props) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.button}
      size="medium"
      variant="contained"
      color={color}
      onClick={handleClick}>
      {text}
    </Button>
  )
}

export default ActionButton
