import React from "react"
import { PageEditor } from "dicty-components-page-editor"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"

const App = () => (
  <Container>
    <Box height="500px" border="1px solid #ddd">
      <PageEditor />
    </Box>
  </Container>
)

export default App
