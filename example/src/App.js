import React from "react"
import { PageEditor } from "dicty-components-page-editor"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        fontFamily: "Roboto",
        fontSize: "inherit",
        fontColor: "rgba(0, 0, 0, 0.87)",
        text: "",
      },
    ],
  },
]

const App = () => {
  const handleSave = () => {
    console.log("clicked save button")
  }

  const handleCancel = () => {
    console.log("clicked cancel button")
  }

  return (
    <Container>
      <Box height="500px" border="1px solid #ddd">
        <PageEditor
          handleSave={handleSave}
          handleCancel={handleCancel}
          pageContent={JSON.stringify(initialValue)}
          readOnly={false}
        />
      </Box>
    </Container>
  )
}

export default App
