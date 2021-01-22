# Creating new buttons

The logic for handling buttons is found in the `BlockButton` and `MarkButton`
components.

## Adding new mark buttons

Marks are used for basic text formatting like bold, italic, underline, etc. Our
use cases are covered but this is the process for adding one:

1. Add a new conditional for desired type inside [Leaf.tsx](../src/components/Leaf.tsx)
   with appropriate formatting.
2. Add a corresponding button to the [toolbar](<(../src/components/Toolbar.tsx)>).

## Adding new block buttons

Blocks refer to HTML block-level elements like headers, lists, etc. Adding new
block buttons is very similar to the above.

1. Add a new conditional for desired type inside [Element.tsx](../src/components/Element.tsx)
   with appropriate formatting.
2. Add a corresponding button to the [toolbar](<(../src/components/Toolbar.tsx)>).
