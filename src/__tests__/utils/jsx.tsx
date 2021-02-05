import { createHyperscript } from "slate-hyperscript"
import { alignments, types } from "../../constants/types"

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
