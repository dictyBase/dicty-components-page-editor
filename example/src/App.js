import React from "react"
import { PageEditor } from "dicty-components-page-editor"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import { Typography } from "@material-ui/core"

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        fontFamily: "Roboto",
        fontSize: "inherit",
        fontColor: "inherit",
        text: "",
      },
    ],
  },
]

const App = () => {
  const handleSave = (value) => {
    console.log("clicked save button")
    console.log("value is ", value)
  }

  const handleCancel = () => {
    console.log("clicked cancel button")
  }

  return (
    <Container>
      <Box border="1px solid #ddd">
        <PageEditor
          pageContent={JSON.stringify(initialValue)}
          readOnly={false}
        />
      </Box>
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Inline Toolbar Example
        </Typography>
        <PageEditor
          pageContent={JSON.stringify(initialValue)}
          readOnly={false}
          inline
        />
      </Box>
    </Container>
  )
}

export default App
