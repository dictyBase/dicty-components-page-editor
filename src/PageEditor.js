import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "A line of text in a paragraph.",
          },
        ],
      },
    ],
  },
})

export default class PageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: initialValue,
    }
  }

  onChange({ value }) {
    this.setState({ value })
  }

  render() {
    return (
      <Editor
        placeholder="Enter some text..."
        onChange={change => this.onChange(change)}
        value={this.state.value}
      />
    )
  }
}
