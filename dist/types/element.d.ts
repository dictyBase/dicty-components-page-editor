import { RenderElementProps } from "slate-react";
import { TypographyProps } from "@material-ui/core/Typography";
declare type ElementProps = {
    element: {
        /** Type of element to render */
        type: string;
        /** Text alignment (left, center, right, justify) */
        align?: TypographyProps["align"];
        /** URL used for links and images */
        url?: string;
        /** Description of image (used for alt attribute) */
        description?: string;
        /** Width of element (image) */
        width?: string;
        /** Height of element (image) */
        height?: string;
        /** URL link used for an image */
        linkURL?: string;
        /** Line spacing of element (in pixels) */
        lineSpacing?: string;
        /** Any children to render */
        children: any;
    };
};
declare type Props = ElementProps & RenderElementProps;
export type { ElementProps, Props };
