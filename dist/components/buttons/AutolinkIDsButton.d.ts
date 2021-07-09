/// <reference types="react" />
declare const ids: {
    pubmed: string;
    go: string;
    gene: string;
    strain: string;
    plasmid: string;
};
declare const getURLPrefix: (item: string) => string;
declare const validateText: (item: string, text: string) => boolean;
/**
 * AutolinkIDsButton displays a button and dropdown for IDs that can be autolinked.
 */
declare const AutolinkIDsButton: () => JSX.Element;
export { ids, getURLPrefix, validateText };
export default AutolinkIDsButton;
