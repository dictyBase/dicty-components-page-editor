import { isFunction } from "./utils"

describe("editor/utils/isFunction", () => {
  const realFunction = () => {}
  const object = {}

  it("should correctly recognize function", () => {
    expect(isFunction(realFunction)).toBe(true)
  })

  it("should return false for non-function", () => {
    expect(isFunction(object)).toBe(false)
  })
})
