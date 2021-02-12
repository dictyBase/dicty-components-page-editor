import { createHyperscript } from "slate-hyperscript"
import { alignments, types } from "../../constants/types"

/**
 * This file is used to transform the JSX output based on our specifications.
 * The createHyperscript function allows us to define how we want the elements
 * to look.
 *
 * To use these in our tests we need to import jsx and then add the "@jsx pragma"
 * at the top of the file. This is used to specify how the output of the React
 * Transformer should look (based on our definitions below).
 * See align.fixture.tsx for an example.
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: {
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
    block: {},
  },
})

export default jsx
