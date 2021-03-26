import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import FontFamilyDropdown from "../../components/dropdowns/FontFamilyDropdown"
import { input, output } from "./fontFamily.fixture"

describe("font family", () => {
  it("should add font family", () => {
    const editor = input

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    render(<FontFamilyDropdown />)

    const dropdown = screen.getByRole("button", {
      name: "Roboto",
    })
    userEvent.click(dropdown)
    const option = screen.getByRole("option", {
      name: "Lato",
    })
    userEvent.click(option)
    expect(editor.children).toEqual(output.children)
  })
})
