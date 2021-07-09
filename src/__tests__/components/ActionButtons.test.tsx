import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import ActionButtons from "../../components/ActionButtons"

describe("ActionButtons component", () => {
  const handleCancelSpy = jest.fn()
  const handleSaveSpy = jest.fn()
  it("should render save and cancel buttons", () => {
    render(
      <ActionButtons
        handleCancel={handleCancelSpy}
        handleSave={handleSaveSpy}
      />,
    )
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })

  it("should call functions when clicked", () => {
    render(
      <ActionButtons
        handleCancel={handleCancelSpy}
        handleSave={handleSaveSpy}
      />,
    )

    const saveButton = screen.getByRole("button", { name: "Save" })
    const cancelButton = screen.getByRole("button", { name: "Cancel" })

    userEvent.click(saveButton)
    expect(handleSaveSpy).toHaveBeenCalled()

    userEvent.click(cancelButton)
    expect(handleCancelSpy).toHaveBeenCalled()
  })
})
