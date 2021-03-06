import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import LinkButton from "../../components/buttons/LinkButton"
import LinkIcon from "../../components/icons/LinkIcon"
import withLinks from "../../plugins/withLinks"
import { input, output } from "./link.fixture"

describe("adding links", () => {
  it("should add new link", async () => {
    const editor = withLinks(input)

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    render(<LinkButton icon={<LinkIcon />} />)

    const button = screen.getByLabelText("link-button")
    userEvent.click(button)
    const urlTextbox = screen.getAllByRole("textbox")[0]
    const textTextbox = screen.getAllByRole("textbox")[1]
    const addButton = screen.getByRole("button", { name: "Add Link" })
    userEvent.type(urlTextbox, "https://dictycr.org")
    userEvent.type(textTextbox, "")
    userEvent.click(addButton)
    await waitFor(() => {
      expect(editor.children).toEqual(output.children)
    })
  })
})
