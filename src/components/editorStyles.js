const styles = (theme) => ({
  editor: {
    lineHeight: 1.6,
    color: "rgba(0, 0, 0, 0.87)",

    "& p": {
      margin: 0,
      padding: 0,
    },

    "& a": {
      color: "#004080",
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
    display: "flex",
    justifyContent: "right",
  },
  saveButton: {
    minWidth: "50px",
    width: "100%",
    backgroundColor: "#15317e",
  },
  cancelButton: {
    minWidth: "50px",
    width: "100%",
    marginRight: "6px",
  },
})

export default styles
