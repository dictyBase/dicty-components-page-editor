import React from "react"
import { shallow } from "enzyme"
import { SubscriptButton, SubscriptMark } from "./subscript"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/subscript", () => {
  describe("SubscriptMark", () => {
    const wrapper = shallow(<SubscriptMark>test</SubscriptMark>)

    it("should make text Subscript", () => {
      expect(wrapper.find("sub").length).toBe(1)
    })
    it("should render correct children", () => {
      expect(wrapper.contains("test")).toBe(true)
    })
  })

  describe("SubscriptButton", () => {
    const props = {
      editor: {},
    }
    const wrapper = shallow(<SubscriptButton {...props} />)
    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton)).toHaveLength(1)
      })
    })
  })
})
