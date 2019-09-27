// @flow
import React from "react"
import { ImageButton } from "../../plugins/image"
import { LinkButton } from "../../plugins/link"
import { InsertInitialTableButton } from "../../plugins/table"
import { VideoButton } from "../../plugins/video"
import { ToolbarProps } from "../../flow/types"

const FeatureButtons = (props: ToolbarProps) => {
  const { showTableOptions, setShowTableOptions } = props

  return (
    <>
      <LinkButton {...props} />
      <InsertInitialTableButton
        showTableOptions={showTableOptions}
        setShowTableOptions={setShowTableOptions}
        {...props}
        onClick={() => {
          setShowTableOptions(true)
        }}
      />
      <ImageButton {...props} />
      <VideoButton {...props} />
    </>
  )
}

export default FeatureButtons
