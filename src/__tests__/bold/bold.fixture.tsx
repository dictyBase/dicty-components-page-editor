/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"

const input = ((
  <editor>
    <p>
      <stext>test</stext>
    </p>
    <selection>
      <anchor path={[0, 0]} offset={0} />
      <focus path={[0, 0]} offset={4} />
    </selection>
  </editor>
) as any) as Editor

const output = ((
  <editor>
    <p>
      <stext bold>test</stext>
      <cursor />
    </p>
  </editor>
) as any) as Editor

export { input, output }
