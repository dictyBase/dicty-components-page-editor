import { BaseEditor, BaseText } from "slate"
import { ReactEditor } from "slate-react"
import { HistoryEditor } from "slate-history"

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

type CustomText = BaseText & {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  subscript?: boolean
  superscript?: boolean
  fontFamily?: string
  fontSize?: string
  fontColor?: string
  lineSpacing?: string
  [key: string]: any
}

type CustomElement = {
  type: string
  align?: string
  fontFamily?: string
  fontSize?: string
  fontColor?: string
  url?: string
  lineSpacing?: string
  children: CustomText[]
  [key: string]: any
}

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

export type { CustomEditor, CustomElement, CustomText }
