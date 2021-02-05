declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elementName: string]: any;
        }
    }
}
declare const jsx: <S extends "text" | "cursor" | "element" | "anchor" | "editor" | "focus" | "fragment" | "selection">(tagName: S, attributes?: Object | undefined, ...children: any[]) => ReturnType<({
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
