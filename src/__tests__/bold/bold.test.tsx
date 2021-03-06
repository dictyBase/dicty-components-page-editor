import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import { CustomEditor } from "../../types/editor"
import MarkButton from "../../components/buttons/MarkButton"
import BoldIcon from "../../components/icons/BoldIcon"
import { types } from "../../constants/types"
import { input, output } from "./bold.fixture"

describe("bold marks", () => {
  it("should add bold mark", () => {
    const editor = input

    jest.spyOn(SlateReact, "useSlate").mockReturnValue(editor as CustomEditor)

    render(<MarkButton format={types.bold} icon={<BoldIcon />} />)

    const button = screen.getByLabelText("bold")
    userEvent.click(button)
    expect(editor.children).toEqual(output.children)
  })
})
