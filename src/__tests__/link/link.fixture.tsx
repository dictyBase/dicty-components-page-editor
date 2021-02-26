/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"

const input = ((
  <editor>
    <p>
      insert link <anchor />
      here
      <focus />
    </p>
  </editor>
) as any) as Editor

const output = ((
  <editor>
    <p>
      <link>here</link>
    </p>
  </editor>
) as any) as Editor

export { input, output }
