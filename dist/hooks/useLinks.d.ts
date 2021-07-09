import React from "react";
declare const useLinks: () => {
    link: {
        url: string;
        text: string;
    };
    setLink: React.Dispatch<React.SetStateAction<{
        url: string;
        text: string;
    }>>;
    linkDialogOpen: boolean;
    setLinkDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddLink: () => void;
};
export default useLinks;
