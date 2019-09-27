import React from "react"
import { shallow } from "enzyme"
import { VideoButton } from "./video"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/video", () => {
  describe("VideoButton", () => {
    const wrapper = shallow(<VideoButton />)

    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.dive().find(ToolbarButton).length).toBe(1)
      })
    })
  })
})
