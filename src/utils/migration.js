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
        url: node.data["url"],
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
      convertedType = "h1"
      break
    case "heading_two":
      convertedType = "h2"
      break
    case "heading_three":
      convertedType = "h3"
      break
    case "heading_four":
      convertedType = "h4"
      break
    case "heading_five":
      convertedType = "h5"
      break
    case "heading_six":
      convertedType = "h6"
      break
    case "line-spacing":
      convertedType = "lineSpacing"
      break
    case "ordered-list" | "ordered_list" | "ol_list":
      convertedType = "orderedList"
      break
    case "unordered-list" | "unordered_list" | "ul_list":
      convertedType = "unorderedList"
      break
    case "list-item" | "list_item" | "list-item-child":
      convertedType = "listItem"
      break
    case "table":
      convertedType = "tableWrap"
      break
    case "table-row":
      convertedType = "tableRow"
      break
    case "table-cell":
      convertedType = "tableCell"
      break
    default:
      convertedType = type
  }
  return convertedType
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
      // otherwise add the new value in its existing object form
      return [...acc, nodes]
    }, [])
  }
  // else include mandatory object with text property
  return [{ text: "" }]
}

const alignmentTypes = [
  "alignment",
  "align_left",
  "align_center",
  "align_right",
  "align_justify",
]

const convertNode = (node) => {
  const { type } = node
  if (type) {
    // remove any alignment wrappers from old structure;
    // previously, changing the alignment would add a new <div> around the selection
    if (alignmentTypes.includes(type)) {
      const element = {
        ...convertChildren(node)[0],
        ...convertData(node),
      }
      if (type !== "alignment") {
        element["type"] = "div"
      }
      return element
    }

    return {
      type: convertType(type),
      children: convertChildren(node),
      ...convertData(node),
    }
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
    // return object with text and list of marks with appropriate values
    return {
      text,
      ...marks.reduce((acc, mark) => {
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
      }, {}),
    }
  }

  // if no leaves or marks then just return plain text
  return {
    text,
  }
}

const convertSlate047 = (object) => {
  const { nodes } = object.document

  return nodes.map(convertNode)
}

export default convertSlate047
