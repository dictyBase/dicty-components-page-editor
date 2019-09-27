import React from "react"
import { shallow } from "enzyme"
import HeadingButtons from "./HeadingButtons"
import { H1Button, H2Button, H3Button } from "components/editor/plugins/heading"

describe("frontpage/components/editor/toolbar/buttons/HeadingButtons", () => {
  const wrapper = shallow(<HeadingButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(H1Button)).toHaveLength(1)
      expect(wrapper.find(H2Button)).toHaveLength(1)
      expect(wrapper.find(H3Button)).toHaveLength(1)
    })
  })
})
