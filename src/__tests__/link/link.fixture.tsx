/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"
import { types } from "../../constants/types"

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
      Insert link{" "}
      <element type={types.link} url="https://dictycr.org">
        dictycr
      </element>
      .
    </p>
  </editor>
) as any) as Editor

export { input, output }
