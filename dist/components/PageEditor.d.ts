/// <reference types="react" />
declare type Props = {
    /** Page content taken from JSON */
    pageContent?: string;
    /** Whether the editor is in read-only mode or not */
    readOnly: boolean;
    /** Function called when user clicks save button */
    handleSave: () => void;
    /** Function called when user clicks cancel button */
    handleCancel: () => void;
};
/**
 * PageEditor is the main editor component.
 */
declare const PageEditor: ({ pageContent, readOnly, handleSave, handleCancel, }: Props) => JSX.Element;
export default PageEditor;
