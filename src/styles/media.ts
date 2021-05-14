import { makeStyles } from "@material-ui/core/styles"

type StyleProps = {
  align: string | unknown
  selected: boolean
  focused: boolean
}

const useStyles = makeStyles(() => ({
  container: (props: StyleProps) => ({
    textAlign: props.align,
    display: "block",
  }),
  media: (props: StyleProps) => ({
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: props.selected && props.focused ? "0 0 0 3px #B4D5FF" : "none",
  }),
}))

export default useStyles
