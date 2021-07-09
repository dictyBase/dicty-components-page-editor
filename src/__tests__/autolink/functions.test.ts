import {
  ids,
  getURLPrefix,
  validateText,
} from "../../components/buttons/AutolinkIDsButton"

describe("getURLPrefix", () => {
  it("should match pubmed prefix", () => {
    expect(getURLPrefix(ids.pubmed)).toEqual("/publication/")
  })
  it("should match go prefix", () => {
    expect(getURLPrefix(ids.go)).toEqual("https://www.ebi.ac.uk/QuickGO/term/")
  })
  it("should match gene prefix", () => {
    expect(getURLPrefix(ids.gene)).toEqual("/gene/")
  })
  it("should match strain prefix", () => {
    expect(getURLPrefix(ids.strain)).toEqual("/stockcenter/strains/")
  })
  it("should match plasmid prefix", () => {
    expect(getURLPrefix(ids.plasmid)).toEqual("/stockcenter/plasmids/")
  })
})

describe("validateText", () => {
  it("should return true for valid pubmed id", () => {
    expect(validateText(ids.pubmed, "123456789")).toBeTruthy()
  })
  it("should return false for invalid pubmed ids", () => {
    expect(validateText(ids.pubmed, "seinfeld")).toBeFalsy()
    expect(validateText(ids.pubmed, "DBS123456")).toBeFalsy()
  })

  it("should return true for valid go id", () => {
    expect(validateText(ids.go, "GO:999999")).toBeTruthy()
  })
  it("should return false for invalid go ids", () => {
    expect(validateText(ids.go, "GOADJIGB")).toBeFalsy()
    expect(validateText(ids.go, "DBS123456")).toBeFalsy()
  })

  it("should return true for valid gene ids", () => {
    expect(validateText(ids.gene, "DDB_987654")).toBeTruthy()
    expect(validateText(ids.gene, "sadA")).toBeTruthy()
  })

  it("should return true for valid strain id", () => {
    expect(validateText(ids.strain, "DBS999999")).toBeTruthy()
  })
  it("should return false for invalid strain ids", () => {
    expect(validateText(ids.strain, "auntydonna")).toBeFalsy()
    expect(validateText(ids.strain, "DBP902112")).toBeFalsy()
  })

  it("should return true for valid plasmid id", () => {
    expect(validateText(ids.plasmid, "DBP999999")).toBeTruthy()
  })
  it("should return false for invalid plasmid ids", () => {
    expect(validateText(ids.plasmid, "f1")).toBeFalsy()
    expect(validateText(ids.plasmid, "DBS123456")).toBeFalsy()
  })
})
