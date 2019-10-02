import React from "react"
import { shallow } from "enzyme"
import Separator from "./Separator"

describe("editor/toolbar/Separator", () => {
  const wrapper = shallow(<Separator />)

  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial div", () => {
      expect(wrapper.find("div")).toHaveLength(1)
    })
  })
})
