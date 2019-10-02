import React from "react"
import { PageEditor } from "dicty-components-page-editor"

const App = () => {
  return (
    <div style={{ width: "75%", margin: "0 auto", border: "1px solid #ddd", paddingBottom: "5px" }}>
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

export default App
