const styles = theme => ({
  toolbar: {
    position: "sticky",
    top: 0,
    padding: "10px 0px 10px",
    borderBottom: "2px solid #d1d5da",
    backgroundColor: "#ccd9ff",
    cursor: "default",
  },
  fontSizeDropdown: {
    margin: theme.spacing.unit,
    minWidth: 100,
  },
  fontFamilyDropdown: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  colorPicker: {
    position: "absolute",
    zIndex: "100",
    borderRadius: "5px",
  },
  largeIcon: {
    height: "35px",
    width: "40px",
  },
  button: {
    textTransform: "none",
    paddingLeft: "2px",
    paddingRight: "6px",
  },
  tableButtons: {
    border: "1px solid #bcbcbc",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "space-between",
    padding: "1px",
  },
  saveButton: {
    marginTop: "5px",
    width: "100%",
    backgroundColor: "#15317e",
  },
  separator: {
    borderLeftColor: "#c1c1c1",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    display: "inline-block",
    height: "20px",
    verticalAlign: "middle",
  },
  basicButton: {
    backgroundColor: "#15317e",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "50.66%",
    height: "0",
  },
  iframe: {
    position: "absolute",
    top: "0px",
    left: "0px",
  },
})

export default styles
