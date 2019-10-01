import React from "react"
import { shallow } from "enzyme"
import FeatureButtons from "./FeatureButtons"
import { ImageButton } from "../../plugins/image"
import { LinkButton } from "../../plugins/link"
import { InsertInitialTableButton } from "../../plugins/table"
import { VideoButton } from "../../plugins/video"

describe("FeatureButtons", () => {
  const wrapper = shallow(<FeatureButtons />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(ImageButton)).toHaveLength(1)
      expect(wrapper.find(LinkButton)).toHaveLength(1)
      expect(wrapper.find(InsertInitialTableButton)).toHaveLength(1)
      expect(wrapper.find(VideoButton)).toHaveLength(1)
    })
  })
})
