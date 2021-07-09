import React from "react";
declare const useAnchorElement: () => {
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    handleMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleClose: (_: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};
export default useAnchorElement;
