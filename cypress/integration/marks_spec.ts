const toggleMarks = (mark: string) => {
  const text = "That's gold, Jerry! Gold!"
  cy.visit("/")

  cy.findByRole("textbox")
    .clear()
    .type("{movetostart}")
    .type(text)
    .should("contain.text", text)

  cy.findByRole("textbox").type("{selectall}")

  cy.findByRole("button", {
    name: mark,
  }).click()

  cy.findByTestId(mark).should("contain.text", text)

  cy.findByRole("button", {
    name: mark,
  }).click()

  cy.findAllByTestId(mark).should("not.exist")
}

describe("toggling marks", () => {
  it("toggles bold", () => {
    toggleMarks("bold")
  })

  it("toggles italic", () => {
    toggleMarks("italic")
  })

  it("toggles underline", () => {
    toggleMarks("underline")
  })

  it("toggles strikethrough", () => {
    toggleMarks("strikethrough")
  })

  it("toggles subscript", () => {
    toggleMarks("subscript")
  })

  it("toggles superscript", () => {
    toggleMarks("superscript")
  })
})
