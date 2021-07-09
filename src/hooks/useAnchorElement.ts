import React from "react"

// useAnchorElement contains state logic and associated functions for components
// requiring an anchor element (i.e. dropdown menus, popovers)
const useAnchorElement = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      setAnchorEl(null)
    }
  }

  return {
    anchorEl,
    setAnchorEl,
    handleMouseDown,
    handleClose,
  }
}

export default useAnchorElement
