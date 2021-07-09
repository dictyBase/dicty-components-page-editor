/// <reference types="react" />
/**
 * PROCESS:
 *
 * 1. User clicks button
 * 2. Use generator function to find any matching nodes for that block type.
 * 3. If there are no matches then we do not mark that block as active.
 * 4. If the block is not active, then we set the nodes to match that format type.
 * 5. If there is a match, we mark that block as active for the first matching node.
 * 6. If the block is active, then we set the nodes back to the default type of
 *    'paragraph'.
 */
declare type Props = {
    /** Type of block (i.e. "h1") */
    format: string;
    /** Icon to display in button */
    icon: JSX.Element;
    /** Function to call when button is clicked */
    clickFn: () => void;
};
/**
 * BlockButton displays a button with associated click logic for toggling a
 * block.
 */
declare const BlockButton: ({ format, icon, clickFn }: Props) => JSX.Element;
export default BlockButton;
