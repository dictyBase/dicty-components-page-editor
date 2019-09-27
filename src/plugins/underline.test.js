import React from "react"
import { shallow } from "enzyme"
import { UnderlineButton, UnderlineMark } from "./underline"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/underline", () => {
  describe("UnderlineMark", () => {
    const wrapper = shallow(<UnderlineMark>test</UnderlineMark>)

    it("should make text Underline", () => {
      expect(wrapper.find("u").length).toBe(1)
    })
    it("should render correct children", () => {
      expect(wrapper.contains("test")).toBe(true)
    })
  })

  describe("UnderlineButton", () => {
    const props = {
      editor: {},
    }
    const wrapper = shallow(<UnderlineButton {...props} />)
    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton)).toHaveLength(1)
      })
    })
  })
})
