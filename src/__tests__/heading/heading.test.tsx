import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import { CustomEditor } from "../../types/editor"
import BlockButton from "../../components/buttons/BlockButton"
import H1Icon from "../../components/icons/H1Icon"
import { types } from "../../constants/types"
import { input, output } from "./heading.fixture"

describe("heading elements", () => {
  it("should add h1 element", () => {
    const editor = input

    jest.spyOn(SlateReact, "useSlate").mockReturnValue(editor as CustomEditor)

    render(<BlockButton format={types.h1} icon={<H1Icon />} />)

    const button = screen.getByLabelText("h1-button")
    userEvent.click(button)
    expect(editor.children).toEqual(output.children)
  })
})
