import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles((theme: Theme) => ({
  dropdown: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}))

const FontFamilyList = [
  "Lato",
  "Merriweather",
  "Montserrat",
  "Roboto",
  "Roboto Condensed",
  "Roboto Mono",
  "Roboto Slab",
]

const FontFamilyDropdown = () => {
  const [currentFont, setCurrentFont] = React.useState(3)
  const classes = useStyles()

  const handleChange = (event: any) => {
    setCurrentFont(event.target.value)
    // add logic for transforming nodes
  }

  return (
    <FormControl className={classes.dropdown}>
      <Select value={currentFont} onChange={handleChange}>
        {FontFamilyList.map((font, index) => (
          <MenuItem
            key={`font-family-${index}`}
            value={index}
            style={{ fontFamily: font }}>
            {font}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FontFamilyDropdown
