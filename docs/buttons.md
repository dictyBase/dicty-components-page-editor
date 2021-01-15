# Creating new buttons

The logic for handling buttons is found in the `BlockButton` and `MarkButton`
components.

## Adding new mark buttons

Marks are used for basic text formatting like bold, italic, underline, etc. Our
use cases are covered but this is the process for adding one:

1. Add a new type in [src/types/index.ts](../src/types/index.ts). Mark types
   belong in the `MarkFormat` type.
2. Add a new conditional for this type inside [Leaf.tsx](../src/components/Leaf.tsx)
   with appropriate formatting.
3. Add a corresponding button to the [toolbar](<(../src/components/Toolbar.tsx)>).

## Adding new block buttons

Blocks refer to HTML block-level elements like headers, lists, etc. Adding new
block buttons is very similar to the above.

1. Add a new type in [src/types/index.ts](../src/types/index.ts). Block types
   belong in the `BlockFormat` type.
2. Add a new conditional for this type inside [Element.tsx](../src/components/Element.tsx)
   with appropriate formatting.
3. Add a corresponding button to the [toolbar](<(../src/components/Toolbar.tsx)>).
