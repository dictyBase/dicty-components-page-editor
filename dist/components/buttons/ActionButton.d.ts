/// <reference types="react" />
import { ButtonProps } from "@material-ui/core/Button";
declare type Props = {
    /** Function called when button is clicked */
    handleClick: () => void;
    /** Text displayed inside button */
    text: string;
    /** Color of button */
    color?: ButtonProps["color"];
};
/**
 * ActionButton is a small button used for actions like saving and cancelling.
 */
declare const ActionButton: ({ handleClick, text, color }: Props) => JSX.Element;
export default ActionButton;
