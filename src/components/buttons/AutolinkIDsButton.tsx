import React from "react"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import useAnchorElement from "../../hooks/useAnchorElement"
import { getLinkSelection, upsertLink } from "../../utils/links"

const ids = {
  pubmed: "PubMed",
  go: "GO",
  gene: "Gene",
  strain: "Strain",
  plasmid: "Plasmid",
}

const idList = [ids.pubmed, ids.go, ids.gene, ids.strain, ids.plasmid]

const getURLPrefix = (item: string) => {
  let prefix = ""
  switch (item) {
    case ids.pubmed:
      prefix = "/publication/"
      break
    case ids.go:
      prefix = "https://www.ebi.ac.uk/QuickGO/term/"
      break
    case ids.gene:
      prefix = "/gene/"
      break
    case ids.strain:
      prefix = "/stockcenter/strains/"
      break
    case ids.plasmid:
      prefix = "/stockcenter/plasmids/"
      break
    default:
      return prefix
  }
  return prefix
}

const validateText = (item: string, text: string) => {
  let valid = false
  switch (item) {
    case ids.pubmed:
      // check if only numbers
      valid = /^\d+$/.test(text)
      break
    case ids.go:
      valid = /GO:[0-9]+/.test(text)
      break
    case ids.gene:
      valid = true
      break
    case ids.strain:
      valid = /DBS[0-9]+/.test(text)
      break
    case ids.plasmid:
      valid = /DBP[0-9]+/.test(text)
      break
    default:
      return valid
  }
  return valid
}

/**
 * AutolinkIDsButton displays a button and dropdown for IDs that can be autolinked.
 */
const AutolinkIDsButton = () => {
  const editor = useSlate()
  const { anchorEl, setAnchorEl, handleMouseDown } = useAnchorElement()

  const handleItemClick = (item: string) => {
    let link = getLinkSelection(editor)
    const prefix = getURLPrefix(item)
    // if the selected text is not a valid ID then throw error
    if (!validateText(item, link.text)) {
      alert(`${link.text} is not a valid ID for ${item}`)
      setAnchorEl(null)
      return
    }
    // if selected link URL doesn't have a prefix then add it
    if (!link.url.includes(prefix)) {
      link.url = `${prefix}${link.text}`
    }

    upsertLink(editor, link)
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Tooltip title="autolinked IDs">
        <IconButton
          size="small"
          aria-label="autolinked IDs"
          aria-haspopup="true"
          onMouseDown={handleMouseDown}>
          ID
        </IconButton>
      </Tooltip>
      <Menu
        id="autolinked-ids-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        MenuListProps={{ disablePadding: true }}
        onClose={() => setAnchorEl(null)}>
        {idList.map((item: string, index: number) => {
          return (
            <MenuItem key={index} onClick={() => handleItemClick(item)}>
              {item}
            </MenuItem>
          )
        })}
      </Menu>
    </React.Fragment>
  )
}

export { ids, getURLPrefix, validateText }
export default AutolinkIDsButton
