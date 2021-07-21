import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import { CustomEditor } from "../../types/editor"
import FontColorButton from "../../components/buttons/FontColorButton"
import { input, output } from "./fontColor.fixture"

describe("font color", () => {
  it("should add custom font color", () => {
    const editor = input

    jest.spyOn(SlateReact, "useSlate").mockReturnValue(editor as CustomEditor)

    render(<FontColorButton />)

    const button = screen.getByLabelText("font color")
    userEvent.click(button)
    const textbox = screen.getByRole("textbox")
    userEvent.clear(textbox)
    userEvent.type(textbox, "987987")
    expect(editor.children).toEqual(output.children)
  })
})
