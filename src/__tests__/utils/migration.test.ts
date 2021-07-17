import convertSlate047 from "../../utils/migration"
import { oldContent, newContent } from "./migrationMockData"

describe("data migration", () => {
  it("should convert old data to new format", () => {
    const converted = convertSlate047(oldContent)
    expect(converted).toEqual(newContent)
  })
})
