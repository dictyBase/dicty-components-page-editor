/// <reference types="react" />
declare type Props = {
    /** Function called when cancel button is clicked */
    handleCancel: () => void;
    /** Function called when save button is clicked */
    handleSave: () => void;
};
/**
 * ActionButtons contains the cancel and save buttons used at the bottom of the editor.
 */
declare const ActionButtons: ({ handleCancel, handleSave }: Props) => JSX.Element;
export default ActionButtons;
