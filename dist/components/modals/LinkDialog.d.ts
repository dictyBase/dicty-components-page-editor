import React from "react";
declare type Props = {
    /** Function to call when  */
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Determines if modal is open */
    linkModalOpen: boolean;
    /** Toggle link modal */
    setLinkModalOpen: (arg0: boolean) => void;
    /** URL for link */
    url: string;
    /** Set link URL state */
    setURL: (arg0: string) => void;
    /** Text for link */
    text: string;
    /** Set text for link */
    setText: (arg0: string) => void;
    /** Determines if link is for email */
    emailChecked: boolean;
    /** Toggle email checkbox */
    setEmailChecked: (arg0: boolean) => void;
};
declare const LinkDialog: ({ handleClick, linkModalOpen, setLinkModalOpen, url, setURL, text, setText, emailChecked, setEmailChecked, }: Props) => JSX.Element;
export default LinkDialog;
