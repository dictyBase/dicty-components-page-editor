import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Image from "../components/Image"
import { types } from "../constants/types"

describe("Image component", () => {
  const element = {
    type: types.image,
    url: "https://eric.dictybase.dev/static/media/logo.bb256880.png",
    description: "dictyBase logo",
    width: "300",
    height: "300",
    children: [],
  }

  it("should render image as link", () => {
    const linkURL = "http://zombo.com"
    const linkElement = {
      ...element,
      linkURL: linkURL,
    }

    render(
      // @ts-ignore
      <Image element={linkElement} attributes={{}}>
        <div>test content</div>
      </Image>,
    )

    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()

    const link = screen.getByRole("link", { name: element.description })
    expect(link).toBeInTheDocument()
  })

  it("should render image without link", () => {
    render(
      // @ts-ignore
      <Image element={element} attributes={{}}>
        <div>test content</div>
      </Image>,
    )

    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()

    const link = screen.queryByRole("link", { name: element.description })
    expect(link).not.toBeInTheDocument()
  })
})
