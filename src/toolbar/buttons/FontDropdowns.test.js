import React from "react"
import { shallow } from "enzyme"
import FontDropdowns from "./FontDropdowns"
import { FontFamilyDropdown } from "../../plugins/fontfamily"
import { FontSizeDropdown } from "../../plugins/fontsize"
import Separator from "../Separator"

describe("FontDropdowns", () => {
  const wrapper = shallow(<FontDropdowns />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(FontFamilyDropdown)).toHaveLength(1)
      expect(wrapper.find(FontSizeDropdown)).toHaveLength(1)
      expect(wrapper.find(Separator)).toHaveLength(1)
    })
  })
})
