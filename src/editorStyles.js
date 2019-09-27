const styles = theme => ({
  editor: {
    padding: "15px",
    minHeight: "200px",
    minWidth: "800px",
    lineHeight: 1.6,
    color: "rgba(0, 0, 0, 0.87)",

    "& a": {
      color: "#428bca",
      textDecoration: "none",
    },

    "& table": {
      width: "100%",
      borderCollapse: "collapse",
      borderTop: "1px solid #ccc",
    },

    "& table tr": {
      border: "none",
      borderBottom: "1px solid #ccc",
      borderRight: "1px solid #ccc",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
    },

    "& table td": {
      padding: "0.4rem 1.4rem 0.4rem 0.8rem",
      border: "1px solid #ccc",
      borderTop: "none",
      borderBottom: "none",
      borderRight: "none",
      flex: 1,
      position: "relative",
    },

    "& table td p": {
      margin: 0,
    },
  },
  icon: {
    height: "15px",
    width: "15px",
    marginRight: "5px",
  },
  buttonGrid: {
    marginRight: "8px",
    marginTop: "8px",
  },
  editButton: {
    padding: "1px",
    color: "#3f51b5",
    textTransform: "none",
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#15317e",
  },
  cancelButton: {
    width: "100%",
  },
})

export default styles
