/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"

const input = ((
  <editor>
    <p>
      Insert link <anchor />
      here
      <focus />.
    </p>
  </editor>
) as any) as Editor

const output = ((
  <editor>
    <p>
      Insert link <link>here</link>.
    </p>
  </editor>
) as any) as Editor

export { input, output }
