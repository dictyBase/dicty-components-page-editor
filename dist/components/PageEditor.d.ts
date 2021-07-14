/// <reference types="react" />
import { Descendant } from "slate";
import { Theme } from "@material-ui/core/styles";
declare type Props = {
    /** Page content taken from JSON */
    pageContent?: string;
    /** Whether the editor is in read-only mode or not */
    readOnly: boolean;
    /** Material-UI theme */
    theme?: Theme;
    /** Indicates if condensed (inline) toolbar should be shown */
    inline?: boolean;
    /** Function called when user clicks save button */
    handleSave: (value: Descendant[]) => void;
    /** Function called when user clicks cancel button */
    handleCancel: () => void;
};
/**
 * PageEditor is the main editor component.
 */
declare const PageEditor: ({ pageContent, readOnly, theme, inline, handleSave, handleCancel, }: Props) => JSX.Element;
export default PageEditor;
