// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor } from "slate-react"
import { Value } from "slate"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import CreateIcon from "@material-ui/icons/Create"
import Authorization from "components/authentication/Authorization"
import EditorToolbar from "../toolbar/EditorToolbar"
import PageEditorBottomButtons from "./PageEditorBottomButtons"
import renderMark from "../renderers/renderMark"
import renderNode from "../renderers/renderNode"
import schema from "../schema/schema"
import { editInline, saveInlineEditing } from "actions/editablePages"
import styles from "./editorStyles"
import placeholder from "../data/existingPagePlaceholder.json"

/** Import custom plugins */
import { AlignmentPlugin } from "../plugins/alignment"
import { BoldPlugin } from "../plugins/bold"
import { DividerPlugin } from "../plugins/divider"
import { ItalicPlugin } from "../plugins/italic"
import { ListPlugin } from "../plugins/list"
import { StrikethroughPlugin } from "../plugins/strikethrough"
import { TablePlugin } from "../plugins/table"
import { UnderlinePlugin } from "../plugins/underline"

/**
 * All of the plugins that go into our editor
 * These are generally keyboard shortcuts
 */
const plugins = [
  AlignmentPlugin(),
  BoldPlugin(),
  DividerPlugin(),
  ItalicPlugin(),
  ListPlugin,
  StrikethroughPlugin(),
  TablePlugin,
  UnderlinePlugin(),
]

type Ref = { current: any | null }

type Props = {
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
  /** Action that saves inline editor content to API server */
  saveInlineEditing: Function,
  /** Action creator to edit inline content */
  editInline: Function,
  /** React Router's match object */
  match: Object,
  /** Whether the editor is in read-only mode or not */
  readOnly: boolean,
  /** ID of current logged in user */
  userId: string,
  /** Material-UI styling */
  classes: Object,
}

type State = {
  /** This is the initial value of the editable page content. */
  value: Object,
  /** Determines whether the editor is read only or not */
  readOnly: boolean,
}

/**
 * This is a reusable Slate inline page editor component.
 * It is a pared down version of the PageEditor component
 * with specific inline editing functions and authorization.
 */

export class InlineEditor extends Component<Props, State> {
  editor: Ref // necessary for Flow
  constructor(props: Props) {
    super(props)
    if (props.page) {
      this.state = {
        // Initial value of editor
        value: Value.fromJSON(JSON.parse(props.page.data.attributes.content)),
        readOnly: true,
      }
    } else {
      this.state = {
        // set default value for any page route refreshing
        value: Value.fromJSON(placeholder),
        readOnly: props.readOnly,
      }
    }
    this.editor = React.createRef()
  }

  onChange = ({ value }: Object) => {
    this.setState({ value })
  }

  onEdit = (event: SyntheticEvent<>) => {
    event.preventDefault()
    this.setState({
      readOnly: false,
    })
    const { editInline, page } = this.props
    editInline(page.data.attributes.content)
  }

  onCancel = () => {
    const { value } = this.state
    this.setState({
      value,
      readOnly: true,
    })
  }

  // on save, save the value to the content API server
  onSave = () => {
    const { value } = this.state
    const { page, saveInlineEditing, userId } = this.props

    const content = JSON.stringify(value.toJSON())
    const body = {
      id: page.data.id,
      data: {
        id: page.data.id,
        type: "contents",
        attributes: {
          updated_by: userId,
          content,
        },
      },
    }
    saveInlineEditing(page.data.id, body)
    this.setState(value)
  }

  render() {
    const { readOnly, value } = this.state
    const { classes, page } = this.props

    if (readOnly) {
      return (
        <>
          <Editor
            className={classes.editor}
            value={value}
            onChange={this.onChange}
            renderMark={renderMark}
            renderNode={renderNode}
            readOnly={readOnly}
            plugins={plugins}
            schema={schema}
            ref={this.editor}
          />
          <Authorization
            render={({ canEditPages, verifiedToken }) => (
              <div>
                {canEditPages && verifiedToken && readOnly && (
                  <span>
                    <Button
                      className={classes.editButton}
                      color="primary"
                      onClick={this.onEdit}
                      title="Edit">
                      <CreateIcon className={classes.icon} /> Edit
                    </Button>
                  </span>
                )}
              </div>
            )}
          />
        </>
      )
    }

    return (
      <>
        <EditorToolbar
          editor={this.editor.current}
          page={page}
          onSave={this.onSave}
        />
        <Editor
          className={classes.editor}
          value={value}
          onChange={this.onChange}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
          plugins={plugins}
          schema={schema}
          ref={this.editor}
        />
        <PageEditorBottomButtons
          onSave={this.onSave}
          onCancel={this.onCancel}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  if (state.auth.user) {
    return {
      userId: state.auth.user.data.id,
    }
  }
  return {}
}

export default connect(
  mapStateToProps,
  { editInline, saveInlineEditing },
)(withStyles(styles)(InlineEditor))
