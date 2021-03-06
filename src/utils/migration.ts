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

type OldMark = {
  object: "mark"
  type: string
  data: {
    [key: string]: any
  }
}

/**
 * convertData receives a node object and converts its nested
 * 'data' object into the new Slate format.
 */
const convertData = (node: any) => {
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
const convertType = (type: string) => {
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

// marksReducer converts list of marks to a single object
const marksReducer = (acc: OldMark, mark: OldMark) => {
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

// convertChildren converts an old Slate nodes array into the new children format
const convertChildren = (node: any) => {
  // if there are nodes then convert the children
  if (node.nodes) {
    return node.nodes.reduce((acc: any, val: any) => {
      const nodes = convertNode(val)
      // if the converted current value is an array, only grab the object inside of it
      if (Array.isArray(nodes)) {
        return [...acc, ...nodes]
      }
      // if div type then just add its children
      if (nodes.type === "div") {
        return [...acc, ...nodes.children]
      }
      // otherwise add the new value in its existing object form
      return [...acc, nodes]
    }, [])
  }
  // else include mandatory object with text property
  return [{ text: "" }]
}

const convertAlignmentData = (node: any) => {
  const dataObj = convertData(node)
  const emptyObj = Object.keys(dataObj).length === 0
  if (node.type !== "alignment") {
    // if the data object is empty, return an empty array and flatten it;
    // this is done to remove any empty {} from the final array
    return [...convertChildren(node), emptyObj ? [] : dataObj].flat(2)
  }
  return {
    type: "div",
    children: convertChildren(node),
    ...dataObj,
  }
}

// convertDataByType converts the old node structure into the new format
const convertDataByType = (node: any) => {
  const { type } = node
  const dataObj = convertData(node)

  // remove any alignment wrappers from old structure;
  // previously, changing the alignment would add a new <div> around the selection
  if (alignmentTypes.includes(type)) {
    return convertAlignmentData(node)
  }

  // if a div type, don't include the type in the new object (unnecessary)
  if (type === "div") {
    return {
      ...convertChildren(node),
      ...dataObj,
    }
  }

  return {
    type: convertType(type),
    children: convertChildren(node),
    ...dataObj,
  }
}

// convertNode handles the entire conversion process by first checking for a `type` property,
// then checking for leaves and finally for marks
const convertNode = (node: any) => {
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

  // see above comment for example of marks structure
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

// flattenArr is used to prevent any objects like
// "0": {} to be in the array
const flattenArr = (arr: any[]) => {
  let newarr = [] as any[]
  arr.forEach((item) => {
    // check if the object is missing both mandatory fields
    if (!item.children && !item.text) {
      const values = Object.values(item)
      newarr.push(values)
    } else {
      newarr.push(item)
    }
  })
  return newarr
}

// convertSlate047 is used to convert a Slate 0.47 document to a Slate 0.5x document
const convertSlate047 = (object: any) => {
  const { nodes } = object.document
  let newNodes = []
  // run first conversion
  const convertedNodes = nodes.map(convertNode)
  // if it comes back as a nested array, grab the first element
  if (Array.isArray(convertedNodes[0])) {
    newNodes = convertedNodes[0]
  } else {
    newNodes = convertedNodes
  }
  // return flattened array
  newNodes = flattenArr(newNodes)
  return newNodes.flat()
}

export default convertSlate047
