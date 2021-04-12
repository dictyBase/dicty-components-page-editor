# Unit Testing

Unit tests are created with help from the [slate-hyperscript](https://github.com/ianstormtaylor/slate/tree/master/packages/slate-hyperscript)
library.

Using its `createHyperscript` method, we define a list of [custom elements and creators](<(../src/__tests/utils/jsx.tsx)>) that correlate with our defined Slate data structure.

To test a specific feature, first create a new directory inside the `__tests__` folder (i.e. `align`, `heading`, etc.). From here, create a new test fixture file that includes the `/** @jsx jsx */` pragma as its very first line. This is a compiler directive that tells the compiler how it should handle the contents of the file (calling the jsx function). Add another line to import the `jsx` from the utils file then define an expected input and output.

Both input and output should use the `<editor>` as its top level element, with everything inside of it defining the test arrangements. These can use a combination of our defined elements and those provided by [slate-hyperscript](https://github.com/ianstormtaylor/slate/blob/master/packages/slate-hyperscript/src/hyperscript.ts#L18).

Next create the actual tests inside a separate file (i.e. `align.test.tsx`). These tests should import the defined `input` and `output` and assert that they are equal. The `link` folder has examples of how to test [individual functions](../src/__tests__/link/upsertLink.test.tsx) and how to test using the [rendered components](../src/__tests__/link/link.test.tsx).
