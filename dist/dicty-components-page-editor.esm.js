import React, { useMemo, useState, useCallback } from 'react';
import { Editor, Transforms, Element as Element$1, Range, Path, Node, Point, createEditor } from 'slate';
import { useSlate, useSelected, useFocused, withReact, Slate, Editable } from 'slate-react';
import { withHistory } from 'slate-history';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import SvgIcon from '@material-ui/core/SvgIcon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Popper from '@material-ui/core/Popper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import '@fontsource/lato';
import '@fontsource/merriweather';
import '@fontsource/montserrat';
import '@fontsource/roboto';
import '@fontsource/roboto-condensed';
import '@fontsource/roboto-mono';
import '@fontsource/roboto-slab';
import { jsx } from 'slate-hyperscript';

var useStyles = /*#__PURE__*/makeStyles(function () {
  return {
    button: function button(props) {
      return {
        color: props != null && props.active ? "#000" : "rgba(0, 0, 0, 0.54)"
      };
    }
  };
});

/**
 * isMarkActive determines if the current text selection contains an
 * active mark
 */

var isMarkActive = function isMarkActive(editor, format) {
  // get a list of marks from the selected text
  var marks = Editor.marks(editor); // if there are marks for specified format then the mark is active

  if (marks && marks[format]) {
    return true;
  } else {
    return false;
  }
};
/**
 * toggleMark will either remove or add a mark to the given text selection
 */


var toggleMark = function toggleMark(editor, format) {
  // first find if the selection's mark is currently active
  var isActive = isMarkActive(editor, format); // we either want to add or remove a mark based on whether it is currently active

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
/**
 * MarkButton displays a button with associated click logic for toggling a mark.
 */


var MarkButton = function MarkButton(_ref) {
  var format = _ref.format,
      icon = _ref.icon;
  var editor = useSlate();
  var props = {
    active: isMarkActive(editor, format)
  };
  var classes = useStyles(props); // when button is clicked, toggle the mark within the editor

  var handleMouseDown = function handleMouseDown(event) {
    event.preventDefault();
    toggleMark(editor, format);
  };

  return React.createElement(Tooltip, {
    title: format
  }, React.createElement(IconButton, {
    className: classes.button,
    size: "small",
    "aria-label": "" + format,
    onMouseDown: handleMouseDown
  }, icon));
};

var types = {
  // marks
  bold: "bold",
  italic: "italic",
  underline: "underline",
  strikethrough: "strikethrough",
  subscript: "subscript",
  superscript: "superscript",
  // inline
  link: "link",
  // blocks
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  divider: "divider",
  lineSpacing: "lineSpacing",
  image: "image",
  video: "video",
  orderedList: "orderedList",
  unorderedList: "unorderedList",
  listItem: "listItem",
  indentDecrease: "indentDecrease",
  indentIncrease: "indentIncrease",
  tableWrap: "tableWrap",
  table: "table",
  tableRow: "tableRow",
  tableColumn: "tableColumn",
  tableCell: "tableCell",
  tableDelete: "tableDelete",
  tableRowDelete: "tableRowDelete",
  tableColumnDelete: "tableColumnDelete"
};
var alignments = {
  left: "left",
  center: "center",
  right: "right",
  justify: "justify"
};
var attributes = {
  borderColor: "borderColor",
  fontColor: "fontColor"
};

/**
 * isBlockActive determines if the current text selection contains an active block
 */

var isBlockActive = function isBlockActive(editor, property, value) {
  // convert nodes iterator to array and get first result
  var _Array$from = Array.from(Editor.nodes(editor, {
    match: function match(n) {
      return !Editor.isEditor(n) && Element$1.isElement(n) && n[property] === value;
    }
  })),
      match = _Array$from[0]; // return boolean to indicate if match was found


  return !!match;
};
/**
 * toggleBlock will set the appropriate nodes for the given selection
 */


var toggleBlock = function toggleBlock(editor, format) {
  // first find if the selected block is currently active
  var isActive = isBlockActive(editor, "type", format); // setNodes is used to set properties at the currently selected element.
  // If the block is active, then we want to toggle it back to the default
  // paragraph type. If the block is not active, we toggle the type to match it.

  Transforms.setNodes(editor, {
    type: isActive ? types.paragraph : format
  });
};

/**
 * BlockButton displays a button with associated click logic for toggling a
 * block.
 */

var BlockButton = function BlockButton(_ref) {
  var format = _ref.format,
      icon = _ref.icon,
      clickFn = _ref.clickFn;
  var editor = useSlate();
  var props = {
    active: isBlockActive(editor, "type", format)
  };
  var classes = useStyles(props); // when button is clicked, toggle the block within the editor

  var handleMouseDown = function handleMouseDown(event) {
    event.preventDefault();
    clickFn();
  };

  return React.createElement(Tooltip, {
    title: format
  }, React.createElement(IconButton, {
    className: classes.button,
    size: "small",
    "aria-label": format,
    // use onMouseDown to avoid editor selection becoming null
    // and losing cursor position
    onMouseDown: handleMouseDown
  }, icon));
};

var toggleAlign = function toggleAlign(editor, align) {
  var isActive = isBlockActive(editor, "align", align);
  Transforms.setNodes(editor, {
    align: isActive ? "left" : align
  });
};
/**
 * AlignButton displays a button with associated logic for adding the "align"
 * attribute.
 */


var AlignButton = function AlignButton(_ref) {
  var icon = _ref.icon,
      align = _ref.align;
  var editor = useSlate();
  var props = {
    active: isBlockActive(editor, "align", align)
  };
  var classes = useStyles(props);

  var handleMouseDown = function handleMouseDown(event) {
    event.preventDefault();
    toggleAlign(editor, align);
  };

  return React.createElement(Tooltip, {
    title: align
  }, React.createElement(IconButton, {
    className: classes.button,
    size: "small",
    "aria-label": "align-" + align,
    onMouseDown: handleMouseDown
  }, icon));
};

var useStyles$1 = /*#__PURE__*/makeStyles(function () {
  return {
    button: {
      textTransform: "none"
    }
  };
});

var LinkDialog = function LinkDialog(_ref) {
  var handleAddClick = _ref.handleAddClick,
      handleClose = _ref.handleClose,
      dialogOpen = _ref.dialogOpen,
      link = _ref.link,
      setLink = _ref.setLink;
  var classes = useStyles$1();
  return React.createElement(Dialog, {
    open: dialogOpen,
    onClose: handleClose,
    "aria-labelledby": "link-dialog-title"
  }, React.createElement(DialogTitle, {
    id: "link-dialog-title"
  }, "Link Details"), React.createElement(DialogContent, null, React.createElement(TextField, {
    autoFocus: true,
    margin: "dense",
    id: "url",
    label: "URL",
    type: "url",
    defaultValue: link.url,
    onChange: function onChange(e) {
      return setLink({
        url: e.target.value,
        text: link.text
      });
    },
    fullWidth: true
  }), React.createElement(TextField, {
    margin: "dense",
    id: "text",
    label: "Text",
    type: "text",
    defaultValue: link.text ? link.text : "",
    onChange: function onChange(e) {
      return setLink({
        text: e.target.value,
        url: link.url
      });
    },
    fullWidth: true
  })), React.createElement(DialogActions, null, React.createElement(Button, {
    className: classes.button,
    onClick: handleAddClick,
    variant: "contained",
    color: "primary"
  }, "Add Link")));
};

var linkNodeOptions = {
  match: function match(n) {
    return !Editor.isEditor(n) && Element$1.isElement(n) && n.type === types.link;
  }
};

var isLinkActive = function isLinkActive(editor) {
  var _Array$from = Array.from(Editor.nodes(editor, linkNodeOptions)),
      match = _Array$from[0];

  return !!match;
};
/**
 * upsertLink updates or adds a new link. If there is no selection,
 * it adds a new link with the provided text. Otherwise it will wrap the
 * selection with a link node using the user's link and text.
 */


var upsertLink = function upsertLink(editor, link) {
  var url = link.url,
      text = link.text; // check if there is an existing link first then unwrap it

  if (isLinkActive(editor)) {
    Transforms.unwrapNodes(editor, linkNodeOptions);
  }

  var linkData = {
    type: types.link,
    url: url,
    children: [{
      text: text
    }]
  };
  var selection = editor.selection;
  var isCollapsed = selection && Range.isCollapsed(selection);

  if (isCollapsed) {
    Transforms.insertNodes(editor, linkData);
  } else {
    Transforms.wrapNodes(editor, linkData, {
      split: true
    });
    Editor.insertText(editor, text);
    Transforms.collapse(editor, {
      edge: "end"
    });
  }
}; // getLinkSelection gets the current text and URL for the user's current selection.


var getLinkSelection = function getLinkSelection(editor) {
  var selection = editor.selection;
  var prevURL,
      selectedText = ""; // if there is a current selection then pull the text and URL from it
  // and update state accordingly

  if (selection && !Range.isCollapsed(selection)) {
    selectedText = Editor.string(editor, selection);

    var _Array$from2 = Array.from(Editor.nodes(editor, linkNodeOptions)),
        linkNode = _Array$from2[0];

    if (linkNode && Element$1.isElement(linkNode[0])) {
      prevURL = linkNode[0].url;
    }
  }

  return {
    url: prevURL || "",
    text: selectedText
  };
};

var useLinks = function useLinks() {
  var editor = useSlate();

  var _React$useState = React.useState(false),
      linkDialogOpen = _React$useState[0],
      setLinkDialogOpen = _React$useState[1];

  var _React$useState2 = React.useState({
    url: "",
    text: ""
  }),
      link = _React$useState2[0],
      setLink = _React$useState2[1];

  var handleAddLink = function handleAddLink() {
    upsertLink(editor, link);
    setLinkDialogOpen(false);
  };

  return {
    link: link,
    setLink: setLink,
    linkDialogOpen: linkDialogOpen,
    setLinkDialogOpen: setLinkDialogOpen,
    handleAddLink: handleAddLink
  };
};

// the deselect method unsets the editor selection

Transforms.deselect = function () {};
/**
 * LinkButton is a button specifically for adding links.
 */


var LinkButton = function LinkButton(_ref) {
  var icon = _ref.icon;
  var editor = useSlate();

  var _useLinks = useLinks(),
      link = _useLinks.link,
      setLink = _useLinks.setLink,
      linkDialogOpen = _useLinks.linkDialogOpen,
      setLinkDialogOpen = _useLinks.setLinkDialogOpen,
      handleAddLink = _useLinks.handleAddLink;

  var props = {
    active: isLinkActive(editor)
  };
  var classes = useStyles(props);

  var handleMouseDown = function handleMouseDown() {
    var link = getLinkSelection(editor);
    setLink(link);
    setLinkDialogOpen(true);
  }; // if the user has clicked away without adding the link then we don't need to do anything with their data


  var handleClose = function handleClose() {
    return setLinkDialogOpen(false);
  };

  return React.createElement(React.Fragment, null, React.createElement(Tooltip, {
    title: "link"
  }, React.createElement(IconButton, {
    className: classes.button,
    size: "small",
    "aria-label": "link",
    onMouseDown: handleMouseDown
  }, icon)), React.createElement(LinkDialog, {
    handleAddClick: handleAddLink,
    handleClose: handleClose,
    dialogOpen: linkDialogOpen,
    link: link,
    setLink: setLink
  }));
};

// requiring an anchor element (i.e. dropdown menus, popovers)

var useAnchorElement = function useAnchorElement() {
  var _React$useState = React.useState(null),
      anchorEl = _React$useState[0],
      setAnchorEl = _React$useState[1];

  var handleMouseDown = function handleMouseDown(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose(_, reason) {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      setAnchorEl(null);
    }
  };

  return {
    anchorEl: anchorEl,
    setAnchorEl: setAnchorEl,
    handleMouseDown: handleMouseDown,
    handleClose: handleClose
  };
};

var ids = {
  pubmed: "PubMed",
  go: "GO",
  gene: "Gene",
  strain: "Strain",
  plasmid: "Plasmid"
};
var idList = [ids.pubmed, ids.go, ids.gene, ids.strain, ids.plasmid];

var getURLPrefix = function getURLPrefix(item) {
  var prefix = "";

  switch (item) {
    case ids.pubmed:
      prefix = "/publication/";
      break;

    case ids.go:
      prefix = "https://www.ebi.ac.uk/QuickGO/term/";
      break;

    case ids.gene:
      prefix = "/gene/";
      break;

    case ids.strain:
      prefix = "/stockcenter/strains/";
      break;

    case ids.plasmid:
      prefix = "/stockcenter/plasmids/";
      break;

    default:
      return prefix;
  }

  return prefix;
};

var validateText = function validateText(item, text) {
  var valid = false;

  switch (item) {
    case ids.pubmed:
      // check if only numbers
      valid = /^\d+$/.test(text);
      break;

    case ids.go:
      valid = /GO:[0-9]+/.test(text);
      break;

    case ids.gene:
      valid = true;
      break;

    case ids.strain:
      valid = /DBS[0-9]+/.test(text);
      break;

    case ids.plasmid:
      valid = /DBP[0-9]+/.test(text);
      break;

    default:
      return valid;
  }

  return valid;
};
/**
 * AutolinkIDsButton displays a button and dropdown for IDs that can be autolinked.
 */


var AutolinkIDsButton = function AutolinkIDsButton() {
  var editor = useSlate();

  var _useAnchorElement = useAnchorElement(),
      anchorEl = _useAnchorElement.anchorEl,
      setAnchorEl = _useAnchorElement.setAnchorEl,
      handleMouseDown = _useAnchorElement.handleMouseDown;

  var handleItemClick = function handleItemClick(item) {
    var link = getLinkSelection(editor);
    var prefix = getURLPrefix(item); // if the selected text is not a valid ID then throw error

    if (!validateText(item, link.text)) {
      alert(link.text + " is not a valid ID for " + item);
      setAnchorEl(null);
      return;
    } // if selected link URL doesn't have a prefix then add it


    if (!link.url.includes(prefix)) {
      link.url = "" + prefix + link.text;
    }

    upsertLink(editor, link);
    setAnchorEl(null);
  };

  return React.createElement(React.Fragment, null, React.createElement(Tooltip, {
    title: "autolinked IDs"
  }, React.createElement(IconButton, {
    size: "small",
    "aria-label": "autolinked IDs",
    "aria-haspopup": "true",
    onMouseDown: handleMouseDown
  }, "ID")), React.createElement(Menu, {
    id: "autolinked-ids-menu",
    anchorEl: anchorEl,
    open: Boolean(anchorEl),
    MenuListProps: {
      disablePadding: true
    },
    onClose: function onClose() {
      return setAnchorEl(null);
    }
  }, idList.map(function (item, index) {
    return React.createElement(MenuItem, {
      key: index,
      onClick: function onClick() {
        return handleItemClick(item);
      }
    }, item);
  })));
};

var getPresetColors = function getPresetColors(theme) {
  var palette = theme.palette;
  return [palette.primary.main, palette.secondary.main, palette.error.main, palette.warning.main, palette.info.main, palette.success.main];
};

var useStyles$2 = /*#__PURE__*/makeStyles(function (theme) {
  return {
    buttonContainer: {
      display: "flex",
      flexDirection: "row"
    },
    button: {
      width: "24px",
      height: "24px",
      padding: "0px",
      margin: theme.spacing(0.5),
      cursor: "pointer"
    },
    input: {
      width: "90%",
      textTransform: "uppercase",
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      borderRadius: "4px"
    },
    popper: {
      padding: theme.spacing(2)
    }
  };
});
/**
 * ColorPicker handles the display of the color picker.
 */

var ColorPicker = function ColorPicker(_ref) {
  var handleChange = _ref.handleChange,
      activeColor = _ref.activeColor;
  var theme = useTheme();
  var classes = useStyles$2();
  var presetColors = getPresetColors(theme);
  return React.createElement("div", {
    className: classes.popper
  }, React.createElement(HexColorPicker, {
    color: activeColor,
    onChange: handleChange
  }), React.createElement(HexColorInput, {
    className: classes.input,
    color: activeColor,
    onChange: handleChange
  }), React.createElement("div", {
    className: classes.buttonContainer
  }, presetColors.map(function (color) {
    return React.createElement(IconButton, {
      key: color,
      className: classes.button,
      style: {
        backgroundColor: color
      },
      onClick: function onClick() {
        return handleChange(color);
      }
    });
  })));
};

// in the dropdown menu

var getMarkValue = function getMarkValue(value) {
  if (value === "inherit") {
    return "1rem";
  }

  return value;
}; // get the current mark for a given selection


var getCurrentMark = function getCurrentMark(editor, mark) {
  var marks = Editor.marks(editor);

  if (!marks || !marks[mark]) {
    return;
  }

  return getMarkValue(marks[mark]);
};

/**
 * FontColorButton displays a button with associated click logic for selecting
 * a font color.
 */

var FontColorButton = function FontColorButton(_ref) {
  var icon = _ref.icon;
  var editor = useSlate();

  var _useAnchorElement = useAnchorElement(),
      anchorEl = _useAnchorElement.anchorEl,
      handleClose = _useAnchorElement.handleClose,
      handleMouseDown = _useAnchorElement.handleMouseDown;

  var handleChange = function handleChange(value) {
    Editor.addMark(editor, attributes.fontColor, value);
  };

  var activeColor = getCurrentMark(editor, attributes.fontColor);
  return React.createElement(React.Fragment, null, React.createElement(Tooltip, {
    title: "font color"
  }, React.createElement(IconButton, {
    size: "small",
    "aria-label": "font color",
    "aria-haspopup": "true",
    onMouseDown: handleMouseDown
  }, icon)), React.createElement(Menu, {
    id: "font-color-menu",
    anchorEl: anchorEl,
    keepMounted: true,
    open: Boolean(anchorEl),
    MenuListProps: {
      disablePadding: true
    },
    onClose: handleClose
  }, React.createElement("div", null, React.createElement(ColorPicker, {
    handleChange: handleChange,
    activeColor: activeColor
  }))));
};

var CheckIcon = function CheckIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
  }));
};

var FontFamilyList = ["Lato", "Merriweather", "Montserrat", "Roboto", "Roboto Condensed", "Roboto Mono", "Roboto Slab"];
var FontSizeList = ["0.8rem", "0.9rem", "1rem", "1.1rem", "1.2rem", "1.3rem", "1.4rem", "1.5rem", "1.8rem", "2rem"];
var LineSpacingList = ["1.0", "1.2", "1.5", "2.0", "2.5", "3.0"];

var getParentNode = function getParentNode(editor) {
  if (!editor.selection) {
    return;
  } // need to get the parent path in order to get the parent node above this selection


  var currentPath = editor.selection.anchor.path;
  var parentPath = Path.parent(currentPath);
  var node = Node.get(editor, parentPath);
  return node;
};

var useStyles$3 = /*#__PURE__*/makeStyles(function () {
  return {
    menuItem: {
      display: "flex",
      justifyContent: "flex-end",
      width: "75px"
    },
    icon: {
      "&:hover": {
        backgroundColor: "transparent"
      }
    }
  };
});
/**
 * LineSpacingButton displays a button with associated click logic for selecting
 * line spacing.
 */

var LineSpacingButton = function LineSpacingButton(_ref) {
  var icon = _ref.icon;
  var editor = useSlate();
  var classes = useStyles$3();

  var _React$useState = React.useState(null),
      anchorEl = _React$useState[0],
      setAnchorEl = _React$useState[1];

  var handleItemClick = function handleItemClick(item) {
    Transforms.setNodes(editor, {
      type: types.lineSpacing,
      lineSpacing: item
    });
    setAnchorEl(null);
  };

  var handleMenuOpen = function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  };

  return React.createElement(React.Fragment, null, React.createElement(Tooltip, {
    title: "line spacing"
  }, React.createElement(IconButton, {
    size: "small",
    "aria-label": "line spacing",
    "aria-haspopup": "true",
    onMouseDown: handleMenuOpen
  }, icon)), React.createElement(Menu, {
    id: "line-spacing-menu",
    anchorEl: anchorEl,
    open: Boolean(anchorEl),
    MenuListProps: {
      disablePadding: true
    },
    onClose: function onClose() {
      return setAnchorEl(null);
    }
  }, LineSpacingList.map(function (item, index) {
    var parentNode = getParentNode(editor);
    var currentLineSpacing = Element$1.isElement(parentNode) && parentNode.lineSpacing || "1.5";
    return React.createElement(MenuItem, {
      key: index,
      onClick: function onClick() {
        return handleItemClick(item);
      },
      className: classes.menuItem
    }, React.createElement(IconButton, {
      size: "small",
      className: classes.icon
    }, currentLineSpacing === item && React.createElement(CheckIcon, null)), item);
  })));
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var ImageDialog = function ImageDialog(_ref) {
  var handleAddClick = _ref.handleAddClick,
      handleClose = _ref.handleClose,
      dialogOpen = _ref.dialogOpen,
      image = _ref.image,
      setImage = _ref.setImage;
  var classes = useStyles$1();

  var _React$useState = React.useState(false),
      checked = _React$useState[0],
      setChecked = _React$useState[1];

  var handleCheckboxChange = function handleCheckboxChange() {
    setChecked(!checked);
  };

  return React.createElement(Dialog, {
    open: dialogOpen,
    onClose: handleClose,
    "aria-labelledby": "image-dialog-title"
  }, React.createElement(DialogTitle, {
    id: "image-dialog-title"
  }, "Image Details"), React.createElement(DialogContent, null, React.createElement(TextField, {
    autoFocus: true,
    margin: "dense",
    id: "url",
    label: "URL",
    type: "url",
    onChange: function onChange(e) {
      return setImage(_extends({}, image, {
        url: e.target.value
      }));
    },
    fullWidth: true
  }), React.createElement(TextField, {
    margin: "dense",
    id: "description",
    label: "Description",
    type: "text",
    onChange: function onChange(e) {
      return setImage(_extends({}, image, {
        description: e.target.value
      }));
    },
    fullWidth: true
  }), React.createElement(TextField, {
    margin: "dense",
    id: "width",
    label: "Width (optional)",
    type: "number",
    onChange: function onChange(e) {
      return setImage(_extends({}, image, {
        width: Number(e.target.value)
      }));
    },
    fullWidth: true
  }), React.createElement(TextField, {
    margin: "dense",
    id: "height",
    label: "Height (optional)",
    type: "number",
    onChange: function onChange(e) {
      return setImage(_extends({}, image, {
        height: Number(e.target.value)
      }));
    },
    fullWidth: true
  }), React.createElement(FormControlLabel, {
    control: React.createElement(Checkbox, {
      checked: checked,
      onChange: handleCheckboxChange,
      color: "primary",
      name: "checkedA"
    }),
    label: "Is this a link?"
  }), checked && React.createElement(TextField, {
    margin: "dense",
    id: "link",
    label: "Link URL",
    type: "text",
    onChange: function onChange(e) {
      return setImage(_extends({}, image, {
        linkURL: e.target.value
      }));
    },
    fullWidth: true
  })), React.createElement(DialogActions, null, React.createElement(Button, {
    className: classes.button,
    onClick: handleAddClick,
    variant: "contained",
    color: "primary"
  }, "Add Image")));
};

// the deselect method unsets the editor selection

Transforms.deselect = function () {};

var insertImage = function insertImage(editor, image) {
  var url = image.url,
      description = image.description,
      width = image.width,
      height = image.height,
      linkURL = image.linkURL;
  var imageData = {
    type: types.image,
    url: url,
    description: description,
    width: width,
    height: height,
    linkURL: linkURL,
    children: [{
      text: ""
    }]
  };
  Transforms.insertNodes(editor, imageData);
};
/**
 * ImageButton is a button specifically for adding images.
 */


var ImageButton = function ImageButton(_ref) {
  var icon = _ref.icon;
  var editor = useSlate();

  var _React$useState = React.useState(false),
      imageDialogOpen = _React$useState[0],
      setImageDialogOpen = _React$useState[1];

  var _React$useState2 = React.useState({
    url: "",
    description: ""
  }),
      image = _React$useState2[0],
      setImage = _React$useState2[1];

  var props = {
    active: false
  };
  var classes = useStyles(props);

  var handleAddImage = function handleAddImage() {
    insertImage(editor, image);
    setImageDialogOpen(false);
  }; // if the user has clicked away without adding the image then we don't need to do anything with their data


  var handleClose = function handleClose() {
    return setImageDialogOpen(false);
  };

  return React.createElement(React.Fragment, null, React.createElement(Tooltip, {
    title: "image"
  }, React.createElement(IconButton, {
    className: classes.button,
    size: "small",
    "aria-label": "image",
    onMouseDown: function onMouseDown() {
      return setImageDialogOpen(true);
    }
  }, icon)), React.createElement(ImageDialog, {
    handleAddClick: handleAddImage,
    handleClose: handleClose,
    dialogOpen: imageDialogOpen,
    image: image,
    setImage: setImage
  }));
};

var VideoDialog = function VideoDialog(_ref) {
  var handleAddClick = _ref.handleAddClick,
      handleClose = _ref.handleClose,
      dialogOpen = _ref.dialogOpen,
      video = _ref.video,
      setVideo = _ref.setVideo;
  var classes = useStyles$1();
  return React.createElement(Dialog, {
    open: dialogOpen,
    onClose: handleClose,
    "aria-labelledby": "video-dialog-title"
  }, React.createElement(DialogTitle, {
    id: "video-dialog-title"
  }, "Video Details"), React.createElement(DialogContent, null, React.createElement(TextField, {
    autoFocus: true,
    margin: "dense",
    id: "url",
    label: "URL",
    type: "url",
    onChange: function onChange(e) {
      return setVideo(_extends({}, video, {
        url: e.target.value
      }));
    },
    fullWidth: true
  }), React.createElement(TextField, {
    margin: "dense",
    id: "width",
    label: "Width (optional)",
    type: "number",
    onChange: function onChange(e) {
      return setVideo(_extends({}, video, {
        width: Number(e.target.value)
      }));
    },
    fullWidth: true
  }), React.createElement(TextField, {
    margin: "dense",
    id: "height",
    label: "Height (optional)",
    type: "number",
    onChange: function onChange(e) {
      return setVideo(_extends({}, video, {
        height: Number(e.target.value)
      }));
    },
    fullWidth: true
  })), React.createElement(DialogActions, null, React.createElement(Button, {
    className: classes.button,
    onClick: handleAddClick,
    variant: "contained",
    color: "primary"
  }, "Add Video")));
};

var youTubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/+|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
var vimeoRegex = /\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i;

var getVideoID = function getVideoID(url) {
  var match;

  if (url.includes("youtube")) {
    match = url.match(youTubeRegex);
  }

  if (url.includes("vimeo")) {
    match = url.match(vimeoRegex);
  }

  if (match && match.length > 0) {
    return match[1];
  }

  alert("Can only accept YouTube or Vimeo URL");
  return url;
};

// the deselect method unsets the editor selection

Transforms.deselect = function () {};
/**
 * addVideo inserts a new video node.
 */


var addVideo = function addVideo(editor, video) {
  var url = video.url,
      width = video.width,
      height = video.height;
  var transformedURL = url;
  var videoID = getVideoID(url);

  if (url.match(/youtube\.com/)) {
    transformedURL = "https://www.youtube.com/embed/" + videoID;
  }

  if (url.match(/vimeo\.com/)) {
    transformedURL = "https://player.vimeo.com/video/" + videoID;
  }

  var videoData = {
    type: types.video,
    url: transformedURL,
    width: width,
    height: height,
    children: [{
      text: ""
    }]
  };
  Transforms.insertNodes(editor, videoData);
};
/**
 * VideoButton is a button specifically for adding videos.
 */


var VideoButton = function VideoButton(_ref) {
  var icon = _ref.icon;
  var editor = useSlate();

  var _React$useState = React.useState(false),
      videoDialogOpen = _React$useState[0],
      setVideoDialogOpen = _React$useState[1];

  var _React$useState2 = React.useState({
    url: ""
  }),
      video = _React$useState2[0],
      setVideo = _React$useState2[1];

  var props = {
    active: false
  };
  var classes = useStyles(props);

  var handleAddVideo = function handleAddVideo() {
    addVideo(editor, video);
    setVideoDialogOpen(false);
  }; // if the user has clicked away without adding the video then we don't need to do anything with their data


  var handleClose = function handleClose() {
    return setVideoDialogOpen(false);
  };

  return React.createElement(React.Fragment, null, React.createElement(Tooltip, {
    title: "video"
  }, React.createElement(IconButton, {
    className: classes.button,
    size: "small",
    "aria-label": "video",
    onMouseDown: function onMouseDown() {
      return setVideoDialogOpen(true);
    }
  }, icon)), React.createElement(VideoDialog, {
    handleAddClick: handleAddVideo,
    handleClose: handleClose,
    dialogOpen: videoDialogOpen,
    video: video,
    setVideo: setVideo
  }));
};

var ScientificSymbolIcon = function ScientificSymbolIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), React.createElement("path", {
    d: "M14 20v-2.157c1.863-1.192 3.5-3.875 3.5-6.959 0-3.073-2-6.029-5.5-6.029s-5.5 2.956-5.5 6.03c0 3.083 1.637 5.766 3.5 6.958V20H3v-2h4.76C5.666 16.505 4 13.989 4 10.884 4 6.247 7.5 3 12 3s8 3.247 8 7.884c0 3.105-1.666 5.621-3.76 7.116H21v2h-7z"
  }));
};

var getSymbolsList = function getSymbolsList() {
  var start = 0x0391;
  var end = 0x03c9;
  var symbols = [];

  for (var i = start; i < end; i++) {
    symbols.push(String.fromCharCode(i));
  }

  return symbols;
};

var useStyles$4 = /*#__PURE__*/makeStyles(function (theme) {
  return {
    popper: {
      marginTop: theme.spacing(1.5),
      backgroundColor: theme.palette.grey[100],
      width: "400px"
    },
    button: {
      borderRadius: "0px",
      border: "1px solid " + theme.palette.grey[200],
      width: "21px"
    }
  };
});
/**
 * ScientificSymbolsButton displays a button and popper for scientific symbols.
 */

var ScientificSymbolsButton = function ScientificSymbolsButton() {
  var editor = useSlate();
  var classes = useStyles$4();

  var _React$useState = React.useState(null),
      anchorEl = _React$useState[0],
      setAnchorEl = _React$useState[1];

  var handleItemClick = function handleItemClick(item) {
    Editor.insertText(editor, item);
    setAnchorEl(null);
  };

  var handleMenuOpen = function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  };

  var symbols = getSymbolsList();
  var open = Boolean(anchorEl);
  return React.createElement(React.Fragment, null, React.createElement(Tooltip, {
    title: "scientific symbols"
  }, React.createElement(IconButton, {
    size: "small",
    "aria-label": "scientific symbols",
    "aria-haspopup": "true",
    onMouseDown: handleMenuOpen
  }, React.createElement(ScientificSymbolIcon, null))), React.createElement(Popper, {
    className: classes.popper,
    id: open ? "symbol-popper" : undefined,
    open: open,
    anchorEl: anchorEl
  }, symbols.map(function (item, index) {
    return React.createElement(IconButton, {
      className: classes.button,
      key: index,
      onClick: function onClick() {
        return handleItemClick(item);
      },
      size: "small"
    }, item);
  })));
};

var BoldIcon = function BoldIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
  }));
};

var ItalicIcon = function ItalicIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"
  }));
};

var StrikethroughIcon = function StrikethroughIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
  }));
};

var SubscriptIcon = function SubscriptIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M22,18h-2v1h3v1h-4v-2c0-0.55,0.45-1,1-1h2v-1h-3v-1h3c0.55,0,1,0.45,1,1v1C23,17.55,22.55,18,22,18z M5.88,18h2.66 l3.4-5.42h0.12l3.4,5.42h2.66l-4.65-7.27L17.81,4h-2.68l-3.07,4.99h-0.12L8.85,4H6.19l4.32,6.73L5.88,18z"
  }));
};

var SuperscriptIcon = function SuperscriptIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M22,7h-2v1h3v1h-4V7c0-0.55,0.45-1,1-1h2V5h-3V4h3c0.55,0,1,0.45,1,1v1C23,6.55,22.55,7,22,7z M5.88,20h2.66l3.4-5.42h0.12 l3.4,5.42h2.66l-4.65-7.27L17.81,6h-2.68l-3.07,4.99h-0.12L8.85,6H6.19l4.32,6.73L5.88,20z"
  }));
};

var UnderlinedIcon = function UnderlinedIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"
  }));
};

var H1Icon = function H1Icon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"
  }));
};

var H2Icon = function H2Icon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8c0 1.11-.9 2-2 2h-2v2h4v2H9v-4c0-1.11.9-2 2-2h2V9H9V7h4c1.1 0 2 .89 2 2v2z"
  }));
};

var H3Icon = function H3Icon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M.01 0h24v24h-24z",
    fill: "none"
  }), React.createElement("path", {
    d: "M19.01 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 7.5c0 .83-.67 1.5-1.5 1.5.83 0 1.5.67 1.5 1.5V15c0 1.11-.9 2-2 2h-4v-2h4v-2h-2v-2h2V9h-4V7h4c1.1 0 2 .89 2 2v1.5z"
  }));
};

var LinkIcon = function LinkIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
  }));
};

var DividerIcon = function DividerIcon() {
  return React.createElement(SvgIcon, null, React.createElement("rect", {
    fill: "none",
    fillRule: "evenodd",
    height: "24",
    width: "24"
  }), React.createElement("rect", {
    fillRule: "evenodd",
    height: "2",
    width: "16",
    x: "4",
    y: "11"
  }));
};

var LineSpacingIcon = function LineSpacingIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M6 7h2.5L5 3.5 1.5 7H4v10H1.5L5 20.5 8.5 17H6V7zm4-2v2h12V5H10zm0 14h12v-2H10v2zm0-6h12v-2H10v2z"
  }));
};

var ImageIcon = function ImageIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
  }));
};

var VideoIcon = function VideoIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
  }));
};

var UnorderedListIcon = function UnorderedListIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
  }));
};

var OrderedListIcon = function OrderedListIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
  }));
};

var IndentIncreaseIcon = function IndentIncreaseIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"
  }));
};

var IndentDecreaseIcon = function IndentDecreaseIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"
  }));
};

var AlignLeftIcon = function AlignLeftIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"
  }));
};

var AlignCenterIcon = function AlignCenterIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"
  }));
};

var AlignRightIcon = function AlignRightIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"
  }));
};

var AlignJustifyIcon = function AlignJustifyIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"
  }));
};

var useStyles$5 = /*#__PURE__*/makeStyles(function (theme) {
  return {
    dropdown: function dropdown(props) {
      return {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: "0px",
        marginBottom: "0px",
        minWidth: props.minWidth
      };
    }
  };
});

var Dropdown = function Dropdown(_ref) {
  var values = _ref.values,
      defaultValue = _ref.defaultValue,
      mark = _ref.mark,
      _ref$minWidth = _ref.minWidth,
      minWidth = _ref$minWidth === void 0 ? "150px" : _ref$minWidth;
  var editor = useSlate();
  var props = {
    minWidth: minWidth
  };
  var classes = useStyles$5(props);

  var handleChange = function handleChange(event) {
    Editor.addMark(editor, mark, event.target.value);
  };

  return React.createElement(FormControl, {
    className: classes.dropdown
  }, React.createElement(Select, {
    value: getCurrentMark(editor, mark) || defaultValue,
    onChange: handleChange
  }, values.map(function (val) {
    var _style;

    return React.createElement(MenuItem, {
      key: val,
      value: val,
      style: (_style = {}, _style[mark] = val, _style)
    }, val);
  })));
};

var FontColorIcon = function FontColorIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M2,20h20v4H2V20z M5.49,17h2.42l1.27-3.58h5.65L16.09,17h2.42L13.25,3h-2.5L5.49,17z M9.91,11.39l2.03-5.79h0.12l2.03,5.79 H9.91z"
  }));
};

/**
 * toggleList toggles the given selection as a list type.
 */

var toggleList = function toggleList(editor, format) {
  // first find if the selected block is currently active
  var isActive = isBlockActive(editor, "type", format);
  Transforms.unwrapNodes(editor, {
    match: function match(n) {
      return !Editor.isEditor(n) && Element$1.isElement(n) && n.type === format;
    },
    split: true
  });
  var type = isActive ? types.paragraph : types.listItem;
  Transforms.setNodes(editor, {
    type: type
  });

  if (!isActive) {
    var block = {
      type: format,
      children: []
    };
    Transforms.wrapNodes(editor, block);
  }
};

var parentListMatch = function parentListMatch(n) {
  return !Editor.isEditor(n) && Element$1.isElement(n) && n.type === types.orderedList || !Editor.isEditor(n) && Element$1.isElement(n) && n.type === types.unorderedList;
}; // helper function to check for li match


var listItemMatch = function listItemMatch(n) {
  return !Editor.isEditor(n) && Element$1.isElement(n) && n.type === types.listItem;
}; // helper function to get matching ul/ol node


var findMatchingList = function findMatchingList(editor) {
  var _Array$from = Array.from(Editor.nodes(editor, {
    match: function match(n) {
      return parentListMatch(n);
    }
  })),
      listMatch = _Array$from[0];

  return listMatch;
}; // helper function to get matching li node


var findMatchingListItem = function findMatchingListItem(editor) {
  var _Array$from2 = Array.from(Editor.nodes(editor, {
    match: function match(n) {
      return listItemMatch(n);
    }
  })),
      match = _Array$from2[0];

  return match;
};

var setParagraphNode = function setParagraphNode(editor) {
  Transforms.setNodes(editor, {
    type: types.paragraph
  }, {
    match: function match(n) {
      return listItemMatch(n);
    }
  });
}; // helper function called when user escapes out of list


var liftNodes = function liftNodes(editor) {
  // check for new parent
  var listMatch = findMatchingList(editor); // verify there is an active list to lift the nodes

  if (listMatch) {
    // lift the list item node to next parent
    Transforms.liftNodes(editor, {
      match: function match(n) {
        return listItemMatch(n);
      }
    });
  }
};

var handleLists = function handleLists(editor, callback) {
  var selection = editor.selection; // check that there is a current selection without highlight

  if (selection && Range.isCollapsed(selection)) {
    // find the closest list item element
    var _Array$from3 = Array.from(Editor.nodes(editor, {
      match: function match(n) {
        return listItemMatch(n) && n.children && n.children[0] && (!n.children[0].text || n.children[0].text === "");
      }
    })),
        match = _Array$from3[0]; // check that there was a match


    if (match) {
      var path = match[1];
      var start = Editor.start(editor, path); // if the selection is at the beginning of the list item

      if (Point.equals(selection.anchor, start)) {
        // lift the list item to the next parent
        liftNodes(editor); // check for the new parent

        var listMatch = findMatchingList(editor); // if it is no longer within a ul/ol, turn into normal paragraph

        if (!listMatch) {
          setParagraphNode(editor);
        }

        return;
      }
    }
  }

  callback();
};
/**
 * withLists modifies the logic for inserting a line break inside lists.
 */


var withLists = function withLists(editor) {
  var insertBreak = editor.insertBreak,
      deleteBackward = editor.deleteBackward;

  editor.insertBreak = function () {
    handleLists(editor, insertBreak);
  };

  editor.deleteBackward = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    handleLists(editor, function () {
      return deleteBackward.apply(void 0, args);
    });
  };

  return editor;
};

var indentItem = function indentItem(editor) {
  var selection = editor.selection; // check that there is a current selection without highlight

  if (selection && Range.isCollapsed(selection)) {
    var match = findMatchingListItem(editor);

    if (match) {
      var _Array$from4 = Array.from(Editor.nodes(editor, {
        mode: "lowest",
        match: function match(n) {
          return parentListMatch(n);
        }
      })),
          listMatch = _Array$from4[0];

      if (listMatch) {
        var depth = listMatch[1].length;

        if (depth <= 5 && Element$1.isElement(listMatch[0])) {
          Transforms.wrapNodes(editor, {
            type: listMatch[0].type,
            children: []
          });
        }
      }
    } else {
      // if the user is hitting tab and not inside a list, insert spaces
      editor.insertText("    ");
    }
  }
};

var undentItem = function undentItem(editor) {
  var selection = editor.selection;

  if (selection && Range.isCollapsed(selection)) {
    var match = findMatchingListItem(editor);

    if (match) {
      liftNodes(editor);
      var listMatch = findMatchingList(editor); // if it is no longer within an active list, turn into paragraph

      if (!listMatch) {
        setParagraphNode(editor);
      }
    }
  }
};

var TableIcon = function TableIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), React.createElement("path", {
    d: "M13 10v4h6v-4h-6zm-2 0H5v4h6v-4zm2 9h6v-3h-6v3zm-2 0v-3H5v3h6zm2-14v3h6V5h-6zm-2 0H5v3h6V5zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
  }));
};

var TableInsertColumnIcon = function TableInsertColumnIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    fill: "none",
    d: "M0 0H24V24H0z"
  }), React.createElement("path", {
    d: "M10 3c.552 0 1 .448 1 1v16c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h6zM9 5H5v14h4V5zm9 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm1 2h-2v1.999L15 11v2l2-.001V15h2v-2.001L21 13v-2l-2-.001V9z"
  }));
};

var TableInsertRowIcon = function TableInsertRowIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    fill: "none",
    d: "M0 0H24V24H0z"
  }), React.createElement("path", {
    d: "M12 13c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm1 2h-2v1.999L9 17v2l2-.001V21h2v-2.001L15 19v-2l-2-.001V15zm7-12c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h16zM5 5v4h14V5H5z"
  }));
};

var TableDeleteColumnIcon = function TableDeleteColumnIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    fill: "none",
    d: "M0 0H24V24H0z"
  }), React.createElement("path", {
    d: "M12 3c.552 0 1 .448 1 1v8c.835-.628 1.874-1 3-1 2.761 0 5 2.239 5 5s-2.239 5-5 5c-1.032 0-1.99-.313-2.787-.848L13 20c0 .552-.448 1-1 1H6c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h6zm-1 2H7v14h4V5zm8 10h-6v2h6v-2z"
  }));
};

var TableDeleteRowIcon = function TableDeleteRowIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    fill: "none",
    d: "M0 0H24V24H0z"
  }), React.createElement("path", {
    d: "M20 5c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1 .628.835 1 1.874 1 3 0 2.761-2.239 5-5 5s-5-2.239-5-5c0-1.126.372-2.165 1-3H4c-.552 0-1-.448-1-1V6c0-.552.448-1 1-1h16zm-7 10v2h6v-2h-6zm6-8H5v4h14V7z"
  }));
};

var DeleteIcon = function DeleteIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), React.createElement("path", {
    d: "M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
  }));
};

var getNodeAbove = function getNodeAbove(editor, type) {
  var ancestor = Editor.above(editor, {
    match: function match(n) {
      return !Editor.isEditor(n) && Element$1.isElement(n) && n.type === type;
    }
  });
  return ancestor;
};

var getEmptyTableCell = function getEmptyTableCell() {
  return {
    type: types.tableCell,
    children: [{
      type: types.paragraph,
      children: [{
        text: " "
      }]
    }]
  };
};

var getEmptyTableRow = function getEmptyTableRow(count) {
  return {
    type: types.tableRow,
    children: Array(count).fill("").map(function () {
      return getEmptyTableCell();
    })
  };
};

var getEmptyTable = function getEmptyTable(row, col) {
  return {
    type: types.tableWrap,
    children: [{
      type: types.table,
      row: row,
      col: col,
      children: Array(row).fill(" ").map(function () {
        return getEmptyTableRow(col);
      })
    }, {
      type: types.paragraph,
      children: [{
        text: ""
      }]
    }]
  };
};

var insertTable = function insertTable(editor) {
  if (!isBlockActive(editor, "type", types.table)) {
    Transforms.insertNodes(editor, getEmptyTable(1, 2));
  }
};

var insertTableRow = function insertTableRow(editor) {
  var currentRow = getNodeAbove(editor, types.tableRow);

  if (currentRow === undefined) {
    return;
  }

  var rowPath = currentRow[1];

  var _Editor$parent = Editor.parent(editor, rowPath),
      tableNode = _Editor$parent[0],
      tablePath = _Editor$parent[1];

  if (!Element$1.isElement(tableNode)) {
    return;
  }

  var col = tableNode.col;
  var row = tableNode.row;
  Transforms.insertNodes(editor, getEmptyTableRow(col), {
    at: Path.next(rowPath)
  });
  Transforms.setNodes(editor, {
    row: row + 1
  }, {
    at: tablePath
  });
};

var insertTableColumn = function insertTableColumn(editor) {
  var currentCell = getNodeAbove(editor, types.tableCell);

  if (currentCell === undefined) {
    return;
  }

  var currentTable = getNodeAbove(editor, types.table);

  if (currentTable === undefined) {
    return;
  }

  var cellPath = currentCell[1];
  var tableNode = currentTable[0],
      tablePath = currentTable[1]; // get next item in path where new cell should be located

  var nextCellPath = Path.next(cellPath); // get copy of next cell path to change index later

  var newCellPath = nextCellPath.slice(); // find path position to enter new cell

  var replacePathPos = newCellPath.length - 2; // get index of current row using this path position

  var currentRowIndex = newCellPath[replacePathPos];

  if (!Element$1.isElement(tableNode)) {
    return;
  } // loop over table node and insert empty cells at given path


  tableNode.children.forEach( // @ts-ignore <-- used because we don't need the first val here
  function (_, index) {
    // replace path position in new cell path with the current index
    newCellPath[replacePathPos] = index; // insert an empty table cell at this position

    Transforms.insertNodes(editor, getEmptyTableCell(), {
      at: newCellPath,
      select: index === currentRowIndex
    });
  }); // update col attribute for table node

  Transforms.setNodes(editor, {
    col: Number(tableNode.col) + 1
  }, {
    at: tablePath
  });
};

var deleteTable = function deleteTable(editor) {
  var tableMatch = getNodeAbove(editor, types.tableWrap);

  if (tableMatch) {
    Transforms.removeNodes(editor, {
      at: tableMatch[1]
    });
  }
};

var deleteTableRow = function deleteTableRow(editor) {
  var currentRow = getNodeAbove(editor, types.tableRow);

  if (currentRow === undefined) {
    return;
  }

  var rowPath = currentRow[1];

  var _Editor$parent2 = Editor.parent(editor, rowPath),
      tableNode = _Editor$parent2[0],
      tablePath = _Editor$parent2[1];

  if (!Element$1.isElement(tableNode)) {
    return;
  }

  var row = Number(tableNode.row); // if there's only one row in the table then safely remove the table

  if (row === 1) {
    deleteTable(editor);
    return;
  } // otherwise remove the nodes at the row path and then set table node's
  // row attribute to one less


  Transforms.removeNodes(editor, {
    at: rowPath
  });
  Transforms.setNodes(editor, {
    row: row - 1
  }, {
    at: tablePath
  });
};

var deleteTableColumn = function deleteTableColumn(editor) {
  var currentCell = getNodeAbove(editor, types.tableCell);

  if (currentCell === undefined) {
    return;
  }

  var currentTable = getNodeAbove(editor, types.table);

  if (currentTable === undefined) {
    return;
  }

  var cellPath = currentCell[1];
  var tableNode = currentTable[0],
      tablePath = currentTable[1];

  if (!Element$1.isElement(tableNode)) {
    return;
  }

  var col = Number(tableNode.col);

  if (col === 1) {
    deleteTable(editor);
    return;
  }

  var pathToDelete = cellPath.slice();
  var replacePathPos = pathToDelete.length - 2; // @ts-ignore <-- use to ignore unneeded value

  tableNode.children.forEach(function (_, index) {
    pathToDelete[replacePathPos] = index;
    Transforms.removeNodes(editor, {
      at: pathToDelete
    });
  });
  Transforms.setNodes(editor, {
    col: col - 1
  }, {
    at: tablePath
  });
};

var tableButtons = function tableButtons(editor) {
  return [{
    format: types.tableColumn,
    icon: React.createElement(TableInsertColumnIcon, null),
    callback: function callback() {
      return insertTableColumn(editor);
    }
  }, {
    format: types.tableRow,
    icon: React.createElement(TableInsertRowIcon, null),
    callback: function callback() {
      return insertTableRow(editor);
    }
  }, {
    format: types.tableColumnDelete,
    icon: React.createElement(TableDeleteColumnIcon, null),
    callback: function callback() {
      return deleteTableColumn(editor);
    }
  }, {
    format: types.tableRowDelete,
    icon: React.createElement(TableDeleteRowIcon, null),
    callback: function callback() {
      return deleteTableRow(editor);
    }
  }, {
    format: types.tableDelete,
    icon: React.createElement(DeleteIcon, null),
    callback: function callback() {
      return deleteTable(editor);
    }
  }];
};
/**
 * TableButtons handles the display logic for the table buttons in the toolbar.
 */


var TableButtons = function TableButtons() {
  var editor = useSlate();
  var active = isBlockActive(editor, "type", types.tableWrap);
  var props = {
    active: active
  };
  var classes = useStyles(props); // when button is clicked, toggle the block within the editor

  var handleMouseDown = function handleMouseDown(event) {
    event.preventDefault();
    insertTable(editor);
  };

  return React.createElement(React.Fragment, null, React.createElement(Tooltip, {
    title: types.table
  }, React.createElement(IconButton, {
    className: classes.button,
    size: "small",
    "aria-label": types.table,
    // use onMouseDown to avoid editor selection becoming null
    // and losing cursor position
    onMouseDown: handleMouseDown
  }, React.createElement(TableIcon, null))), active && React.createElement(React.Fragment, null, tableButtons(editor).map(function (item) {
    return React.createElement(BlockButton, {
      format: item.format,
      icon: item.icon,
      clickFn: item.callback,
      key: item.format
    });
  })));
};

var useStyles$6 = /*#__PURE__*/makeStyles({
  separator: {
    borderLeftColor: "#c1c1c1",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    display: "inline-block",
    height: "20px",
    verticalAlign: "middle"
  }
});

var Separator = function Separator() {
  var classes = useStyles$6();
  return React.createElement("div", {
    className: classes.separator
  });
};

var useStyles$7 = /*#__PURE__*/makeStyles(function (theme) {
  return {
    container: {
      marginBottom: theme.spacing(1)
    },
    toolbar: {
      position: "sticky",
      top: 0,
      cursor: "default"
    },
    divider: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5)
    }
  };
});

var listButtons = function listButtons(editor) {
  return [{
    format: types.unorderedList,
    icon: React.createElement(UnorderedListIcon, null),
    callback: function callback() {
      return toggleList(editor, types.unorderedList);
    }
  }, {
    format: types.orderedList,
    icon: React.createElement(OrderedListIcon, null),
    callback: function callback() {
      return toggleList(editor, types.orderedList);
    }
  }, {
    format: types.indentIncrease,
    icon: React.createElement(IndentIncreaseIcon, null),
    callback: function callback() {
      return indentItem(editor);
    }
  }, {
    format: types.indentDecrease,
    icon: React.createElement(IndentDecreaseIcon, null),
    callback: function callback() {
      return undentItem(editor);
    }
  }];
};
/**
 * Toolbar is the display for the editor toolbar.
 */


var EditorToolbar = function EditorToolbar() {
  var editor = useSlate();
  var classes = useStyles$7();
  return React.createElement(AppBar, {
    color: "default",
    position: "static",
    className: classes.container
  }, React.createElement(Toolbar, {
    disableGutters: true,
    variant: "dense",
    className: classes.toolbar
  }, React.createElement(Grid, {
    container: true
  }, React.createElement(Grid, {
    item: true,
    xs: 12
  }, React.createElement(MarkButton, {
    format: types.bold,
    icon: React.createElement(BoldIcon, null)
  }), React.createElement(MarkButton, {
    format: types.italic,
    icon: React.createElement(ItalicIcon, null)
  }), React.createElement(MarkButton, {
    format: types.underline,
    icon: React.createElement(UnderlinedIcon, null)
  }), React.createElement(MarkButton, {
    format: types.strikethrough,
    icon: React.createElement(StrikethroughIcon, null)
  }), React.createElement(MarkButton, {
    format: types.subscript,
    icon: React.createElement(SubscriptIcon, null)
  }), React.createElement(MarkButton, {
    format: types.superscript,
    icon: React.createElement(SuperscriptIcon, null)
  }), React.createElement(Separator, null), React.createElement(BlockButton, {
    format: types.h1,
    icon: React.createElement(H1Icon, null),
    clickFn: function clickFn() {
      return toggleBlock(editor, types.h1);
    }
  }), React.createElement(BlockButton, {
    format: types.h2,
    icon: React.createElement(H2Icon, null),
    clickFn: function clickFn() {
      return toggleBlock(editor, types.h2);
    }
  }), React.createElement(BlockButton, {
    format: types.h3,
    icon: React.createElement(H3Icon, null),
    clickFn: function clickFn() {
      return toggleBlock(editor, types.h3);
    }
  }), React.createElement(LinkButton, {
    icon: React.createElement(LinkIcon, null)
  }), React.createElement(AutolinkIDsButton, null), React.createElement(Separator, null), React.createElement(AlignButton, {
    align: alignments.left,
    icon: React.createElement(AlignLeftIcon, null)
  }), React.createElement(AlignButton, {
    align: alignments.center,
    icon: React.createElement(AlignCenterIcon, null)
  }), React.createElement(AlignButton, {
    align: alignments.right,
    icon: React.createElement(AlignRightIcon, null)
  }), React.createElement(AlignButton, {
    align: alignments.justify,
    icon: React.createElement(AlignJustifyIcon, null)
  }), React.createElement(BlockButton, {
    format: types.divider,
    icon: React.createElement(DividerIcon, null),
    clickFn: function clickFn() {
      return toggleBlock(editor, types.divider);
    }
  }), React.createElement(Separator, null), listButtons(editor).map(function (item) {
    return React.createElement(BlockButton, {
      format: item.format,
      icon: item.icon,
      clickFn: item.callback,
      key: item.format
    });
  }), React.createElement(Separator, null), React.createElement(TableButtons, null), React.createElement(Separator, null), React.createElement(LineSpacingButton, {
    icon: React.createElement(LineSpacingIcon, null)
  }), React.createElement(ImageButton, {
    icon: React.createElement(ImageIcon, null)
  }), React.createElement(VideoButton, {
    icon: React.createElement(VideoIcon, null)
  }), React.createElement(Separator, null), React.createElement(FontColorButton, {
    icon: React.createElement(FontColorIcon, null)
  }), React.createElement(ScientificSymbolsButton, null), React.createElement(Dropdown, {
    mark: "fontFamily",
    defaultValue: "Roboto",
    values: FontFamilyList
  }), React.createElement(Dropdown, {
    mark: "fontSize",
    defaultValue: "1rem",
    values: FontSizeList,
    minWidth: "90px"
  })))));
};

var useStyles$8 = /*#__PURE__*/makeStyles(function (theme) {
  return {
    container: {
      marginBottom: theme.spacing(1)
    },
    toolbar: {
      position: "sticky",
      top: 0,
      cursor: "default"
    }
  };
});
/**
 * InlineToolbar is a condensed toolbar used for inline editing.
 */

var InlineToolbar = function InlineToolbar() {
  var classes = useStyles$8();
  return React.createElement(AppBar, {
    color: "default",
    position: "static",
    className: classes.container
  }, React.createElement(Toolbar, {
    disableGutters: true,
    variant: "dense",
    className: classes.toolbar
  }, React.createElement(Grid, {
    container: true
  }, React.createElement(Grid, {
    item: true,
    xs: 12
  }, React.createElement(MarkButton, {
    format: types.bold,
    icon: React.createElement(BoldIcon, null)
  }), React.createElement(MarkButton, {
    format: types.italic,
    icon: React.createElement(ItalicIcon, null)
  }), React.createElement(MarkButton, {
    format: types.underline,
    icon: React.createElement(UnderlinedIcon, null)
  }), React.createElement(MarkButton, {
    format: types.strikethrough,
    icon: React.createElement(StrikethroughIcon, null)
  }), React.createElement(MarkButton, {
    format: types.subscript,
    icon: React.createElement(SubscriptIcon, null)
  }), React.createElement(MarkButton, {
    format: types.superscript,
    icon: React.createElement(SuperscriptIcon, null)
  }), React.createElement(LinkButton, {
    icon: React.createElement(LinkIcon, null)
  }), React.createElement(AutolinkIDsButton, null), React.createElement(ScientificSymbolsButton, null)))));
};

var useStyles$9 = /*#__PURE__*/makeStyles(function () {
  return {
    container: function container(props) {
      return {
        textAlign: props.align,
        display: "block"
      };
    },
    media: function media(props) {
      return {
        maxWidth: "100%",
        maxHeight: "100%",
        boxShadow: props.selected && props.focused ? "0 0 0 3px #B4D5FF" : "none"
      };
    }
  };
});

/**
 * Image handles the display of any images.
 */

var Image = function Image(_ref) {
  var attributes = _ref.attributes,
      element = _ref.element,
      children = _ref.children;
  var align = element.align,
      url = element.url,
      description = element.description,
      width = element.width,
      height = element.height,
      linkURL = element.linkURL;
  var selected = useSelected();
  var focused = useFocused();
  var styleProps = {
    align: align,
    selected: selected,
    focused: focused
  };
  var classes = useStyles$9(styleProps);
  var img = React.createElement("img", {
    src: url,
    alt: description,
    height: height || "100%",
    width: width || "100%",
    className: classes.media
  });
  return React.createElement("div", Object.assign({
    className: classes.container
  }, attributes), React.createElement("div", {
    contentEditable: false
  }, linkURL !== "" ? React.createElement("a", {
    href: linkURL
  }, img) : {
    img: img
  }), children);
};

/**
 * Video handles the display of any videos.
 */

var Video = function Video(_ref) {
  var attributes = _ref.attributes,
      element = _ref.element,
      children = _ref.children;
  var align = element.align,
      url = element.url,
      width = element.width,
      height = element.height;
  var selected = useSelected();
  var focused = useFocused();
  var styleProps = {
    align: align,
    selected: selected,
    focused: focused
  };
  var classes = useStyles$9(styleProps);
  return React.createElement("div", Object.assign({
    className: classes.container
  }, attributes), React.createElement("div", {
    contentEditable: false
  }, React.createElement("iframe", {
    title: "video-embed",
    id: "videoplayer",
    width: width,
    height: height,
    src: url,
    frameBorder: "0",
    className: classes.media,
    allowFullScreen: true
  })), children);
};

var useStyles$a = /*#__PURE__*/makeStyles(function () {
  return {
    lineSpacing: function lineSpacing(props) {
      return {
        lineHeight: props.lineSpacing
      };
    },
    table: function table(props) {
      return {
        border: "1px solid " + props.borderColor,
        borderCollapse: "collapse"
      };
    },
    link: {
      cursor: "pointer"
    }
  };
});
/**
 * Element is used to render blocks based on a given type.
 */

var Element = function Element(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;
  var type = element.type,
      _element$align = element.align,
      align = _element$align === void 0 ? "inherit" : _element$align,
      lineSpacing = element.lineSpacing,
      borderColor = element.borderColor,
      url = element.url;
  var styleProps = {
    lineSpacing: lineSpacing ? lineSpacing : "normal",
    borderColor: borderColor ? borderColor : "grey"
  };
  var classes = useStyles$a(styleProps);

  switch (type) {
    case types.h1:
      return React.createElement(Typography, Object.assign({
        variant: "h1",
        align: align
      }, attributes), children);

    case types.h2:
      return React.createElement(Typography, Object.assign({
        variant: "h2",
        align: align
      }, attributes), children);

    case types.h3:
      return React.createElement(Typography, Object.assign({
        variant: "h3",
        align: align
      }, attributes), children);

    case types.link:
      return React.createElement(Link, Object.assign({
        href: url,
        color: "primary",
        className: classes.link
      }, attributes), children);

    case types.divider:
      return React.createElement(Divider, Object.assign({}, attributes));

    case types.lineSpacing:
      return React.createElement(Typography, Object.assign({
        component: "div",
        className: classes.lineSpacing
      }, attributes), children);

    case types.image:
      return React.createElement(Image, {
        element: element,
        attributes: attributes
      }, children);

    case types.video:
      return React.createElement(Video, {
        element: element,
        attributes: attributes
      }, children);

    case types.unorderedList:
      return React.createElement("ul", Object.assign({}, attributes), children);

    case types.orderedList:
      return React.createElement("ol", Object.assign({}, attributes), children);

    case types.listItem:
      return React.createElement("li", Object.assign({}, attributes), children);

    case types.table:
      return React.createElement(Table, {
        className: classes.table
      }, React.createElement(TableBody, Object.assign({}, attributes), children));

    case types.tableRow:
      return React.createElement(TableRow, Object.assign({}, attributes), children);

    case types.tableCell:
      return React.createElement(TableCell, Object.assign({
        className: classes.table
      }, attributes), children);

    case types.tableWrap:
      return React.createElement(Typography, Object.assign({
        component: "div"
      }, attributes), children);

    default:
      return React.createElement(Typography, Object.assign({
        component: "div",
        align: align
      }, attributes), children);
  }
};

/**
 * getFontSize is a helper function so any text nodes inside a header
 * element node can inherit the header font size
 */

var getFontSize = function getFontSize(editor, fontSize) {
  var node = getParentNode(editor); // if the parent node is a header then its text children should inherit its size

  if (Element$1.isElement(node) && node.type === types.h1) {
    return "inherit";
  }

  if (Element$1.isElement(node) && node.type === types.h2) {
    return "inherit";
  }

  if (Element$1.isElement(node) && node.type === types.h3) {
    return "inherit";
  }

  return fontSize;
};

var useStyles$b = /*#__PURE__*/makeStyles(function () {
  return {
    text: function text(props) {
      return {
        fontFamily: props.fontFamily,
        fontSize: props.fontSize,
        color: props.fontColor,
        lineHeight: "inherit"
      };
    }
  };
});
/**
 * Leaf is used to render text based on a given style.
 *
 * We need to use standard if conditionals and not if/else if because
 * a leaf can have multiple matching properties. If a leaf is both bold
 * and italic, for example, then ultimately this component would render:
 *
 * <span {...attributes}><strong><em>{children}</em></strong></span>
 */

var Leaf = function Leaf(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      leaf = _ref.leaf;
  var editor = useSlate();
  var theme = useTheme();
  var props = {
    fontFamily: leaf.fontFamily ? leaf.fontFamily : theme.typography.fontFamily,
    fontSize: getFontSize(editor, leaf.fontSize),
    fontColor: leaf.fontColor ? leaf.fontColor : theme.palette.text.primary
  };
  var classes = useStyles$b(props);

  if (leaf.bold) {
    children = React.createElement("strong", {
      "data-testid": "bold"
    }, children);
  }

  if (leaf.italic) {
    children = React.createElement("em", {
      "data-testid": "italic"
    }, children);
  }

  if (leaf.underline) {
    children = React.createElement("u", {
      "data-testid": "underline"
    }, children);
  }

  if (leaf.strikethrough) {
    children = React.createElement("s", {
      "data-testid": "strikethrough"
    }, children);
  }

  if (leaf.subscript) {
    children = React.createElement("sub", {
      "data-testid": "subscript"
    }, children);
  }

  if (leaf.superscript) {
    children = React.createElement("sup", {
      "data-testid": "superscript"
    }, children);
  }

  return React.createElement(Typography, Object.assign({
    component: "span",
    className: classes.text
  }, attributes), children);
};

var elementTags = {
  A: function A(el) {
    return {
      type: types.link,
      url: el.getAttribute("href")
    };
  },
  H1: function H1() {
    return {
      type: types.h1
    };
  },
  H2: function H2() {
    return {
      type: types.h2
    };
  },
  H3: function H3() {
    return {
      type: types.h3
    };
  },
  IMG: function IMG(el) {
    return {
      type: types.image,
      url: el.getAttribute("src")
    };
  },
  LI: function LI() {
    return {
      type: types.listItem
    };
  },
  OL: function OL() {
    return {
      type: types.orderedList
    };
  },
  UL: function UL() {
    return {
      type: types.unorderedList
    };
  },
  P: function P() {
    return {
      type: types.paragraph
    };
  },
  HR: function HR() {
    return {
      type: types.divider
    };
  },
  BR: function BR() {
    return {
      type: types.paragraph
    };
  }
};
var leafTags = {
  DEL: function DEL() {
    return {
      strikethrough: true
    };
  },
  EM: function EM() {
    return {
      italic: true
    };
  },
  I: function I() {
    return {
      italic: true
    };
  },
  S: function S() {
    return {
      strikethrough: true
    };
  },
  STRONG: function STRONG() {
    return {
      bold: true
    };
  },
  B: function B() {
    return {
      bold: true
    };
  },
  U: function U() {
    return {
      underline: true
    };
  },
  SUB: function SUB() {
    return {
      subscript: true
    };
  },
  SUP: function SUP() {
    return {
      superscript: true
    };
  }
};

var deserialize = function deserialize(el) {
  // text
  if (el.nodeType === 3) {
    return el.textContent;
  } // not a tag


  if (el.nodeType !== 1) {
    return null;
  }

  var nodeName = el.nodeName;
  var parent = el;
  var children = Array.from(parent.childNodes).map(deserialize).flat(); // body

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (elementTags[nodeName]) {
    var attrs = elementTags[nodeName](el);
    return jsx("element", attrs, children);
  }

  if (leafTags[nodeName]) {
    var _attrs = leafTags[nodeName](el);

    return children.filter(function (child) {
      return typeof child === "string";
    }).map(function (child) {
      return jsx("text", _attrs, child);
    });
  }

  return children;
};

/**
 * withHTML parses HTML content and converts to Slate JSON
 */

var withHTML = function withHTML(editor) {
  var insertData = editor.insertData;

  editor.insertData = function (data) {
    var html = data.getData("text/html");

    if (html) {
      var parsed = new DOMParser().parseFromString(html, "text/html");
      var fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

var withLinks = function withLinks(editor) {
  var isInline = editor.isInline; // make sure every link type is rendered as inline
  // NOTE: if a node is inline then it automatically adds children with { text: "" }
  // https://docs.slatejs.org/concepts/02-nodes

  editor.isInline = function (element) {
    if (element.type === types.link) {
      return true;
    }

    return isInline(element);
  };

  return editor;
};

var withMedia = function withMedia(editor) {
  var isVoid = editor.isVoid; // make sure every image type is void

  editor.isVoid = function (element) {
    if (element.type === types.image || element.type === types.video) {
      return true;
    }

    return isVoid(element);
  };

  return editor;
};

var withNormalize = function withNormalize(editor) {
  var normalizeNode = editor.normalizeNode;

  editor.normalizeNode = function (element) {
    var node = element[0],
        path = element[1]; // make sure a paragraph follows every divider so cursor can always be
    // placed after a divider

    var divider = Element$1.isElement(node) && node.type === types.divider;
    var image = Element$1.isElement(node) && node.type === types.image;
    var video = Element$1.isElement(node) && node.type === types.video;

    if (divider || image || video) {
      Transforms.insertNodes(editor, {
        type: types.paragraph,
        children: [{
          text: ""
        }]
      });
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

var onKeyDown = function onKeyDown(event, editor) {
  if (event.key === "Tab") {
    event.preventDefault();

    if (event.shiftKey) {
      undentItem(editor);
    } else {
      indentItem(editor);
    }
  }
};

var FontFamilyList$1 = [{
  name: "Lato"
}, {
  name: "Merriweather"
}, {
  name: "Montserrat"
}, {
  name: "Roboto"
}, {
  name: "Roboto Condensed"
}, {
  name: "Roboto Mono"
}, {
  name: "Roboto Slab"
}];
var FontSizeList$1 = [{
  size: "12px"
}, {
  size: "14px"
}, {
  size: "16px"
}, {
  size: "18px"
}, {
  size: "20px"
}, {
  size: "22px"
}, {
  size: "26px"
}, {
  size: "30px"
}];
/**
 * convertData receives a node object and converts its nested
 * 'data' object into the new Slate format.
 */

var convertData = function convertData(node) {
  var type = node.type;

  switch (type) {
    case "alignment":
      return {
        align: node.data["align"]
      };

    case "image":
      return {
        url: node.data["src"],
        description: node.data["description"],
        height: node.data["height"],
        width: node.data["width"]
      };

    case "line-spacing":
      return {
        lineSpacing: node.data["size"]
      };

    case "link":
      return {
        url: node.data["href"]
      };

    case "video":
      return {
        url: node.data["src"],
        height: node.data["height"],
        width: node.data["width"]
      };

    default:
      return {};
  }
};
/**
 * convertType converts an existing 'type' property into the 'type'
 * used by the new version of the editor.
 */


var convertType = function convertType(type) {
  var convertedType = "";

  switch (type) {
    case "heading_one":
    case "heading-one":
    case "heading_1":
      convertedType = types.h1;
      break;

    case "heading_two":
    case "heading-two":
    case "heading_2":
      convertedType = types.h2;
      break;

    case "heading_three":
    case "heading-three":
    case "heading_3":
      convertedType = types.h3;
      break;
    // h4-h6 not used in new editor

    case "heading_four":
    case "heading-four":
    case "heading_4":
      convertedType = types.h3;
      break;

    case "heading_five":
    case "heading-five":
    case "heading_5":
      convertedType = types.h3;
      break;

    case "heading_six":
    case "heading-six":
    case "heading_6":
      convertedType = types.h3;
      break;

    case "line-spacing":
      convertedType = types.lineSpacing;
      break;

    case "ordered-list":
    case "ordered_list":
    case "ol_list":
      convertedType = types.orderedList;
      break;

    case "unordered-list":
    case "unordered_list":
    case "ul_list":
      convertedType = types.unorderedList;
      break;

    case "list-item":
    case "list_item":
    case "list-item-child":
      convertedType = types.listItem;
      break;

    case "table":
      convertedType = types.tableWrap;
      break;

    case "table-row":
      convertedType = types.tableRow;
      break;

    case "table-cell":
      convertedType = types.tableCell;
      break;

    case "align_center":
    case "align_left":
    case "align_right":
    case "align_center":
      convertedType = "div";
      break;

    default:
      convertedType = type;
  }

  return convertedType;
};

var convertChildren = function convertChildren(node, align) {
  // if there are nodes then convert the children
  if (node.nodes) {
    return node.nodes.reduce(function (acc, val) {
      var nodes = convertNode(val); // if the converted current value is an array, only grab the object inside of it

      if (Array.isArray(nodes)) {
        return [].concat(acc, nodes);
      } // otherwise add the new value in its existing object form


      return [].concat(acc, [nodes]);
    }, []);
  } // otherwise include mandatory object with text property


  return [{
    text: ""
  }];
};

var alignmentTypes = ["alignment", "align_left", "align_center", "align_right", "align_justify"];

var marksReducer = function marksReducer(acc, mark) {
  var _extends2;

  if (mark.type === "font-color") {
    return _extends({}, acc, {
      fontColor: mark.data.color
    });
  }

  if (mark.type === "font-family") {
    return _extends({}, acc, {
      fontFamily: FontFamilyList$1[mark.data.fontFamilyIndex].name
    });
  }

  if (mark.type === "font-size") {
    return _extends({}, acc, {
      fontSize: FontSizeList$1[mark.data.fontSizeIndex].size
    });
  }

  return _extends({}, acc, (_extends2 = {}, _extends2[mark.type] = true, _extends2));
};

var convertDataByType = function convertDataByType(node) {
  var type = node.type; // remove any alignment wrappers from old structure;
  // previously, changing the alignment would add a new <div> around the selection

  if (alignmentTypes.includes(type)) {
    var element = _extends({
      type: "div",
      children: convertChildren(node)
    }, convertData(node));

    return element;
  }

  return _extends({
    type: convertType(type),
    children: convertChildren(node)
  }, convertData(node));
};

var convertNode = function convertNode(node) {
  var type = node.type;

  if (type) {
    return convertDataByType(node);
  }

  var text = node.text,
      marks = node.marks,
      leaves = node.leaves;
  /**
   * Leaves is an array containing leaf objects of this structure:
   * {
   *  object: "leaf",
   *  text: "george costanza",
   *  marks: [
   *    {
   *      object: "mark",
   *      type: "italic",
   *      data: {}
   *    }
   *  ]
   * }
   *
   * Each leaf node needs to be converted recursively.
   */

  if (leaves) {
    return [].concat(leaves.map(convertNode));
  }
  /**
    Example node to check for:
      {
        object: "leaf",
        text: "periodically",
        marks: [
          {
            object: "mark",
            type: "italic",
            data: {},
          },
        ],
      }
    
  */


  if (marks && marks.length > 0) {
    // return object with text and list of marks with appropriate values
    return _extends({
      text: text
    }, marks.reduce(marksReducer, {}));
  } // if no leaves or marks then just return plain text


  return {
    text: text
  };
};

var convertSlate047 = function convertSlate047(object) {
  var nodes = object.document.nodes;
  return nodes.map(convertNode);
};

var defaultTheme = /*#__PURE__*/createMuiTheme({});

var initialValue = [{
  type: "paragraph",
  children: [{
    fontFamily: "Roboto",
    fontSize: "inherit",
    fontColor: "rgba(0, 0, 0, 0.87)",
    text: ""
  }]
}];
/**
 * PageEditor is the main editor component.
 */

var PageEditor = function PageEditor(_ref) {
  var pageContent = _ref.pageContent,
      readOnly = _ref.readOnly,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? defaultTheme : _ref$theme,
      inline = _ref.inline;
  // create a slate editor object that won't change across renders
  var editor = useMemo(function () {
    return withHTML(withHistory(withReact(withNormalize(withMedia(withLists(withLinks(createEditor())))))));
  }, []);
  var defaultValue = initialValue;

  if (pageContent) {
    defaultValue = JSON.parse(pageContent);

    if (!Array.isArray(defaultValue)) {
      defaultValue = convertSlate047(defaultValue);
    }
  } // store the value of the editor


  var _useState = useState(defaultValue),
      value = _useState[0],
      setValue = _useState[1]; // render expected element based on type passed as props
  // memoize this function for subsequent renders


  var renderElement = useCallback(function (props) {
    return React.createElement(Element, Object.assign({}, props));
  }, []); // render expected leaf based on type (i.e. bold, italic, etc)

  var renderLeaf = useCallback(function (props) {
    return React.createElement(Leaf, Object.assign({}, props));
  }, []);

  var handleKeyDown = function handleKeyDown(event) {
    onKeyDown(event, editor);
  };

  var toolbar = inline ? React.createElement(InlineToolbar, null) : React.createElement(EditorToolbar, null);
  console.log(value);
  return React.createElement(ThemeProvider, {
    theme: theme
  }, React.createElement(Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(value) {
      return setValue(value);
    }
  }, !readOnly && toolbar, React.createElement(Editable, {
    readOnly: readOnly,
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    onKeyDown: handleKeyDown,
    placeholder: "Enter some text...",
    spellCheck: true,
    autoFocus: true
  })));
};

export { PageEditor };
//# sourceMappingURL=dicty-components-page-editor.esm.js.map
