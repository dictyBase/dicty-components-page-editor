import React from "react"
import { shallow } from "enzyme"
import TableButtons from "./TableButtons"
import {
  InsertTableButton,
  InsertTableColumnButton,
  InsertTableRowButton,
  RemoveTableColumnButton,
  RemoveTableRowButton,
  RemoveTableButton,
} from "../../plugins/table"

describe("TableButtons", () => {
  const wrapper = shallow(<TableButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(InsertTableButton)).toHaveLength(1)
      expect(wrapper.find(InsertTableColumnButton)).toHaveLength(1)
      expect(wrapper.find(InsertTableRowButton)).toHaveLength(1)
      expect(wrapper.find(RemoveTableColumnButton)).toHaveLength(1)
      expect(wrapper.find(RemoveTableRowButton)).toHaveLength(1)
      expect(wrapper.find(RemoveTableButton)).toHaveLength(1)
    })
  })
})
