import { makeStyles } from "@material-ui/core/styles"

type StyleProps = {
  active: boolean | unknown
}

const useStyles = makeStyles(() => ({
  button: (props?: StyleProps) => ({
    color: props?.active ? "#000" : "rgba(0, 0, 0, 0.54)",
  }),
}))

export default useStyles
