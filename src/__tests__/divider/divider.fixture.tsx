/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"

const input = ((
  <editor>
    <p>test</p>
    <p>
      <cursor />
    </p>
  </editor>
) as any) as Editor

const output = ((
  <editor>
    <p>test</p>
    <divider>
      <text />
    </divider>
    <p>
      <cursor />
    </p>
  </editor>
) as any) as Editor

export { input, output }
