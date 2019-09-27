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
} from "components/editor/plugins/table"

describe("frontpage/components/editor/toolbar/buttons/TableButtons", () => {
  const wrapper = shallow(<TableButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.dive().find(InsertTableButton)).toHaveLength(1)
      expect(wrapper.dive().find(InsertTableColumnButton)).toHaveLength(1)
      expect(wrapper.dive().find(InsertTableRowButton)).toHaveLength(1)
      expect(wrapper.dive().find(RemoveTableColumnButton)).toHaveLength(1)
      expect(wrapper.dive().find(RemoveTableRowButton)).toHaveLength(1)
      expect(wrapper.dive().find(RemoveTableButton)).toHaveLength(1)
    })
  })
})
