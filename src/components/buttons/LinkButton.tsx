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

/**
 * upsertLink updates or adds a new link. If there is no selection,
 * it adds a new link with the provided text. Otherwise it will wrap the
 * selection with a link node using the user's link and text.
 */
const upsertLink = (editor: Editor, url: string, text: string) => {
  const link = {
    type: types.link,
    url,
    children: [{ text: text }],
  }
  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Editor.insertText(editor, text)
    Transforms.collapse(editor, { edge: "end" })
  }
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

  const handleToolbarButtonClick = () => {
    const { selection } = editor
    // if there is a current selection then pull the text and URL from it
    // and update state accordingly
    if (selection && !Range.isCollapsed(selection)) {
      let prevURL = ""
      const selectedText = Editor.string(editor, selection)
      const linkNode = Editor.above(editor, nodeOptions)
      if (linkNode) {
        prevURL = linkNode[0].url as string
      }
      setURL(prevURL)
      setText(selectedText)
    } else {
      setURL("")
      setText("")
    }
    setLinkModalOpen(true)
  }

  const handleAddButtonClick = () => {
    // check if there is an existing link first then unwrap it
    if (isLinkActive(editor)) {
      unwrapLink(editor)
    }
    upsertLink(editor, url, text)
    setLinkModalOpen(false)
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
      />
    </React.Fragment>
  )
}

export default LinkButton
