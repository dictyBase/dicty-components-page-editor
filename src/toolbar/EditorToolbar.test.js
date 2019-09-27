import React from "react"
import { shallow } from "enzyme"
import { EditorToolbar } from "./EditorToolbar"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

describe("editor/toolbar/EditorToolbar", () => {
  const props = {
    classes: {
      toolbar: {},
    },
  }
  const wrapper = shallow(<EditorToolbar {...props} />)

  describe("initial render", () => {
    it("always renders an AppBar", () => {
      expect(wrapper.find(AppBar).length).toBe(1)
    })
    it("always renders a Toolbar", () => {
      expect(wrapper.find(Toolbar).length).toBe(1)
    })
  })
})
