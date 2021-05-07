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
      type={types.image}
      url="https://eric.dictybase.dev/static/media/logo.bb256880.png"
      description="dictyBase logo"
      linkURL="https://eric.dictybase.dev"
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
