import React, { useMemo, useState, useCallback } from 'react';
import { Editor, createEditor } from 'slate';
import { useSlate, withReact, Slate, Editable } from 'slate-react';
import IconButton from '@material-ui/core/IconButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import Typography from '@material-ui/core/Typography';

var isMarkActive = function isMarkActive(editor, format) {
  // get a list of marks from the selected text
  var marks = Editor.marks(editor); // if there are marks for specified format then the mark is active

  if (marks && marks[format]) {
    return true;
  } else {
    return false;
  }
};

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
 * Toolbar is the display for the editor toolbar.
 */

var Toolbar = function Toolbar() {
  return React.createElement("div", null, React.createElement(MarkButton, {
    format: "bold",
    icon: React.createElement(FormatBoldIcon, null)
  }), React.createElement(MarkButton, {
    format: "italic",
    icon: React.createElement(FormatItalicIcon, null)
  }), React.createElement(MarkButton, {
    format: "underline",
    icon: React.createElement(FormatUnderlinedIcon, null)
  }), React.createElement(MarkButton, {
    format: "strikethrough",
    icon: React.createElement(FormatStrikethroughIcon, null)
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

  return React.createElement(Typography, Object.assign({
    component: "span",
    variant: "body1"
  }, attributes), children);
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
