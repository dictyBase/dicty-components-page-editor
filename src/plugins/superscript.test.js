import React from "react"
import { shallow } from "enzyme"
import { SuperscriptButton, SuperscriptMark } from "./superscript"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/superscript", () => {
  describe("SuperscriptMark", () => {
    const wrapper = shallow(<SuperscriptMark>test</SuperscriptMark>)

    it("should make text Superscript", () => {
      expect(wrapper.find("sup").length).toBe(1)
    })
    it("should render correct children", () => {
      expect(wrapper.contains("test")).toBe(true)
    })
  })

  describe("SuperscriptButton", () => {
    const props = {
      editor: {},
    }
    const wrapper = shallow(<SuperscriptButton {...props} />)
    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton)).toHaveLength(1)
      })
    })
  })
})
