import React from "react"
import { shallow } from "enzyme"
import { ImageButton } from "./image"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/image", () => {
  describe("ImageButton", () => {
    const wrapper = shallow(<ImageButton />)
    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton)).toHaveLength(1)
      })
    })
  })
})
