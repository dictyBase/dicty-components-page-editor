import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import LinkButton from "../../components/buttons/LinkButton"
import LinkIcon from "../../components/icons/LinkIcon"
import withLinks from "../../plugins/withLinks"
import { input, output } from "./link.fixture"

describe("adding links", () => {
  it("should add new link", () => {
    const editor = withLinks(input)

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    jest.spyOn(window, "prompt").mockReturnValue("https://dictycr.org")

    render(<LinkButton icon={<LinkIcon />} />)

    const button = screen.getByLabelText("link-button")
    userEvent.click(button)
    expect(editor.children).toEqual(output.children)
  })
})
