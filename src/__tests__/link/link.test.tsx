import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import { CustomEditor } from "../../types/editor"
import LinkButton from "../../components/buttons/LinkButton"
import LinkIcon from "../../components/icons/LinkIcon"
import withLinks from "../../plugins/withLinks"
import { input, output } from "./link.fixture"

describe("adding links", () => {
  it("should add new link", async () => {
    const editor = withLinks(input)

    jest.spyOn(SlateReact, "useSlate").mockReturnValue(editor as CustomEditor)

    render(<LinkButton icon={<LinkIcon />} />)

    const button = screen.getByLabelText("link")
    userEvent.click(button)
    // interact with link dialog
    const urlTextbox = screen.getByRole("textbox", { name: "URL" })
    const textTextbox = screen.getByRole("textbox", { name: "Text" })
    const addButton = screen.getByRole("button", { name: "Add Link" })
    userEvent.type(urlTextbox, "https://dictycr.org")
    userEvent.clear(textTextbox)
    userEvent.type(textTextbox, "dictycr")
    userEvent.click(addButton)
    await waitFor(() => {
      expect(editor.children).toEqual(output.children)
    })
  })
})
