import React from "react"
import { useSlate } from "slate-react"
import { upsertLink } from "../utils/links"

// useLinks is a hook for internal link state logic.
const useLinks = () => {
  const editor = useSlate()
  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false)
  const [link, setLink] = React.useState({
    url: "",
    text: "",
  })

  const handleAddLink = () => {
    upsertLink(editor, link)
    setLinkDialogOpen(false)
  }

  return {
    link,
    setLink,
    linkDialogOpen,
    setLinkDialogOpen,
    handleAddLink,
  }
}

export default useLinks
