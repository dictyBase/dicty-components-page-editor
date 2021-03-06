import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import { CustomEditor } from "../../types/editor"
import LineSpacingButton from "../../components/buttons/LineSpacingButton"
import LineSpacingIcon from "../../components/icons/LineSpacingIcon"
import { input, output } from "./lineSpacing.fixture"

describe("line spacing", () => {
  it("should add line spacing", () => {
    const editor = input

    jest.spyOn(SlateReact, "useSlate").mockReturnValue(editor as CustomEditor)

    render(<LineSpacingButton icon={<LineSpacingIcon />} />)

    const button = screen.getByRole("button", {
      name: "line spacing",
    })
    userEvent.click(button)
    const item = screen.getByRole("menuitem", {
      name: "2.0",
    })
    userEvent.click(item)
    expect(editor.children).toEqual(output.children)
  })
})
