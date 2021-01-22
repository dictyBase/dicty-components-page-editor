/// <reference types="react" />
import { RenderLeafProps } from "slate-react";
/**
 * Leaf is used to render text based on a given style.
 *
 * We need to use standard if conditionals and not if/else if because
 * a leaf can have multiple matching properties. If a leaf is both bold
 * and italic, for example, then ultimately this component would render:
 *
 * <span {...attributes}><strong><em>{children}</em></strong></span>
 */
declare const Leaf: ({ attributes, children, leaf }: RenderLeafProps) => JSX.Element;
export default Leaf;
