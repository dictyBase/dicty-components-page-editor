'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var slate = require('slate');
var slateReact = require('slate-react');
var styles = require('@material-ui/core/styles');
var AppBar = _interopDefault(require('@material-ui/core/AppBar'));
var Toolbar = _interopDefault(require('@material-ui/core/Toolbar'));
var Divider = _interopDefault(require('@material-ui/core/Divider'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var SvgIcon = _interopDefault(require('@material-ui/core/SvgIcon'));
var Typography = _interopDefault(require('@material-ui/core/Typography'));

/**
 * isMarkActive determines if the current text selection contains an
 * active mark
 */

var isMarkActive = function isMarkActive(editor, format) {
  // get a list of marks from the selected text
  var marks = slate.Editor.marks(editor); // if there are marks for specified format then the mark is active

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
  var nodeGenerator = slate.Editor.nodes(editor, {
    match: function match(n) {
      return !slate.Editor.isEditor(n) && slate.Element.isElement(n) && n.type === format;
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


var toggleBlock = function toggleBlock(editor, format, align) {
  if (align === void 0) {
    align = "left";
  }

  // first find if the selected block is currently active
  var isActive = isBlockActive(editor, format); // Transforms provides helper functions to interact with the document.
  // setNodes is used to set properties at the specified location.
  // Here we are setting the type as paragraph if the block is active for the
  // given format, otherwise we set it as the format.

  slate.Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : format,
    alignment: isActive ? "left" : align
  });
};
/**
 * BlockButton displays a button with associated click logic for toggling a block.
 */


var BlockButton = function BlockButton(_ref) {
  var format = _ref.format,
      icon = _ref.icon,
      align = _ref.align;
  var editor = slateReact.useSlate(); // when button is clicked, toggle the block within the editor

  var handleClick = function handleClick(event) {
    event.preventDefault();
    toggleBlock(editor, format, align);
  };

  return React__default.createElement(IconButton, {
    size: "small",
    onClick: handleClick
  }, icon);
};

var BoldIcon = function BoldIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
  }));
};

var ItalicIcon = function ItalicIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"
  }));
};

var StrikethroughIcon = function StrikethroughIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
  }));
};

var SubscriptIcon = function SubscriptIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M22,18h-2v1h3v1h-4v-2c0-0.55,0.45-1,1-1h2v-1h-3v-1h3c0.55,0,1,0.45,1,1v1C23,17.55,22.55,18,22,18z M5.88,18h2.66 l3.4-5.42h0.12l3.4,5.42h2.66l-4.65-7.27L17.81,4h-2.68l-3.07,4.99h-0.12L8.85,4H6.19l4.32,6.73L5.88,18z"
  }));
};

var SuperscriptIcon = function SuperscriptIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M22,7h-2v1h3v1h-4V7c0-0.55,0.45-1,1-1h2V5h-3V4h3c0.55,0,1,0.45,1,1v1C23,6.55,22.55,7,22,7z M5.88,20h2.66l3.4-5.42h0.12 l3.4,5.42h2.66l-4.65-7.27L17.81,6h-2.68l-3.07,4.99h-0.12L8.85,6H6.19l4.32,6.73L5.88,20z"
  }));
};

var UnderlinedIcon = function UnderlinedIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"
  }));
};

var AlignLeftIcon = function AlignLeftIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"
  }));
};

var AlignCenterIcon = function AlignCenterIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"
  }));
};

var AlignRightIcon = function AlignRightIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"
  }));
};

var AlignJustifyIcon = function AlignJustifyIcon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"
  }));
};

var H1Icon = function H1Icon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"
  }));
};

var H2Icon = function H2Icon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8c0 1.11-.9 2-2 2h-2v2h4v2H9v-4c0-1.11.9-2 2-2h2V9H9V7h4c1.1 0 2 .89 2 2v2z"
  }));
};

var H3Icon = function H3Icon() {
  return React__default.createElement(SvgIcon, null, React__default.createElement("path", {
    d: "M.01 0h24v24h-24z",
    fill: "none"
  }), React__default.createElement("path", {
    d: "M19.01 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 7.5c0 .83-.67 1.5-1.5 1.5.83 0 1.5.67 1.5 1.5V15c0 1.11-.9 2-2 2h-4v-2h4v-2h-2v-2h2V9h-4V7h4c1.1 0 2 .89 2 2v1.5z"
  }));
};

var useStyles = /*#__PURE__*/styles.makeStyles({
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
  return React__default.createElement(AppBar, {
    color: "default",
    position: "static"
  }, React__default.createElement(Toolbar, {
    disableGutters: true,
    variant: "dense"
  }, React__default.createElement(MarkButton, {
    format: "bold",
    icon: React__default.createElement(BoldIcon, null)
  }), React__default.createElement(MarkButton, {
    format: "italic",
    icon: React__default.createElement(ItalicIcon, null)
  }), React__default.createElement(MarkButton, {
    format: "underline",
    icon: React__default.createElement(UnderlinedIcon, null)
  }), React__default.createElement(MarkButton, {
    format: "strikethrough",
    icon: React__default.createElement(StrikethroughIcon, null)
  }), React__default.createElement(MarkButton, {
    format: "subscript",
    icon: React__default.createElement(SubscriptIcon, null)
  }), React__default.createElement(MarkButton, {
    format: "superscript",
    icon: React__default.createElement(SuperscriptIcon, null)
  }), React__default.createElement(Divider, {
    className: classes.divider,
    orientation: "vertical",
    flexItem: true
  }), React__default.createElement(BlockButton, {
    format: "h1",
    icon: React__default.createElement(H1Icon, null)
  }), React__default.createElement(BlockButton, {
    format: "h2",
    icon: React__default.createElement(H2Icon, null)
  }), React__default.createElement(BlockButton, {
    format: "h3",
    icon: React__default.createElement(H3Icon, null)
  }), React__default.createElement(Divider, {
    className: classes.divider,
    orientation: "vertical",
    flexItem: true
  }), React__default.createElement(BlockButton, {
    format: "align",
    align: "left",
    icon: React__default.createElement(AlignLeftIcon, null)
  }), React__default.createElement(BlockButton, {
    format: "align",
    align: "center",
    icon: React__default.createElement(AlignCenterIcon, null)
  }), React__default.createElement(BlockButton, {
    format: "align",
    align: "right",
    icon: React__default.createElement(AlignRightIcon, null)
  }), React__default.createElement(BlockButton, {
    format: "align",
    align: "justify",
    icon: React__default.createElement(AlignJustifyIcon, null)
  })));
};

/**
 * Element is used to render blocks based on a given type.
 */

var Element = function Element(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;
  var align = element.align,
      type = element.type;

  switch (type) {
    case "align":
      return React__default.createElement(Typography, Object.assign({
        component: "span",
        variant: "inherit",
        align: align
      }, attributes), children);

    case "h1":
      return React__default.createElement(Typography, Object.assign({
        variant: "h1",
        align: align
      }, attributes), children);

    case "h2":
      return React__default.createElement(Typography, Object.assign({
        variant: "h2",
        align: align
      }, attributes), children);

    case "h3":
      return React__default.createElement(Typography, Object.assign({
        variant: "h3",
        align: align
      }, attributes), children);

    default:
      return React__default.createElement(Typography, Object.assign({
        component: "p",
        align: align,
        variant: "body1"
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
    children = React__default.createElement("strong", null, children);
  }

  if (leaf.italic) {
    children = React__default.createElement("em", null, children);
  }

  if (leaf.underline) {
    children = React__default.createElement("u", null, children);
  }

  if (leaf.strikethrough) {
    children = React__default.createElement("s", null, children);
  }

  if (leaf.subscript) {
    children = React__default.createElement("sub", null, children);
  }

  if (leaf.superscript) {
    children = React__default.createElement("sup", null, children);
  }

  return React__default.createElement("span", Object.assign({}, attributes), children);
};

var withAlignment = function withAlignment(editor) {
  var normalizeNode = editor.normalizeNode;

  editor.normalizeNode = function (match) {
    var node = match[0],
        path = match[1]; // every node needs a standard alignment of 'left'

    if (!node.alignment) {
      slate.Transforms.setNodes(editor, {
        alignment: "left"
      }, {
        at: path
      });
      return;
    }

    normalizeNode(match);
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
  var editor = React.useMemo(function () {
    return slateReact.withReact(withAlignment(slate.createEditor()));
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
  }, React__default.createElement(EditorToolbar, null), React__default.createElement(slateReact.Editable, {
    renderElement: renderElement,
    renderLeaf: renderLeaf
  }));
};

exports.PageEditor = PageEditor;
//# sourceMappingURL=dicty-components-page-editor.cjs.development.js.map
