import React from "react"
import MarkButton from "./buttons/MarkButton"
import BlockButton from "./buttons/BlockButton"
import BoldIcon from "./icons/BoldIcon"
import H1Icon from "./icons/H1Icon"
import H2Icon from "./icons/H2Icon"
import ItalicIcon from "./icons/ItalicIcon"
import StrikethroughIcon from "./icons/StrikethroughIcon"
import SubscriptIcon from "./icons/SubscriptIcon"
import SuperscriptIcon from "./icons/SuperscriptIcon"
import UnderlinedIcon from "./icons/UnderlinedIcon"

/**
 * Toolbar is the display for the editor toolbar.
 */
const Toolbar = () => {
  return (
    <div>
      <MarkButton format="bold" icon={<BoldIcon />} />
      <MarkButton format="italic" icon={<ItalicIcon />} />
      <MarkButton format="underline" icon={<UnderlinedIcon />} />
      <MarkButton format="strikethrough" icon={<StrikethroughIcon />} />
      <MarkButton format="subscript" icon={<SubscriptIcon />} />
      <MarkButton format="superscript" icon={<SuperscriptIcon />} />
      <BlockButton format="h1" icon={<H1Icon />} />
      <BlockButton format="h2" icon={<H2Icon />} />
    </div>
  )
}

export default Toolbar
