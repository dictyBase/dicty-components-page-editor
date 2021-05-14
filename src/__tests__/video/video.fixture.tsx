/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"
import { types } from "../../constants/types"

const input = ((
  <editor>
    <p>
      <cursor />
    </p>
  </editor>
) as any) as Editor

const output = ((
  <editor>
    <p>
      <text />
    </p>
    <element
      type={types.video}
      url="https://www.youtube.com/embed/2hp14nY-qh0"
      width={300}
      height={300}>
      <text />
    </element>
    <p>
      <cursor />
    </p>
  </editor>
) as any) as Editor

export { input, output }
