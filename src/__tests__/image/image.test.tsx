import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import { CustomEditor } from "../../types/editor"
import ImageButton from "../../components/buttons/ImageButton"
import ImageIcon from "../../components/icons/ImageIcon"
import withMedia from "../../plugins/withMedia"
import withNormalize from "../../plugins/withNormalize"
import { input, output } from "./image.fixture"

describe("adding images", () => {
  it("should add new image with link", async () => {
    const editor = withNormalize(withMedia(input))

    jest.spyOn(SlateReact, "useSlate").mockReturnValue(editor as CustomEditor)

    render(<ImageButton icon={<ImageIcon />} />)

    const button = screen.getByLabelText("image")
    userEvent.click(button)
    // interact with image dialog
    const urlTextbox = screen.getByRole("textbox", { name: "URL" })
    const descriptionTextbox = screen.getByRole("textbox", {
      name: "Description",
    })
    const widthTextbox = screen.getByRole("spinbutton", {
      name: "Width (optional)",
    })
    const heightTextbox = screen.getByRole("spinbutton", {
      name: "Height (optional)",
    })
    const addButton = screen.getByRole("button", { name: "Add Image" })
    userEvent.type(
      urlTextbox,
      "https://eric.dictybase.dev/static/media/logo.bb256880.png",
    )
    userEvent.clear(descriptionTextbox)
    userEvent.type(descriptionTextbox, "dictyBase logo")
    userEvent.clear(widthTextbox)
    userEvent.type(widthTextbox, "300")
    userEvent.clear(heightTextbox)
    userEvent.type(heightTextbox, "300")

    // click checkbox to add link
    userEvent.click(screen.getByRole("checkbox"))
    const linkTextbox = screen.getByRole("textbox", {
      name: "Link URL",
    })
    userEvent.type(linkTextbox, "https://eric.dictybase.dev")

    userEvent.click(addButton)

    await waitFor(() => {
      expect(editor.children).toEqual(output.children)
    })
  })
})
