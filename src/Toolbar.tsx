import React from "react"
import MarkButton from "./components/buttons/MarkButton"
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"

/**
 * Toolbar is the display for the editor toolbar.
 */
const Toolbar = () => {
  return (
    <div>
      <MarkButton format="bold" icon={<FormatBoldIcon />} />
      <MarkButton format="italic" icon={<FormatItalicIcon />} />
      <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
    </div>
  )
}

export default Toolbar
