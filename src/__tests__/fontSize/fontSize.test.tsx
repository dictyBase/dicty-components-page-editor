import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import FontSizeDropdown from "../../components/dropdowns/FontSizeDropdown"
import { input, output } from "./fontSize.fixture"

describe("font size", () => {
  it("should add font size", () => {
    const editor = input

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    render(<FontSizeDropdown />)

    const dropdown = screen.getByRole("button", {
      name: "1rem",
    })
    userEvent.click(dropdown)
    const option = screen.getByRole("option", {
      name: "2rem",
    })
    userEvent.click(option)
    expect(editor.children).toEqual(output.children)
  })
})
