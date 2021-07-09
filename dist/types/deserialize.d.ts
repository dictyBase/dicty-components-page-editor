declare type DeserializeElement = {
    [key: string]: (el: HTMLElement) => {
        type: string;
        [key: string]: any;
    } | undefined;
};
declare type DeserializeLeafValue = {
    [key: string]: (el: HTMLElement) => {
        [key: string]: any;
    } | undefined;
};
declare type DeserializeLeaf = {
    [key: string]: DeserializeLeafValue;
};
declare type DeserializeHTML = {
    element?: DeserializeElement;
    leaf?: DeserializeLeaf;
};
export { DeserializeElement, DeserializeLeafValue, DeserializeLeaf, DeserializeHTML, };
