import React, { useMemo, useState, useCallback } from 'react';
import { Editor, Transforms, Element as Element$1, createEditor } from 'slate';
import { useSlate, withReact, Slate, Editable } from 'slate-react';
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
  // then return true if this is the last value

  var node = nodeGenerator.next();

  while (!node.done) {
    return true;
  }

  return false;
};
/**
 * toggleBlock will set the appropriate nodes for the given selection
 */


var toggleBlock = function toggleBlock(editor, format) {
  // first find if the selected block is currently active
  var isActive = isBlockActive(editor, format); // Transforms provides helper functions to interact with the document.
  // setNodes is used to set properties at the specified location.
  // Here we are setting the type as paragraph if the block is active for the
  // given format, otherwise we set it as the format.

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : format
  });
};
/**
 * BlockButton displays a button with associated click logic for toggling a block.
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

var BoldIcon = function BoldIcon() {
  return React.createElement(SvgIcon, null, React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React.createElement("path", {
    d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
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

/**
 * Toolbar is the display for the editor toolbar.
 */

var Toolbar = function Toolbar() {
  return React.createElement("div", null, React.createElement(MarkButton, {
    format: "bold",
    icon: React.createElement(BoldIcon, null)
  }), React.createElement(MarkButton, {
    format: "italic",
    icon: React.createElement(ItalicIcon, null)
  }), React.createElement(MarkButton, {
    format: "underline",
    icon: React.createElement(UnderlinedIcon, null)
  }), React.createElement(MarkButton, {
    format: "strikethrough",
    icon: React.createElement(StrikethroughIcon, null)
  }), React.createElement(MarkButton, {
    format: "subscript",
    icon: React.createElement(SubscriptIcon, null)
  }), React.createElement(MarkButton, {
    format: "superscript",
    icon: React.createElement(SuperscriptIcon, null)
  }), React.createElement(BlockButton, {
    format: "h1",
    icon: React.createElement(H1Icon, null)
  }), React.createElement(BlockButton, {
    format: "h2",
    icon: React.createElement(H2Icon, null)
  }), React.createElement(BlockButton, {
    format: "h3",
    icon: React.createElement(H3Icon, null)
  }));
};

/**
 * Element is used to render blocks based on a given type.
 */

var Element = function Element(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;

  switch (element.type) {
    case "h1":
      return React.createElement(Typography, Object.assign({
        variant: "h1"
      }, attributes), children);

    case "h2":
      return React.createElement(Typography, Object.assign({
        variant: "h2"
      }, attributes), children);

    case "h3":
      return React.createElement(Typography, Object.assign({
        variant: "h3"
      }, attributes), children);

    default:
      return React.createElement(Typography, Object.assign({
        component: "p",
        variant: "body1"
      }, attributes), children);
  }
};

/**
 * Leaf is used to render text based on a given style.
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
    return withReact(createEditor());
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
  return React.createElement(Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(value) {
      return setValue(value);
    }
  }, React.createElement(Toolbar, null), React.createElement(Editable, {
    renderElement: renderElement,
    renderLeaf: renderLeaf
  }));
};

export { PageEditor };
//# sourceMappingURL=dicty-components-page-editor.esm.js.map
