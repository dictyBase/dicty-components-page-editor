import React, { useMemo, useState, useCallback } from 'react';
import { Editor, Transforms, Element as Element$1, createEditor } from 'slate';
import { useSlate, withReact, Slate, Editable } from 'slate-react';
import IconButton from '@material-ui/core/IconButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
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
  var editor = useSlate(); // when button is clicked, toggle the mark within the editor

  var handleClick = function handleClick(event) {
    event.preventDefault();
    toggleBlock(editor, format);
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
  }), React.createElement(BlockButton, {
    format: "h1",
    icon: React.createElement("span", null, "1")
  }), React.createElement(BlockButton, {
    format: "h2",
    icon: React.createElement("span", null, "2")
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
