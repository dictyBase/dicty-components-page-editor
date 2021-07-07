const types = {
  // marks
  bold: "bold",
  italic: "italic",
  underline: "underline",
  strikethrough: "strikethrough",
  subscript: "subscript",
  superscript: "superscript",
  // inline
  link: "link",
  // blocks
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  divider: "divider",
  lineSpacing: "lineSpacing",
  image: "image",
  video: "video",
  orderedList: "orderedList",
  unorderedList: "unorderedList",
  listItem: "listItem",
  indentDecrease: "indentDecrease",
  indentIncrease: "indentIncrease",
  tableWrap: "tableWrap",
  table: "table",
  tableRow: "tableRow",
  tableColumn: "tableColumn",
  tableCell: "tableCell",
  tableDelete: "tableDelete",
  tableRowDelete: "tableRowDelete",
  tableColumnDelete: "tableColumnDelete",
}

const alignments = {
  left: "left",
  center: "center",
  right: "right",
  justify: "justify",
}

const attributes = {
  borderColor: "borderColor",
  fontColor: "fontColor",
}

export { types, alignments, attributes }
