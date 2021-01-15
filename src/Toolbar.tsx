import React from "react"
import MarkButton from "./components/buttons/MarkButton"
import BlockButton from "./components/buttons/BlockButton"
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough"
import H1Icon from "@material-ui/icons/LooksOne"
import H2Icon from "@material-ui/icons/LooksTwo"

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
      <BlockButton format="h1" icon={<H1Icon />} />
      <BlockButton format="h2" icon={<H2Icon />} />
    </div>
  )
}

export default Toolbar
