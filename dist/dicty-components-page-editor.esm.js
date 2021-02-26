import React, { useMemo, useState, useCallback } from 'react';
import { Editor, Transforms, Element as Element$1, Range, createEditor } from 'slate';
import { useSlate, withReact, Slate, Editable } from 'slate-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

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
  var editor = useSlate(); // when button is clicked, toggle the mark within the editor

  var handleClick = function handleClick(event) {
    event.preventDefault();
    toggleMark(editor, format);
  };

  return React.createElement(IconButton, {
    size: "small",
    onClick: handleClick
  }, icon);
};

/**
 * PROCESS:
 *
 * 1. User clicks button
 * 2. We run generator function to find any matching nodes for that block type.
 * 3. If there are no matches (value == undefined) then the generator is done
 *    and we do not mark that block as active.
 * 4. If the block is not active, then we set the nodes to match that format type.
 * 5. If the generator does find a match, we mark that block as active for the
 *    first matching node.
 * 6. If the block is active, then we set the nodes back to the default type of
 *    'paragraph'.
 */

/**
 * isBlockActive determines if the current text selection contains an active block
 */

var isBlockActive = function isBlockActive(editor, format) {
  // Editor.nodes returns a generator that iterates through all of the editor's
  // nodes. We are looking for matches for the selected format.
  // https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/interfaces/node.ts#L467
  var nodeGenerator = Editor.nodes(editor, {
    match: function match(n) {
      return !Editor.isEditor(n) && Element$1.isElement(n) && n.type === format;
    }
  }); // run the generator to find the nearest match

  var node = nodeGenerator.next(); // if it finds a match then return true to indicate the block is currently
  // active

  while (!node.done) {
    return true;
  } // if it doesn't find a match, then the generator has yielded its last value
  // meaning that it did not find a match for this block type


  return false;
};
/**
 * toggleBlock will set the appropriate nodes for the given selection
 */


var toggleBlock = function toggleBlock(editor, format) {
  // first find if the selected block is currently active
  var isActive = isBlockActive(editor, format); // setNodes is used to set properties at the currently selected element.
  // If the block is active, then we want to toggle it back to the default
  // paragraph type. If the block is not active, we toggle the type to match it.

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : format
  });
};
/**
 * BlockButton displays a button with associated click logic for toggling a
 * block.
 */


var BlockButton = function BlockButton(_ref) {
  var format = _ref.format,
      icon = _ref.icon;
  var editor = useSlate(); // when button is clicked, toggle the block within the editor

  var handleClick = function handleClick(event) {
    event.preventDefault();
    toggleBlock(editor, format);
  };

  return React.createElement(IconButton, {
    size: "small",
    onClick: handleClick
  }, icon);
};

var isAlignActive = function isAlignActive(editor, align) {
  var nodeGenerator = Editor.nodes(editor, {
    match: function match(n) {
      return !Editor.isEditor(n) && Element$1.isElement(n) && n.align === align;
    }
  }); // run the generator to find the nearest match
  // then return true if this is the last value

  var node = nodeGenerator.next();

  while (!node.done) {
    return true;
  }

  return false;
};

var toggleAlign = function toggleAlign(editor, align) {
  var isActive = isAlignActive(editor, align);
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
  var editor = useSlate(); // when button is clicked, toggle the block within the editor

  var handleClick = function handleClick(event) {
    event.preventDefault();
    toggleAlign(editor, align);
  };

  return React.createElement(IconButton, {
    size: "small",
    "aria-label": "align-" + align,
    onClick: handleClick
  }, icon);
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
  h3: "h3"
};
var alignments = {
  left: "left",
  center: "center",
  right: "right",
  justify: "justify"
};

var nodeOptions = {
  match: function match(n) {
    return !Editor.isEditor(n) && Element$1.isElement(n) && n.type === types.link;
  }
};

var isLinkActive = function isLinkActive(editor) {
  var nodeGenerator = Editor.nodes(editor, nodeOptions); // run the generator to find the nearest match

  var node = nodeGenerator.next(); // if it finds a match then return true to indicate the link is currently
  // active

  while (!node.done) {
    return true;
  } // if it doesn't find a match, then the generator has yielded its last value
  // meaning that it did not find a match for this type


  return false;
}; // unwrap the link from the current selection


var unwrapLink = function unwrapLink(editor) {
  Transforms.unwrapNodes(editor, nodeOptions);
}; // wrapLink has all of the logic for wrapping a given selection with
// an inline link node


var wrapLink = function wrapLink(editor, url) {
  // first, if the selection is already a link then we want to unwrap it;
  // this prevents nested links
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  } // add variable to determine if the given selection is collapsed;
  // this means that the user does not have any text actively selected


  var selection = editor.selection;
  var isCollapsed = selection && Range.isCollapsed(selection); // define the link data structure
  // if it is collapsed then we add the url as the text portion of the link

  var link = {
    type: types.link,
    url: url,
    children: isCollapsed ? [{
      text: url
    }] : []
  };

  if (isCollapsed) {
    // if there isn't a range selected, insert a new node
    Transforms.insertNodes(editor, link);
  } else {
    // otherwise wrap the node with the link data
    // split is necessary to only wrap the selection and not the entire block
    Transforms.wrapNodes(editor, link, {
      split: true
    }); // and collapse the selection to the end of the node

    Transforms.collapse(editor, {
      edge: "end"
    });
  }
};

var insertLink = function insertLink(editor, url) {
  // only insert a link if there is a selection in the editor
  if (editor.selection) {
    wrapLink(editor, url);
  }
};
/**
 * LinkButton is a button specifically for adding links.
 */


var LinkButton = function LinkButton(_ref) {
  var icon = _ref.icon;
  var editor = useSlate();

  var handleClick = function handleClick(event) {
    event.preventDefault();
    var url = window.prompt("Enter the URL of the link:");
    if (!url) return;
    insertLink(editor, url);
  };

  return React.createElement(IconButton, {
    size: "small",
    "aria-label": "link-button",
    onClick: handleClick
  }, icon);
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

var useStyles = /*#__PURE__*/makeStyles({
  divider: {
    marginLeft: "4px",
    marginRight: "4px"
  }
});
/**
 * Toolbar is the display for the editor toolbar.
 */

var EditorToolbar = function EditorToolbar() {
  var classes = useStyles();
  return React.createElement(AppBar, {
    color: "default",
    position: "static"
  }, React.createElement(Toolbar, {
    disableGutters: true,
    variant: "dense"
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
  }), React.createElement(Divider, {
    className: classes.divider,
    orientation: "vertical",
    flexItem: true
  }), React.createElement(BlockButton, {
    format: types.h1,
    icon: React.createElement(H1Icon, null)
  }), React.createElement(BlockButton, {
    format: types.h2,
    icon: React.createElement(H2Icon, null)
  }), React.createElement(BlockButton, {
    format: types.h3,
    icon: React.createElement(H3Icon, null)
  }), React.createElement(LinkButton, {
    icon: React.createElement(LinkIcon, null)
  }), React.createElement(Divider, {
    className: classes.divider,
    orientation: "vertical",
    flexItem: true
  }), React.createElement(AlignButton, {
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
  })));
};

/**
 * Element is used to render blocks based on a given type.
 */

var Element = function Element(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;
  var type = element.type,
      _element$align = element.align,
      align = _element$align === void 0 ? "left" : _element$align,
      url = element.url;

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
      return React.createElement("a", Object.assign({
        href: url
      }, attributes), children);

    default:
      return React.createElement(Typography, Object.assign({
        component: "p",
        variant: "body1",
        align: align
      }, attributes), children);
  }
};

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

  if (leaf.bold) {
    children = React.createElement("strong", null, children);
  }

  if (leaf.italic) {
    children = React.createElement("em", null, children);
  }

  if (leaf.underline) {
    children = React.createElement("u", null, children);
  }

  if (leaf.strikethrough) {
    children = React.createElement("s", null, children);
  }

  if (leaf.subscript) {
    children = React.createElement("sub", null, children);
  }

  if (leaf.superscript) {
    children = React.createElement("sup", null, children);
  }

  return React.createElement("span", Object.assign({}, attributes), children);
};

var withLinks = function withLinks(editor) {
  var isInline = editor.isInline; // make sure every link type is rendered as inline

  editor.isInline = function (element) {
    if (element.type === types.link) {
      return true;
    }

    return isInline(editor);
  };

  return editor;
};

var initialValue = [{
  type: "paragraph",
  children: [{
    text: "A line of text in a paragraph."
  }]
}];
/**
 * PageEditor is the main editor component.
 */

var PageEditor = function PageEditor() {
  // create a slate editor object that won't change across renders
  var editor = useMemo(function () {
    return withReact(withLinks(createEditor()));
  }, []); // store the value of the editor

  var _useState = useState(initialValue),
      value = _useState[0],
      setValue = _useState[1]; // render expected element based on type passed as props
  // memoize this function for subsequent renders


  var renderElement = useCallback(function (props) {
    return React.createElement(Element, Object.assign({}, props));
  }, []); // render expected leaf based on type (i.e. bold, italic, etc)

  var renderLeaf = useCallback(function (props) {
    return React.createElement(Leaf, Object.assign({}, props));
  }, []);
  console.log(value);
  return React.createElement(Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(value) {
      return setValue(value);
    }
  }, React.createElement(EditorToolbar, null), React.createElement(Editable, {
    renderElement: renderElement,
    renderLeaf: renderLeaf
  }));
};

export { PageEditor };
//# sourceMappingURL=dicty-components-page-editor.esm.js.map
