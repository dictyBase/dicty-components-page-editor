import { makeStyles, Theme } from "@material-ui/core/styles"

type StyleProps = {
  active: boolean | unknown
}

const useStyles = makeStyles((theme: Theme) => ({
  button: (props?: StyleProps) => ({
    color: props?.active ? "#000" : "rgba(0, 0, 0, 0.54)",
  }),
  popper: {
    padding: theme.spacing(2),
  },
}))

export default useStyles
