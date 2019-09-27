import React from "react"
import { mount } from "enzyme"
import ToolbarButton from "./ToolbarButton"
import Button from "@material-ui/core/Button"

describe("editor/toolbar/ToolbarButton", () => {
  const wrapper = mount(<ToolbarButton>test</ToolbarButton>)

  describe("initial render", () => {
    it("always renders an Button", () => {
      expect(wrapper.find(Button).length).toBe(1)
    })
  })

  describe("handleClick", () => {
    // what happens when user clicks button?
    // wrapper.find(Button).simulate("click")
    // wrapper.debug()
  })
})
