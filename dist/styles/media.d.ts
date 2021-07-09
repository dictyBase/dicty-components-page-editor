declare type StyleProps = {
    align: string | unknown;
    selected: boolean;
    focused: boolean;
};
declare const useStyles: (props: StyleProps) => Record<"container" | "media", string>;
export default useStyles;
