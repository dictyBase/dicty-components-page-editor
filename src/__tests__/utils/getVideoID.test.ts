import getVideoID from "../../utils/getVideoID"

const alertMock = jest.fn()
global.alert = alertMock

describe("getVideoID function", () => {
  it("should handle standard YouTube URL", () => {
    expect(getVideoID("https://www.youtube.com/watch?v=2hp14nY-qh0")).toEqual(
      "2hp14nY-qh0",
    )
  })

  it("should handle standard Vimeo URL", () => {
    expect(getVideoID("https://vimeo.com/11653518")).toEqual("11653518")
  })

  it("should send alert and return full URL if not matching", () => {
    const fakeURL = "https://dictycr.org/notavideo"
    expect(getVideoID(fakeURL)).toEqual(fakeURL)
    expect(alertMock).toHaveBeenCalled()
  })
})
