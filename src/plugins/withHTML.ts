import { Editor, Transforms } from "slate"
import deserialize from "../utils/deserialize"

/**
 * withHTML parses HTML content and converts to Slate JSON
 */
const withHTML = (editor: Editor) => {
  const { insertData } = editor

  editor.insertData = (data) => {
    const html = data.getData("text/html")

    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html")
      const fragment = deserialize(parsed.body)
      Transforms.insertFragment(editor, fragment)
      return
    }

    insertData(data)
  }

  return editor
}

export default withHTML
