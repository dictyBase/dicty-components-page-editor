'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var slate = require('slate');
var slateReact = require('slate-react');

var PageEditor = function PageEditor() {
  // Create a Slate editor object that won't change across renders
  var editor = React.useMemo(function () {
    return slateReact.withReact(slate.createEditor());
  }, []);

  var _useState = React.useState([{
    type: "paragraph",
    children: [{
      text: "A line of text in a paragraph."
    }]
  }]),
      value = _useState[0],
      setValue = _useState[1];

  return React__default.createElement(slateReact.Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(newValue) {
      return setValue(newValue);
    }
  }, React__default.createElement(slateReact.Editable, null));
};

exports.PageEditor = PageEditor;
//# sourceMappingURL=dicty-components-page-editor.cjs.development.js.map
