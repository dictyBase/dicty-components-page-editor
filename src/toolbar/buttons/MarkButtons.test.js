import React from "react"
import { shallow } from "enzyme"
import MarkButtons from "./MarkButtons"
import { BoldButton } from "components/editor/plugins/bold"
import { ItalicButton } from "components/editor/plugins/italic"
import { StrikethroughButton } from "components/editor/plugins/strikethrough"
import { SubscriptButton } from "components/editor/plugins/subscript"
import { SuperscriptButton } from "components/editor/plugins/superscript"
import { UnderlineButton } from "components/editor/plugins/underline"

describe("frontpage/components/editor/toolbar/buttons/MarkButtons", () => {
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
