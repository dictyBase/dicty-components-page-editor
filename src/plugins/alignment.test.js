import React from "react"
import { shallow } from "enzyme"
import { AlignmentLeftButton } from "./alignment"
import ToolbarButton from "../toolbar/ToolbarButton"

describe("editor/plugins/alignment", () => {
  describe("AlignmentLeftButton", () => {
    const wrapper = shallow(<AlignmentLeftButton />)

    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton)).toHaveLength(1)
      })
    })
  })
})
