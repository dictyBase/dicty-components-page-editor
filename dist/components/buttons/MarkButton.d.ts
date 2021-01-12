/// <reference types="react" />
import { MarkFormat } from "../../types";
declare type Props = {
    /** Type of mark */
    format: MarkFormat;
    /** Icon to display in button */
    icon: JSX.Element;
};
/**
 * MarkButton displays a button with associated click logic for toggling a mark.
 */
declare const MarkButton: ({ format, icon }: Props) => JSX.Element;
export default MarkButton;
