import { createHyperscript } from "slate-hyperscript"
import { alignments, types } from "../../constants/types"

/**
 * This file is used to transform the JSX output based on our specifications.
 * The createHyperscript function allows us to define custom elements and creators.
 *
 * To use these in our tests we need to import jsx and then add the jsx pragma
 * at the top of the file. This is used to specify how the output of the React
 * Transformer should look (based on our definitions below).
 * See align.fixture.tsx for an example.
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: {
        [key: string]: any
        children?: React.ReactNode
      }
      // use this to avoid collision with React typings
      // see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0182cd9094aa081558a3c4bfc970bbdfb71d891d/types/react/index.d.ts#L3136
      stext: {
        bold?: boolean
        italic?: boolean
        underline?: boolean
        strikethrough?: boolean
        subscript?: boolean
        superscript?: boolean
        fontFamily?: string
        fontSize?: string
        fontColor?: string
        children?: React.ReactNode
      }
    }
  }
}

const jsx = createHyperscript({
  elements: {
    h1: { type: types.h1 },
    h2: { type: types.h2 },
    h3: { type: types.h3 },
    p: { type: types.paragraph },
    alignLeft: { type: types.paragraph, align: alignments.center },
    alignCenter: { type: types.paragraph, align: alignments.center },
    alignRight: { type: types.paragraph, align: alignments.center },
    link: { type: types.link },
  },
  creators: {
    // can't override react's text declaration so we create our own
    stext: (_, attrs, ...children) => jsx("text", attrs, ...children),
  },
})

export default jsx
