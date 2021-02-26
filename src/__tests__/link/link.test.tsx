import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import LinkButton from "../../components/buttons/LinkButton"
import { input } from "./link.fixture"

global.prompt = () => "https://dictycr.org"

describe("adding links", () => {
  it("should add new link", () => {
    const editor = input

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    render(<LinkButton icon={<div />} />)

    const button = screen.getByLabelText("link-button")
    userEvent.click(button)
    screen.debug()
    // expect(editor.children).toEqual(output.children)
  })
})
