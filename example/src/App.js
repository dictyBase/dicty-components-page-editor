import React from "react"
import { PageEditor } from "dicty-components-page-editor"
import Grid from "@material-ui/core/Grid"

const App = () => (
  <>
    <Grid
      container
      style={{
        width: "75%",
        margin: "0 auto",
        border: "1px solid #ddd",
        paddingBottom: "5px",
      }}>
      <Grid item>
        <PageEditor
          newPage
          // pageContent={data}
          onCancel={() => {}}
          onSave={() => {}}
          readOnly={false}
        />
      </Grid>
    </Grid>
    <Grid container justify="center" style={{ marginTop: "25px" }}>
      <Grid item xs={2}>
        <PageEditor
          newPage
          onCancel={() => {}}
          onSave={() => {}}
          readOnly={false}
          inline
        />
      </Grid>
    </Grid>
  </>
)

export default App
