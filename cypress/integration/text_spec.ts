describe("example app", () => {
  it("inserts text when typed", () => {
    cy.visit("/")

    cy.findByRole("textbox")
      .type("{movetostart}")
      .type("Hello World")
      .should("contain.text", "Hello World")
  })
})
