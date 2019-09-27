import React from "react"
import { shallow } from "enzyme"
import { BoldButton, BoldMark } from "./bold"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/bold", () => {
  describe("BoldMark", () => {
    const wrapper = shallow(<BoldMark>test</BoldMark>)

    it("should make text bold", () => {
      expect(wrapper.find("strong").length).toBe(1)
    })

    it("should render correct children", () => {
      expect(wrapper.contains("test")).toBe(true)
    })
  })

  describe("BoldButton", () => {
    const props = {
      editor: {},
    }
    const wrapper = shallow(<BoldButton {...props} />)

    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton)).toHaveLength(1)
      })
    })
  })
})
