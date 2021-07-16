import { types } from "../constants/types"

// the two font arrays are taken from the old page editor and used to convert old data
const FontFamilyList = [
  { name: "Lato" },
  { name: "Merriweather" },
  { name: "Montserrat" },
  { name: "Roboto" },
  { name: "Roboto Condensed" },
  { name: "Roboto Mono" },
  { name: "Roboto Slab" },
]

const FontSizeList = [
  { size: "12px" },
  { size: "14px" },
  { size: "16px" },
  { size: "18px" },
  { size: "20px" },
  { size: "22px" },
  { size: "26px" },
  { size: "30px" },
]

/**
 * convertData receives a node object and converts its nested
 * 'data' object into the new Slate format.
 */
const convertData = (node) => {
  const { type } = node
  switch (type) {
    case "alignment":
      return {
        align: node.data["align"],
      }
    case "image":
      return {
        url: node.data["src"],
        description: node.data["description"],
        height: node.data["height"],
        width: node.data["width"],
      }
    case "line-spacing":
      return {
        lineSpacing: node.data["size"],
      }
    case "link":
      return {
        url: node.data["href"],
      }
    case "video":
      return {
        url: node.data["src"],
        height: node.data["height"],
        width: node.data["width"],
      }
    default:
      return {}
  }
}

/**
 * convertType converts an existing 'type' property into the 'type'
 * used by the new version of the editor.
 */
const convertType = (type) => {
  let convertedType = ""
  switch (type) {
    case "heading_one":
    case "heading-one":
    case "heading_1":
      convertedType = types.h1
      break
    case "heading_two":
    case "heading-two":
    case "heading_2":
      convertedType = types.h2
      break
    case "heading_three":
    case "heading-three":
    case "heading_3":
      convertedType = types.h3
      break
    // h4-h6 not used in new editor
    case "heading_four":
    case "heading-four":
    case "heading_4":
      convertedType = types.h3
      break
    case "heading_five":
    case "heading-five":
    case "heading_5":
      convertedType = types.h3
      break
    case "heading_six":
    case "heading-six":
    case "heading_6":
      convertedType = types.h3
      break
    case "line-spacing":
      convertedType = types.lineSpacing
      break
    case "ordered-list":
    case "ordered_list":
    case "ol_list":
      convertedType = types.orderedList
      break
    case "unordered-list":
    case "unordered_list":
    case "ul_list":
      convertedType = types.unorderedList
      break
    case "list-item":
    case "list_item":
    case "list-item-child":
      convertedType = types.listItem
      break
    case "table":
      convertedType = types.tableWrap
      break
    case "table-row":
      convertedType = types.tableRow
      break
    case "table-cell":
      convertedType = types.tableCell
      break
    case "body1":
      convertedType = "paragraph"
      break
    case "align_center":
    case "align_left":
    case "align_right":
    case "align_center":
      convertedType = "div"
      break
    default:
      convertedType = type
  }
  return convertedType
}

const alignmentTypes = [
  "alignment",
  "align_left",
  "align_center",
  "align_right",
  "align_justify",
]

const marksReducer = (acc, mark) => {
  if (mark.type === "font-color") {
    return {
      ...acc,
      fontColor: mark.data.color,
    }
  }
  if (mark.type === "font-family") {
    return {
      ...acc,
      fontFamily: FontFamilyList[mark.data.fontFamilyIndex].name,
    }
  }
  if (mark.type === "font-size") {
    return {
      ...acc,
      fontSize: FontSizeList[mark.data.fontSizeIndex].size,
    }
  }

  return {
    ...acc,
    [mark.type]: true,
  }
}

const convertChildren = (node) => {
  // if there are nodes then convert the children
  if (node.nodes) {
    return node.nodes.reduce((acc, val) => {
      const nodes = convertNode(val)
      // if the converted current value is an array, only grab the object inside of it
      if (Array.isArray(nodes)) {
        return [...acc, ...nodes]
      }
      if (nodes.type === "div") {
        return [...acc, ...nodes.children]
      }
      // otherwise add the new value in its existing object form
      return [...acc, nodes]
    }, [])
  }
  // otherwise include mandatory object with text property
  return [{ text: "" }]
}

const convertDataByType = (node) => {
  const { type } = node
  // remove any alignment wrappers from old structure;
  // previously, changing the alignment would add a new <div> around the selection
  if (alignmentTypes.includes(type)) {
    if (type !== "alignment") {
      return [...convertChildren(node), convertData(node)].flat(2)
    }
    const element = {
      type: "div",
      children: convertChildren(node),
      ...convertData(node),
    }
    return element
  }

  if (type === "div") {
    return {
      ...convertChildren(node),
      ...convertData(node),
    }
  }

  return {
    type: convertType(type),
    children: convertChildren(node),
    ...convertData(node),
  }
}

const convertNode = (node) => {
  const { type } = node
  if (type) {
    return convertDataByType(node)
  }

  const { text, marks, leaves } = node

  /**
   * Leaves is an array containing leaf objects of this structure:
   * {
   *  object: "leaf",
   *  text: "george costanza",
   *  marks: [
   *    {
   *      object: "mark",
   *      type: "italic",
   *      data: {}
   *    }
   *  ]
   * }
   *
   * Each leaf node needs to be converted recursively.
   */
  if (leaves) {
    return [...leaves.map(convertNode)]
  }

  /**
    Example node to check for:
      {
        object: "leaf",
        text: "periodically",
        marks: [
          {
            object: "mark",
            type: "italic",
            data: {},
          },
        ],
      }
    
  */
  if (marks && marks.length > 0) {
    const allMarks = marks.reduce(marksReducer, {})
    // return object with text and list of marks with appropriate values
    return {
      text,
      ...allMarks,
      fontColor: allMarks.fontColor || "inherit",
      fontSize: allMarks.fontSize || "inherit",
      fontFamily: allMarks.fontSize || "inherit",
    }
  }

  // if no leaves or marks then just return plain text
  return {
    text,
    fontColor: "inherit",
    fontSize: "inherit",
    fontFamily: "inherit",
  }
}

// remove empty objects from array
const removeEmptyObjects = (arr) => {
  return arr.filter((item) => {
    return Object.keys(item).length > 0
  })
}

const convertSlate047 = (object) => {
  const { nodes } = object.document
  let newNodes = []
  const convertedNodes = nodes.map(convertNode)
  if (Array.isArray(convertedNodes[0])) {
    newNodes = removeEmptyObjects(convertedNodes[0])
  } else {
    newNodes = removeEmptyObjects(convertedNodes)
  }
  return newNodes.flat()
}

export default convertSlate047
