import React, { Component } from "react"
import { PageEditor } from "dicty-components-page-editor"
import data from "./data.json"
export default class App extends Component {
  render() {
    return (
      <div>
        <PageEditor
          newPage
          // pageContent={data}
          onCancel={() => {}}
          onSave={() => {}}
          readOnly={false}
        />
      </div>
    )
  }
}
