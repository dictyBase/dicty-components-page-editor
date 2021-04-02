# Adding new mark properties

The process for adding new properties (i.e. `fontFamily`) to text nodes is fairly
straightforward.

1. Create component to display in the toolbar (i.e. `FontFamilyDropdown`)
2. Add component to [Toolbar.tsx](../src/components/Toolbar.tsx)
3. Add logic to the custom component for adding a new property. For marks, use the
   `Editor.addMark` method.
4. Add unit tests

Look at the use of `FontFamilyDropdown` as an example for this process.
