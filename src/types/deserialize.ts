type DeserializeElement = {
  [key: string]: (el: HTMLElement) =>
    | {
        type: string
        [key: string]: any
      }
    | undefined
}

type DeserializeLeafValue = {
  [key: string]: (el: HTMLElement) =>
    | {
        [key: string]: any
      }
    | undefined
}

type DeserializeLeaf = {
  [key: string]: DeserializeLeafValue
}

type DeserializeHTML = {
  element?: DeserializeElement
  leaf?: DeserializeLeaf
}

export {
  DeserializeElement,
  DeserializeLeafValue,
  DeserializeLeaf,
  DeserializeHTML,
}
