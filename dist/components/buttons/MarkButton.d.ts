/// <reference types="react" />
declare type Props = {
    /** Type of mark (i.e. "bold") */
    format: string;
    /** Icon to display in button */
    icon: JSX.Element;
};
/**
 * MarkButton displays a button with associated click logic for toggling a mark.
 */
declare const MarkButton: ({ format, icon }: Props) => JSX.Element;
export default MarkButton;
