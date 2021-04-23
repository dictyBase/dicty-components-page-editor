import React from "react"
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import { HexColorPicker, HexColorInput } from "react-colorful"
import getCurrentMark from "../../utils/getCurrentMark"

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

const FontColorPicker = () => {
  const editor = useSlate()
  const theme = useTheme()
  const classes = useStyles()
  const presetColors = getPresetColors(theme)
  const mark = "fontColor"

  const handleChange = (value: string) => {
    Editor.addMark(editor, mark, value)
  }

  return (
    <div className={classes.popper}>
      <HexColorPicker
        color={getCurrentMark(editor, mark)}
        onChange={handleChange}
      />
      <HexColorInput
        className={classes.input}
        color={getCurrentMark(editor, mark)}
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

export default FontColorPicker
