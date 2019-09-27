// @flow
import React from "react"

type Props = {
  /** Material-UI styling */
  classes: Object,
}

const HelpModalContent = ({ classes }: Props) => (
  <>
    <h3>Pasting Content</h3>
    <p>
      Some content from HTML pages can be copied and pasted directly into the
      editor. Just go to any page, highlight what you want to copy then paste it
      into the editor.
    </p>
    <p>
      Upload any images{" "}
      <a
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/dictyBase/migration-data/issues/9">
        here
      </a>
      .
    </p>
    <p>
      Upload any PDFs or DOCX files{" "}
      <a
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/dictyBase/migration-data/issues/10">
        here
      </a>
      .
    </p>
    <p>
      <strong>Known bugs:</strong> Lists sometimes have a mind of their own, but
      there are some workarounds for formatting. You can use SHIFT + ENTER to
      add a space between list items.
    </p>
    <h3>Keyboard Shortcuts</h3>
    <ul>
      <li>Align Left: CTRL + SHIFT + L</li>
      <li>Align Center: CTRL + SHIFT + C</li>
      <li>Align Right: CTRL + SHIFT + R</li>
      <li>Align Justify: CTRL + SHIFT + J</li>
      <li>Bold: CTRL + B</li>
      <li>Divider: CTRL + ]</li>
      <li>Italic: CTRL + I</li>
      <li>Strikethrough: CTRL + SHIFT + S</li>
      <li>Underline: CTRL + U</li>
    </ul>
    <h3>Found a bug? Got a request?</h3>
    <p>
      Post an issue in the{" "}
      <em>
        <a
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/dictyBase/dicty-frontpage/issues">
          dicty-frontpage
        </a>
      </em>{" "}
      repo.
    </p>
  </>
)

export default HelpModalContent
