import React from "react"
import { shallow } from "enzyme"
import MarkButtons from "./MarkButtons"
import { BoldButton } from "../../plugins/bold"
import { ItalicButton } from "../../plugins/italic"
import { StrikethroughButton } from "../../plugins/strikethrough"
import { SubscriptButton } from "../../plugins/subscript"
import { SuperscriptButton } from "../../plugins/superscript"
import { UnderlineButton } from "../../plugins/underline"

describe("MarkButtons", () => {
  const wrapper = shallow(<MarkButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(BoldButton)).toHaveLength(1)
      expect(wrapper.find(ItalicButton)).toHaveLength(1)
      expect(wrapper.find(StrikethroughButton)).toHaveLength(1)
      expect(wrapper.find(SubscriptButton)).toHaveLength(1)
      expect(wrapper.find(SuperscriptButton)).toHaveLength(1)
      expect(wrapper.find(UnderlineButton)).toHaveLength(1)
    })
  })
})
