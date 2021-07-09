/// <reference types="react" />
declare type Props = {
    /** List of values to display in dropdown */
    values: string[];
    /** Default value of dropdown */
    defaultValue: string;
    /** Mark to add to Slate data */
    mark: string;
    /** Minimum width of dropdown */
    minWidth?: string;
};
declare const Dropdown: ({ values, defaultValue, mark, minWidth, }: Props) => JSX.Element;
export default Dropdown;
