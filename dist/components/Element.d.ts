/// <reference types="react" />
import { RenderElementProps } from "slate-react";
import { TypographyProps } from "@material-ui/core/Typography";
interface ElementProps extends RenderElementProps {
    element: {
        align?: TypographyProps["align"];
        children: any;
        type: {
            align?: boolean;
            h1?: boolean;
            h2?: boolean;
            h3?: boolean;
        };
    };
}
/**
 * Element is used to render blocks based on a given type.
 */
declare const Element: ({ attributes, children, element }: ElementProps) => JSX.Element;
export default Element;
