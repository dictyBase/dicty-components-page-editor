import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as SlateReact from "slate-react"
import VideoButton from "../../components/buttons/VideoButton"
import VideoIcon from "../../components/icons/VideoIcon"
import withMedia from "../../plugins/withMedia"
import withNormalize from "../../plugins/withNormalize"
import { input, output } from "./video.fixture"

describe("adding videos", () => {
  it("should add new video with link", async () => {
    const editor = withNormalize(withMedia(input))

    jest
      .spyOn(SlateReact, "useSlate")
      .mockReturnValue(editor as SlateReact.ReactEditor)

    render(<VideoButton icon={<VideoIcon />} />)

    const button = screen.getByLabelText("video-button")
    userEvent.click(button)
    // interact with video dialog
    const urlTextbox = screen.getByRole("textbox", { name: "URL" })
    const widthTextbox = screen.getByRole("spinbutton", {
      name: "Width (optional)",
    })
    const heightTextbox = screen.getByRole("spinbutton", {
      name: "Height (optional)",
    })
    const addButton = screen.getByRole("button", { name: "Add Video" })
    userEvent.type(urlTextbox, "https://www.youtube.com/watch?v=2hp14nY-qh0")
    userEvent.clear(widthTextbox)
    userEvent.type(widthTextbox, "300")
    userEvent.clear(heightTextbox)
    userEvent.type(heightTextbox, "300")

    userEvent.click(addButton)

    await waitFor(() => {
      expect(editor.children).toEqual(output.children)
    })
  })
})
