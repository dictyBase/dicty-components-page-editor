import React, { MouseEvent } from "react"
import { Editor, Transforms, Range, Node, Element as SlateElement } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import LinkDialog from "../modals/LinkDialog"
import { types } from "../../constants/types"

// this config looks for a match of the link type
const nodeOptions = {
  match: (n: Node) =>
    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === types.link,
}

const isLinkActive = (editor: Editor) => {
  const nodeGenerator = Editor.nodes(editor, nodeOptions)
  // run the generator to find the nearest match
  const node = nodeGenerator.next()
  // if it finds a match then return true to indicate the link is currently
  // active
  while (!node.done) {
    console.log(node)
    return true
  }
  // if it doesn't find a match, then the generator has yielded its last value
  // meaning that it did not find a match for this type
  return false
}

// unwrap the link from the current selection
const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, nodeOptions)
}

// wrapLink has all of the logic for wrapping a given selection with
// an inline link node
const wrapLink = (editor: Editor, url: string) => {
  // first, if the selection is already a link then we want to unwrap it;
  // this prevents nested links
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  // add variable to determine if the given selection is collapsed;
  // this means that the user does not have any text actively selected
  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  // define the link data structure
  // if it is collapsed then we add the url as the text portion of the link
  const link = {
    type: types.link,
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    // if there isn't a range selected, insert a new node
    Transforms.insertNodes(editor, link)
  } else {
    // otherwise wrap the node with the link data
    // split is necessary to only wrap the selection and not the entire block
    Transforms.wrapNodes(editor, link, { split: true })
    // and collapse the selection to the end of the node
    Transforms.collapse(editor, { edge: "end" })
  }
}

const insertLink = (editor: Editor, url: string) => {
  // only insert a link if there is a selection in the editor
  if (editor.selection) {
    wrapLink(editor, url)
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
  const [emailChecked, setEmailChecked] = React.useState(false)

  const handleToolbarButtonClick = () => {
    // if expanded...
    const { selection } = editor
    if (selection && !Range.isCollapsed(selection)) {
      const nodeGenerator = Editor.nodes(editor, nodeOptions)
      const node = nodeGenerator.next()
      if (node.value && node.value[0].url !== undefined) {
        setURL(node.value[0].url)
      } else {
        setURL("")
      }

      insertLink(editor, url)
      setText("")
      setLinkModalOpen(true)
    } else {
      setURL("")
      setText("")
      setLinkModalOpen(true)
    }
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setLinkModalOpen(false)
    insertLink(editor, url)
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
        handleClick={handleClick}
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
