import React from "react"
import MarkButton from "./components/buttons/MarkButton"
import BlockButton from "./components/buttons/BlockButton"
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough"

/**
 * Toolbar is the display for the editor toolbar.
 */
const Toolbar = () => {
  return (
    <div>
      <MarkButton format="bold" icon={<FormatBoldIcon />} />
      <MarkButton format="italic" icon={<FormatItalicIcon />} />
      <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
      <MarkButton format="strikethrough" icon={<FormatStrikethroughIcon />} />
      <BlockButton format="h1" icon={<span>1</span>} />
      <BlockButton format="h2" icon={<span>2</span>} />
    </div>
  )
}

export default Toolbar
