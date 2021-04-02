import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import FontColorButton from "../../components/buttons/FontColorButton"
import FontColorIcon from "../../components/icons/FontColorIcon"
import { input, output } from "./fontColor.fixture"

describe("font color", () => {
  it("should add custom font color", () => {
    const editor = input

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    render(<FontColorButton icon={<FontColorIcon />} />)

    const button = screen.getByLabelText("font-color-button")
    userEvent.click(button)
    const textbox = screen.getByRole("textbox")
    userEvent.clear(textbox)
    userEvent.type(textbox, "987987")
    expect(editor.children).toEqual(output.children)
  })
})
