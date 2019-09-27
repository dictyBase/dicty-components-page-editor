import React from "react"
import { shallow } from "enzyme"
import { ItalicButton, ItalicMark } from "./italic"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/italic", () => {
  describe("ItalicMark", () => {
    const wrapper = shallow(<ItalicMark>test</ItalicMark>)

    it("should make text Italic", () => {
      expect(wrapper.find("em").length).toBe(1)
    })
    it("should render correct children", () => {
      expect(wrapper.contains("test")).toBe(true)
    })
  })

  describe("ItalicButton", () => {
    const props = {
      editor: {},
    }
    const wrapper = shallow(<ItalicButton {...props} />)
    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton)).toHaveLength(1)
      })
    })
  })
})
