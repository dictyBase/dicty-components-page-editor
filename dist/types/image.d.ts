declare type Image = {
    /** Image URL */
    url: string;
    /** Description of image (used as alt attribute) */
    description: string;
    /** Width of image */
    width?: number;
    /** Height of image */
    height?: number;
    /** URL used if image is also a link */
    linkURL?: string;
};
export type { Image };
