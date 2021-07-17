declare const oldContent: {
    object: string;
    document: {
        object: string;
        data: {};
        nodes: {
            object: string;
            type: string;
            data: {};
            nodes: {
                object: string;
                leaves: {
                    object: string;
                    text: string;
                    marks: {
                        object: string;
                        type: string;
                        data: {};
                    }[];
                }[];
            }[];
        }[];
    };
};
declare const newContent: {
    type: string;
    children: ({
        text: string;
        fontColor: string;
        fontSize: string;
        fontFamily: string;
        italic?: undefined;
    } | {
        text: string;
        italic: boolean;
        fontColor: string;
        fontSize: string;
        fontFamily: string;
    })[];
}[];
export { oldContent, newContent };
