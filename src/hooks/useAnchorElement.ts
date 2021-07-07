import React from "react"

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
    handleMouseDown,
    handleClose,
  }
}

export default useAnchorElement
