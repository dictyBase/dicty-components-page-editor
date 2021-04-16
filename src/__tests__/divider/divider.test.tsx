import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import BlockButton from "../../components/buttons/BlockButton"
import DividerIcon from "../../components/icons/DividerIcon"
import { types } from "../../constants/types"
import { input, output } from "./divider.fixture"
import withNormalize from "../../plugins/withNormalize"

describe("divider element", () => {
  it("should add divider element with empty paragraph after", () => {
    const editor = withNormalize(input)

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    render(<BlockButton format={types.divider} icon={<DividerIcon />} />)
    const button = screen.getByLabelText("divider-button")
    userEvent.click(button)
    expect(editor.children).toEqual(output.children)
  })
})
