/// <reference types="react" />
declare type Props = {
    /** Function to call when color is selected */
    handleChange: (value: string) => void;
    /** Active color of current text selection */
    activeColor: string;
};
/**
 * ColorPicker handles the display of the color picker.
 */
declare const ColorPicker: ({ handleChange, activeColor }: Props) => JSX.Element;
export default ColorPicker;
