'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var slate = require('slate');
var slateReact = require('slate-react');
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var FormatBoldIcon = _interopDefault(require('@material-ui/icons/FormatBold'));

var isBoldMarkActive = function isBoldMarkActive(editor) {
  // gets a list of marks on the text on the given selection
  var marks = slate.Editor.marks(editor); // if there are bold marks then the bold mark is active

  return marks ? marks["bold"] === true : false;
};

var toggleBoldMark = function toggleBoldMark(editor) {
  // first find if the selection's mark is currently active
  var isActive = isBoldMarkActive(editor);

  if (isActive) {
    slate.Editor.removeMark(editor, "bold");
  } else {
    slate.Editor.addMark(editor, "bold", true);
  }

  console.log(slate.Editor.marks(editor));
};

var BoldButton = function BoldButton() {
  var editor = slateReact.useSlate(); // when bold button is clicked, toggle the mark

  var handleClick = function handleClick(event) {
    event.preventDefault();
    toggleBoldMark(editor);
  };

  return React__default.createElement(IconButton, {
    size: "small",
    onClick: handleClick
  }, React__default.createElement(FormatBoldIcon, null));
};

var Toolbar = function Toolbar() {
  return React__default.createElement("div", null, React__default.createElement(BoldButton, null));
};

var Element = function Element(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;

  switch (element.type) {
    default:
      return React__default.createElement("p", Object.assign({}, attributes), children);
  }
};

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

  return React__default.createElement("span", Object.assign({}, attributes), children);
};

var initialValue = [{
  type: "paragraph",
  children: [{
    text: "A line of text in a paragraph."
  }]
}];

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
