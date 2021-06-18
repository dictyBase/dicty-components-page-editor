import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import { CustomEditor } from "../../types/editor"
import BlockButton from "../../components/buttons/BlockButton"
import DividerIcon from "../../components/icons/DividerIcon"
import { types } from "../../constants/types"
import { input, output } from "./divider.fixture"
import withNormalize from "../../plugins/withNormalize"
import { toggleBlock } from "../../utils/blocks"

describe("divider element", () => {
  it("should add divider element with empty paragraph after", () => {
    const editor = withNormalize(input)

    jest.spyOn(SlateReact, "useSlate").mockReturnValue(editor as CustomEditor)

    render(
      <BlockButton
        format={types.divider}
        icon={<DividerIcon />}
        clickFn={() => toggleBlock(editor, types.divider)}
      />,
    )
    const button = screen.getByLabelText("divider")
    userEvent.click(button)
    expect(editor.children).toEqual(output.children)
  })
})
