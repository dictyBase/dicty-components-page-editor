/// <reference types="react" />
import { BlockFormat } from "../../types";
declare type Props = {
    /** Type of block */
    format: BlockFormat;
    /** Icon to display in button */
    icon: JSX.Element;
};
/**
 * BlockButton displays a button with associated click logic for toggling a block.
 */
declare const BlockButton: ({ format, icon }: Props) => JSX.Element;
export default BlockButton;
