/// <reference types="react" />
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
};
/**
 * PageEditor is the main editor component.
 */
declare const PageEditor: ({ pageContent, readOnly, theme, inline, }: Props) => JSX.Element;
export default PageEditor;
