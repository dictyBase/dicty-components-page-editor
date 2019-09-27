import React from "react"
import { shallow } from "enzyme"
import { Editor } from "slate-react"
import PageEditorBottomButtons from "./PageEditorBottomButtons"
import EditorToolbar from "./toolbar/EditorToolbar"
import { PageEditor } from "./PageEditor"

describe("frontpage/components/editor/PageEditor", () => {
  describe("initial render if readOnly", () => {
    const props = {
      classes: {
        editor: "editor",
      },
      pageContent: true,
      readOnly: true,
    }
    const wrapper = shallow(<PageEditor {...props} />)
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(Editor)).toHaveLength(1)
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
      newPage: true,
      readOnly: false,
    }
    const wrapper = shallow(<PageEditor {...props} />)
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
