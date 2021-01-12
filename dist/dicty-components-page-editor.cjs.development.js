'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var slate = require('slate');
var slateReact = require('slate-react');
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var FormatBoldIcon = _interopDefault(require('@material-ui/icons/FormatBold'));
var FormatItalicIcon = _interopDefault(require('@material-ui/icons/FormatItalic'));
var FormatUnderlinedIcon = _interopDefault(require('@material-ui/icons/FormatUnderlined'));
var Typography = _interopDefault(require('@material-ui/core/Typography'));

var isMarkActive = function isMarkActive(editor, format) {
  // get a list of marks from the selected text
  var marks = slate.Editor.marks(editor); // if there are marks for specified format then the mark is active

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
    slate.Editor.removeMark(editor, format);
  } else {
    slate.Editor.addMark(editor, format, true);
  }
};
/**
 * MarkButton displays a button with associated click logic for toggling a mark.
 */


var MarkButton = function MarkButton(_ref) {
  var format = _ref.format,
      icon = _ref.icon;
  var editor = slateReact.useSlate(); // when button is clicked, toggle the mark within the editor

  var handleClick = function handleClick(event) {
    event.preventDefault();
    toggleMark(editor, format);
  };

  return React__default.createElement(IconButton, {
    size: "small",
    onClick: handleClick
  }, icon);
};

/**
 * Toolbar is the display for the editor toolbar.
 */

var Toolbar = function Toolbar() {
  return React__default.createElement("div", null, React__default.createElement(MarkButton, {
    format: "bold",
    icon: React__default.createElement(FormatBoldIcon, null)
  }), React__default.createElement(MarkButton, {
    format: "italic",
    icon: React__default.createElement(FormatItalicIcon, null)
  }), React__default.createElement(MarkButton, {
    format: "underline",
    icon: React__default.createElement(FormatUnderlinedIcon, null)
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
      return React__default.createElement(Typography, Object.assign({
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
    children = React__default.createElement("strong", null, children);
  }

  if (leaf.italic) {
    children = React__default.createElement("em", null, children);
  }

  if (leaf.underline) {
    children = React__default.createElement("u", null, children);
  }

  return React__default.createElement(Typography, Object.assign({
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
  var editor = React.useMemo(function () {
    return slateReact.withReact(slate.createEditor());
  }, []); // store the value of the editor

  var _useState = React.useState(initialValue),
      value = _useState[0],
      setValue = _useState[1]; // render expected element based on type passed as props
  // memoize this function for subsequent renders


  var renderElement = React.useCallback(function (props) {
    return React__default.createElement(Element, Object.assign({}, props));
  }, []); // render expected leaf based on type (i.e. bold, italic, etc)

  var renderLeaf = React.useCallback(function (props) {
    return React__default.createElement(Leaf, Object.assign({}, props));
  }, []);
  return React__default.createElement(slateReact.Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(value) {
      return setValue(value);
    }
  }, React__default.createElement(Toolbar, null), React__default.createElement(slateReact.Editable, {
    renderElement: renderElement,
    renderLeaf: renderLeaf
  }));
};

exports.PageEditor = PageEditor;
//# sourceMappingURL=dicty-components-page-editor.cjs.development.js.map
