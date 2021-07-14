import React from "react"
import { PageEditor } from "dicty-components-page-editor"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: "70px",
    textTransform: "none",
    marginRight: theme.spacing(1),
  },
}))

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
  const classes = useStyles()

  const handleSave = () => {
    console.log("clicked save button")
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
        <Box mt={5} mb={1} display="flex" justifyContent="flex-end">
          <Button
            className={classes.button}
            size="large"
            variant="contained"
            color="default"
            onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className={classes.button}
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default App
