/// <reference types="react" />
import { RenderElementProps } from "slate-react";
import { TypographyProps } from "@material-ui/core/Typography";
interface ElementProps extends RenderElementProps {
    element: {
        /** Type of element to render */
        type: string;
        /** Text alignment (left, center, right, justify) */
        align?: TypographyProps["align"];
        /** URL used for links */
        url?: string;
        /** Any children to render */
        children: any;
    };
}
/**
 * Element is used to render blocks based on a given type.
 */
declare const Element: ({ attributes, children, element }: ElementProps) => JSX.Element;
export default Element;
