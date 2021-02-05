/// <reference types="react" />
declare type Props = {
    /** Type of block (i.e. "h1") */
    format: string;
    /** Icon to display in button */
    icon: JSX.Element;
};
/**
 * BlockButton displays a button with associated click logic for toggling a block.
 */
declare const BlockButton: ({ format, icon }: Props) => JSX.Element;
export default BlockButton;
