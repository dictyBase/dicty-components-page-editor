import React from "react"
import { shallow } from "enzyme"
import { StrikethroughButton, StrikethroughMark } from "./strikethrough"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/strikethrough", () => {
  describe("StrikethroughMark", () => {
    const wrapper = shallow(<StrikethroughMark>test</StrikethroughMark>)

    it("should make text Strikethrough", () => {
      expect(wrapper.find("del").length).toBe(1)
    })
    it("should render correct children", () => {
      expect(wrapper.contains("test")).toBe(true)
    })
  })

  describe("StrikethroughButton", () => {
    const props = {
      editor: {},
    }
    const wrapper = shallow(<StrikethroughButton {...props} />)
    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton)).toHaveLength(1)
      })
    })
  })
})
