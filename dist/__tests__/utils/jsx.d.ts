/// <reference types="react" />
/**
 * This file is used to transform the JSX output based on our specifications.
 * The createHyperscript function allows us to define custom elements and creators.
 *
 * To use these in our tests we need to import jsx and then add the jsx pragma
 * at the top of the file. This is used to specify how the output of the React
 * Transformer should look (based on our definitions below).
 * See align.fixture.tsx for an example.
 */
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elementName: string]: {
                [key: string]: any;
                children?: React.ReactNode;
            };
            stext: {
                bold?: boolean;
                italic?: boolean;
                underline?: boolean;
                strikethrough?: boolean;
                subscript?: boolean;
                superscript?: boolean;
                fontFamily?: string;
                fontSize?: string;
                fontColor?: string;
                lineSpacing?: string;
                children?: React.ReactNode;
            };
        }
    }
}
declare const jsx: <S extends "cursor" | "text" | "element" | "anchor" | "editor" | "focus" | "fragment" | "selection">(tagName: S, attributes?: Object | undefined, ...children: any[]) => ReturnType<({
    anchor: typeof import("slate-hyperscript/dist/creators").createAnchor;
    cursor: typeof import("slate-hyperscript/dist/creators").createCursor;
    editor: typeof import("slate-hyperscript/dist/creators").createEditor;
    element: typeof import("slate-hyperscript/dist/creators").createElement;
    focus: typeof import("slate-hyperscript/dist/creators").createFocus;
    fragment: typeof import("slate-hyperscript/dist/creators").createFragment;
    selection: typeof import("slate-hyperscript/dist/creators").createSelection;
    text: typeof import("slate-hyperscript/dist/creators").createText;
} | {
    anchor: typeof import("slate-hyperscript/dist/creators").createAnchor;
    cursor: typeof import("slate-hyperscript/dist/creators").createCursor;
    editor: typeof import("slate-hyperscript/dist/creators").createEditor;
    element: typeof import("slate-hyperscript/dist/creators").createElement;
    focus: typeof import("slate-hyperscript/dist/creators").createFocus;
    fragment: typeof import("slate-hyperscript/dist/creators").createFragment;
    selection: typeof import("slate-hyperscript/dist/creators").createSelection;
    text: typeof import("slate-hyperscript/dist/creators").createText;
})[S]>;
export default jsx;
