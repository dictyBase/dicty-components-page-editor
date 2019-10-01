import React from "react"
import { shallow } from "enzyme"
import AlignmentButtons from "./AlignmentButtons"
import {
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
  AlignmentJustifyButton,
} from "../../plugins/alignment"

describe("AlignmentButtons", () => {
  const wrapper = shallow(<AlignmentButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(AlignmentLeftButton)).toHaveLength(1)
      expect(wrapper.find(AlignmentCenterButton)).toHaveLength(1)
      expect(wrapper.find(AlignmentRightButton)).toHaveLength(1)
      expect(wrapper.find(AlignmentJustifyButton)).toHaveLength(1)
    })
  })
})
