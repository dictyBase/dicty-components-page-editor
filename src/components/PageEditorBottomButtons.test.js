import React from "react"
import { shallow } from "enzyme"
import PageEditorBottomButtons from "./PageEditorBottomButtons"
import Button from "@material-ui/core/Button"

describe("components/editor/PageEditorBottomButtons", () => {
  const wrapper = shallow(<PageEditorBottomButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders two buttons", () => {
      expect(wrapper.dive().find(Button)).toHaveLength(2)
    })
  })
})
