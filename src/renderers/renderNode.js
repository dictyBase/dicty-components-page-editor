// @flow
import React from "react"
import { AlignmentNode } from "../plugins/alignment"
import { DividerNode } from "../plugins/divider"
import { HeaderNode } from "../plugins/heading"
import { ImageNode } from "../plugins/image"
import { LineSpacingNode } from "../plugins/linespacing"
import { LinkNode } from "../plugins/link"
import {
  ListItemNode,
  OrderedListNode,
  UnorderedListNode,
} from "../plugins/list"
import { TableNode, TableRowNode, TableCellNode } from "../plugins/table"
import { VideoNode } from "../plugins/video"

type nodeProps = {
  node: Object,
  attributes: Object,
  children: any,
}

const renderNode = (props: nodeProps, editor: Object, next: Function) => {
  const { node } = props

  switch (node.type) {
    case "alignment":
      return <AlignmentNode {...props} />
    case "divider":
      return <DividerNode {...props} />
    case "h1":
      return <HeaderNode variant="h3" {...props} />
    case "h2":
      return <HeaderNode variant="h4" {...props} />
    case "h3":
      return <HeaderNode variant="h5" {...props} />
    case "image":
      return <ImageNode {...props} />
    case "line-spacing":
      return <LineSpacingNode {...props} />
    case "link":
      return <LinkNode {...props} />
    case "list-item":
      return <ListItemNode {...props} />
    case "unordered-list":
      return <UnorderedListNode {...props} />
    case "ordered-list":
      return <OrderedListNode {...props} />
    case "table":
      return <TableNode {...props} />
    case "table-row":
      return <TableRowNode {...props} />
    case "table-cell":
      return <TableCellNode {...props} />
    case "video":
      return <VideoNode {...props} />
    default:
      return next()
  }
}

export default renderNode
