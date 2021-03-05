import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import AlignButton from "../../components/buttons/AlignButton"
import AlignCenterIcon from "../../components/icons/AlignCenterIcon"
import { alignments } from "../../constants/types"
import { input, output } from "./align.fixture"

describe("text alignment", () => {
  it("should center align", () => {
    const editor = input

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    render(<AlignButton align={alignments.center} icon={<AlignCenterIcon />} />)

    const button = screen.getByLabelText("align-center")
    userEvent.click(button)
    expect(editor.children).toEqual(output.children)
  })
})
