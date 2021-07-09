/// <reference types="react" />
declare type Props = {
    /** Icon to display in button */
    icon: JSX.Element;
    /** Text alignment property */
    align: string;
};
/**
 * AlignButton displays a button with associated logic for adding the "align"
 * attribute.
 */
declare const AlignButton: ({ icon, align }: Props) => JSX.Element;
export default AlignButton;
