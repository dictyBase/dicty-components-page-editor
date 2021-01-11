import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withReact, Slate, Editable } from 'slate-react';

var PageEditor = function PageEditor() {
  // Create a Slate editor object that won't change across renders
  var editor = useMemo(function () {
    return withReact(createEditor());
  }, []);

  var _useState = useState([{
    type: "paragraph",
    children: [{
      text: "A line of text in a paragraph."
    }]
  }]),
      value = _useState[0],
      setValue = _useState[1];

  return React.createElement(Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(newValue) {
      return setValue(newValue);
    }
  }, React.createElement(Editable, null));
};

export { PageEditor };
//# sourceMappingURL=dicty-components-page-editor.esm.js.map
