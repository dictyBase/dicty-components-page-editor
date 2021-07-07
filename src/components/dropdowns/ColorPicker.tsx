import React from "react"
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import { HexColorPicker, HexColorInput } from "react-colorful"

// get list of preset colors to show beneath picker
const getPresetColors = (theme: Theme) => {
  const { palette } = theme
  return [
    palette.primary.main,
    palette.secondary.main,
    palette.error.main,
    palette.warning.main,
    palette.info.main,
    palette.success.main,
  ]
}

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    width: "24px",
    height: "24px",
    padding: "0px",
    margin: theme.spacing(0.5),
    cursor: "pointer",
  },
  input: {
    width: "90%",
    textTransform: "uppercase",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: "4px",
  },
  popper: {
    padding: theme.spacing(2),
  },
}))

type Props = {
  /** Function to call when color is selected */
  handleChange: (value: string) => void
  /** Active color of current text selection */
  activeColor: string
}

/**
 * ColorPicker handles the display of the color picker.
 */
const ColorPicker = ({ handleChange, activeColor }: Props) => {
  const theme = useTheme()
  const classes = useStyles()
  const presetColors = getPresetColors(theme)

  return (
    <div className={classes.popper}>
      <HexColorPicker color={activeColor} onChange={handleChange} />
      <HexColorInput
        className={classes.input}
        color={activeColor}
        onChange={handleChange}
      />
      <div className={classes.buttonContainer}>
        {presetColors.map((color: string) => (
          <IconButton
            key={color}
            className={classes.button}
            style={{ backgroundColor: color }}
            onClick={() => handleChange(color)}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
