// @flow
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import LinkIcon from "@material-ui/icons/Link"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

/**
 * Functions to set the link blocks.
 */
const wrapLink = (editor, url) => {
  editor
    .wrapInline({
      type: "link",
      data: { href: url },
    })
    .moveToEnd()
}

// used for pasting links on top of text
const insertLink = (editor: Object, url: string) => {
  if (editor.value.selection.isCollapsed) {
    editor
      .insertText(url)
      .moveFocusForward(0 - url.length)
      .command(wrapLink, url)
      .moveToEnd()
  } else {
    editor.command(wrapLink, url)
  }
}

const insertLinkStrategy = (editor: Object, data: Object) => {
  const { value } = editor
  let url = data.url
  const text = data.text

  // if user left in "mailto:", remove it
  if (url.includes("mailto:")) {
    url = url.replace("mailto:", "")
  }

  // if the email box is checked, make it an email link
  if (data.emailChecked) {
    url = `mailto:${url}`
  }

  if (value.selection.isExpanded) {
    editor
      .unwrapInline("link")
      .insertText(text)
      .moveFocusForward(0 - text.length)
      .command(wrapLink, url)
  } else {
    if (!url || !text) {
      return
    } else {
      editor
        .insertText(text)
        .moveFocusForward(0 - text.length)
        .command(wrapLink, url)
    }
  }

  return editor
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const LinkNode = ({ attributes, children, node: { data } }: NodeProps) => (
  <a href={data.get("href")} {...attributes}>
    {children}
  </a>
)

const useStyles = makeStyles({
  basicButton: {
    backgroundColor: "#15317e",
  },
})

/**
 * Button components that use click handlers to connect to the editor.
 */
const LinkButton = ({ editor }: ButtonProps) => {
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [url, setURL] = useState("")
  const [text, setText] = useState("")
  const [emailChecked, setEmailChecked] = useState(false)

  const classes = useStyles()

  const data = {
    url,
    text,
    emailChecked,
  }

  const handleToolbarButtonLink = () => {
    if (editor && editor.value.selection.isExpanded) {
      let existingURL = editor.value.inlines.find(el => el.data.get("href"))
      let defaultURL
      if (existingURL !== undefined) {
        defaultURL = existingURL.data.get("href")
      } else {
        defaultURL = ""
      }
      setLinkModalOpen(true)
      setURL(defaultURL)
      setText(editor.value.fragment.text)
    } else {
      setURL("")
      setText("")
      setLinkModalOpen(true)
    }
  }

  const handleAddButtonClick = () => {
    setLinkModalOpen(false)
    insertLinkStrategy(editor, data)
  }

  if (!linkModalOpen) {
    return (
      <Tooltip title="Link" placement="bottom">
        <ToolbarButton onClick={handleToolbarButtonLink}>
          <LinkIcon />
        </ToolbarButton>
      </Tooltip>
    )
  }

  return (
    <>
      <Tooltip title="Link" placement="bottom">
        <ToolbarButton onClick={handleToolbarButtonLink}>
          <LinkIcon />
        </ToolbarButton>
      </Tooltip>
      <Dialog
        open={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        aria-labelledby="link-dialog-title">
        <DialogTitle id="link-dialog-title">Link Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label={emailChecked ? "Email Address" : "URL"}
            type="url"
            defaultValue={url}
            onChange={e => setURL(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="text"
            label="Text"
            type="text"
            defaultValue={text ? text : ""}
            onChange={e => setText(e.target.value)}
            fullWidth
          />
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={emailChecked}
                  onChange={() => setEmailChecked(!emailChecked)}
                  value="email"
                />
              }
              label="Is this an email link?"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddButtonClick}
            className={classes.basicButton}
            variant="contained"
            color="primary">
            Add Link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

/**
 * Export everything needed for the editor.
 */
export { LinkNode, LinkButton, insertLink }
