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

const output = ((
  <editor>
    <alignCenter>
      test
      <cursor />
    </alignCenter>
  </editor>
) as any) as Editor

export { input, output }
