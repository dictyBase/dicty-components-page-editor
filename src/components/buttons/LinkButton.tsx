import React from "react"
import { Editor, Transforms, Range, Node, Element as SlateElement } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import LinkDialog from "../dialogs/LinkDialog"
import { types } from "../../constants/types"

// this is necessary to maintain editor selection when link dialog appears
Transforms.deselect = () => {}

// this config looks for a match of the link type
const nodeOptions = {
  match: (n: Node) =>
    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === types.link,
}

/**
 * isLinkActive uses the nodes generator function to find a match for an active
 * link.
 */
const isLinkActive = (editor: Editor) => {
  const nodeGenerator = Editor.nodes(editor, nodeOptions)
  const node = nodeGenerator.next()
  while (!node.done) {
    return true
  }
  return false
}

// unwrap the link from the current selection
const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, nodeOptions)
}

// wrapLink has all of the logic for wrapping a given selection with
// an inline link node
const wrapLink = (editor: Editor, url: string, text: string) => {
  // first, if the selection is already a link then we want to unwrap it;
  // this prevents nested links
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: types.link,
    url,
    children: [{ text: text }],
  }
  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: "end" })
  }
}

const insertLink = (editor: Editor, url: string, text: string) => {
  wrapLink(editor, url, text)
}

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * LinkButton is a button specifically for adding links.
 */
const LinkButton = ({ icon }: Props) => {
  const editor = useSlate()
  const [linkModalOpen, setLinkModalOpen] = React.useState(false)
  const [url, setURL] = React.useState("")
  const [text, setText] = React.useState("")
  const [emailChecked, setEmailChecked] = React.useState(false)

  const handleToolbarButtonClick = () => {
    const { selection } = editor
    if (selection && !Range.isCollapsed(selection)) {
      let prevURL = ""
      const text = Editor.string(editor, selection)
      const linkNode = Editor.above(editor, nodeOptions)
      if (linkNode) {
        prevURL = linkNode[0].url as string
      }
      setURL(prevURL)
      setText(text)
    } else {
      setURL("")
      setText("")
    }
    setLinkModalOpen(true)
  }

  const handleAddButtonClick = () => {
    setLinkModalOpen(false)
    insertLink(editor, url, text)
  }

  return (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="link-button"
        onClick={handleToolbarButtonClick}>
        {icon}
      </IconButton>
      <LinkDialog
        handleClick={handleAddButtonClick}
        linkModalOpen={linkModalOpen}
        setLinkModalOpen={setLinkModalOpen}
        url={url}
        setURL={setURL}
        text={text}
        setText={setText}
        emailChecked={emailChecked}
        setEmailChecked={setEmailChecked}
      />
    </React.Fragment>
  )
}

export default LinkButton
