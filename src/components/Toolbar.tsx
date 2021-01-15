import React from "react"
import MarkButton from "./buttons/MarkButton"
import BlockButton from "./buttons/BlockButton"
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdLooksOne,
  MdLooksTwo,
} from "react-icons/md"
import { FaSubscript, FaSuperscript } from "react-icons/fa"

/**
 * Toolbar is the display for the editor toolbar.
 */
const Toolbar = () => {
  return (
    <div>
      <MarkButton format="bold" icon={<MdFormatBold />} />
      <MarkButton format="italic" icon={<MdFormatItalic />} />
      <MarkButton format="underline" icon={<MdFormatUnderlined />} />
      <MarkButton format="strikethrough" icon={<MdFormatStrikethrough />} />
      <MarkButton format="subscript" icon={<FaSubscript />} />
      <MarkButton format="superscript" icon={<FaSuperscript />} />
      <BlockButton format="h1" icon={<MdLooksOne />} />
      <BlockButton format="h2" icon={<MdLooksTwo />} />
    </div>
  )
}

export default Toolbar
