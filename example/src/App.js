import React from "react"
import { PageEditor } from "dicty-components-page-editor"

const App = () => {
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

export default App
