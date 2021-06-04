/** @jsx jsx */

import { Editor } from "slate"
import jsx from "../utils/jsx"
import { upsertLink } from "../../components/buttons/LinkButton"
import withLinks from "../../plugins/withLinks"
import { types } from "../../constants/types"

const dictyURL = "https://dictycr.org"
const zomboURL = "https://www.zombo.com"

describe("upsertLink function", () => {
  it("should add new link", () => {
    const input = (
      <editor>
        <p>
          Insert link here: <cursor />.
        </p>
      </editor>
    ) as any as Editor

    const output = (
      <editor>
        <p>
          Insert link here:{" "}
          <element type={types.link} url={dictyURL}>
            dictycr
          </element>
          .
        </p>
      </editor>
    ) as any as Editor

    const editor = withLinks(input)
    upsertLink(editor, {
      url: dictyURL,
      text: "dictycr",
    })
    expect(input.children).toEqual(output.children)
  })

  it("should update existing link", () => {
    const input = (
      <editor>
        <p>
          Update this <anchor />
          <element type={types.link} url={dictyURL}>
            dictycr
          </element>
          <focus />.
        </p>
      </editor>
    ) as any as Editor

    const output = (
      <editor>
        <p>
          Update this{" "}
          <element type={types.link} url={zomboURL}>
            zombocom
          </element>
          .
        </p>
      </editor>
    ) as any as Editor

    const editor = withLinks(input)
    upsertLink(editor, {
      url: zomboURL,
      text: "zombocom",
    })
    expect(input.children).toEqual(output.children)
  })
})
