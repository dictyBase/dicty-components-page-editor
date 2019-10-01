import React from "react"
import { shallow } from "enzyme"
import ListButtons from "./ListButtons"
import {
  OrderedListButton,
  UnorderedListButton,
  ListDecreaseIndentButton,
  ListIncreaseIndentButton,
} from "../../plugins/list"

describe("ListButtons", () => {
  const wrapper = shallow(<ListButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(OrderedListButton)).toHaveLength(1)
      expect(wrapper.find(UnorderedListButton)).toHaveLength(1)
      expect(wrapper.find(ListDecreaseIndentButton)).toHaveLength(1)
      expect(wrapper.find(ListIncreaseIndentButton)).toHaveLength(1)
    })
  })
})
