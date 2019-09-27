import React from "react"
import { shallow } from "enzyme"
import { Editor } from "slate-react"
import PageEditorBottomButtons from "./PageEditorBottomButtons"
import EditorToolbar from "./toolbar/EditorToolbar"
import Authorization from "components/authentication/Authorization"
import { InlineEditor } from "./InlineEditor"

describe("frontpage/components/editor/InlineEditor", () => {
  describe("initial render if readOnly", () => {
    const props = {
      classes: {
        editor: "editor",
      },
      readOnly: true,
    }
    const wrapper = shallow(<InlineEditor {...props} />)
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(Editor)).toHaveLength(1)
      expect(wrapper.find(Authorization)).toHaveLength(1)
    })
    it("does not render toolbar", () => {
      expect(wrapper.find(EditorToolbar).exists()).toBeFalsy()
    })
  })

  describe("initial render if not readOnly", () => {
    const props = {
      classes: {
        editor: "editor",
      },
      readOnly: false,
    }
    const wrapper = shallow(<InlineEditor {...props} />)
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(Editor)).toHaveLength(1)
      expect(wrapper.find(EditorToolbar)).toHaveLength(1)
      expect(wrapper.find(PageEditorBottomButtons)).toHaveLength(1)
    })
  })
})
