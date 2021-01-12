import React, { useMemo, useState, useCallback } from 'react';
import { Editor, createEditor } from 'slate';
import { useSlate, withReact, Slate, Editable } from 'slate-react';
import IconButton from '@material-ui/core/IconButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';

var isBoldMarkActive = function isBoldMarkActive(editor) {
  // gets a list of marks on the text on the given selection
  var marks = Editor.marks(editor); // if there are bold marks then the bold mark is active

  return marks ? marks["bold"] === true : false;
};

var toggleBoldMark = function toggleBoldMark(editor) {
  // first find if the selection's mark is currently active
  var isActive = isBoldMarkActive(editor);

  if (isActive) {
    Editor.removeMark(editor, "bold");
  } else {
    Editor.addMark(editor, "bold", true);
  }

  console.log(Editor.marks(editor));
};

var BoldButton = function BoldButton() {
  var editor = useSlate(); // when bold button is clicked, toggle the mark

  var handleClick = function handleClick(event) {
    event.preventDefault();
    toggleBoldMark(editor);
  };

  return React.createElement(IconButton, {
    size: "small",
    onClick: handleClick
  }, React.createElement(FormatBoldIcon, null));
};

var Toolbar = function Toolbar() {
  return React.createElement("div", null, React.createElement(BoldButton, null));
};

var Element = function Element(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;

  switch (element.type) {
    default:
      return React.createElement("p", Object.assign({}, attributes), children);
  }
};

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

  return React.createElement("span", Object.assign({}, attributes), children);
};

var initialValue = [{
  type: "paragraph",
  children: [{
    text: "A line of text in a paragraph."
  }]
}];

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
