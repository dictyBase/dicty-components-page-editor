/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"

const input = ((
  <editor>
    <p>
      <stext>row 1</stext>
    </p>
    <selection>
      <anchor path={[0, 0]} offset={0} />
      <focus path={[0, 0]} offset={5} />
    </selection>
  </editor>
) as any) as Editor

const output = ((
  <editor>
    <lineSpacing>
      <stext>row 1</stext>
      <cursor />
    </lineSpacing>
  </editor>
) as any) as Editor

export { input, output }
