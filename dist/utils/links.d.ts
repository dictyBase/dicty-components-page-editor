import { Editor, Node } from "slate";
import { Link } from "../types/link";
declare const linkNodeOptions: {
    match: (n: Node) => boolean;
};
declare const isLinkActive: (editor: Editor) => boolean;
/**
 * upsertLink updates or adds a new link. If there is no selection,
 * it adds a new link with the provided text. Otherwise it will wrap the
 * selection with a link node using the user's link and text.
 */
declare const upsertLink: (editor: Editor, link: Link) => void;
declare const getLinkSelection: (editor: Editor) => {
    url: string;
    text: string;
};
export { linkNodeOptions, isLinkActive, upsertLink, getLinkSelection };
