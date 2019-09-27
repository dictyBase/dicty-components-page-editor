import React from "react"
import { shallow } from "enzyme"
import PageEditorBottomButtons from "./PageEditorBottomButtons"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

describe("frontpage/components/editor/PageEditorBottomButtons", () => {
  const wrapper = shallow(<PageEditorBottomButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.dive().find(Grid)).toHaveLength(3)
      expect(wrapper.dive().find(Button)).toHaveLength(2)
    })
  })
})
