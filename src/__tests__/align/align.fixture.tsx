/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"

const input = ((
  <editor>
    <p>
      test
      <cursor />
    </p>
  </editor>
) as any) as Editor

const leftOutput = (
  <editor>
    <alignLeft>
      test
      <cursor />
    </alignLeft>
  </editor>
) as any

const centerOutput = (
  <editor>
    <alignCenter>
      test
      <cursor />
    </alignCenter>
  </editor>
) as any

const rightOutput = (
  <editor>
    <alignRight>
      test
      <cursor />
    </alignRight>
  </editor>
) as any

export { input, leftOutput, centerOutput, rightOutput }
