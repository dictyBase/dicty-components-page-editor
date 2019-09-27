type ButtonProps = {
  editor: Object,
  /** Material-UI styling */
  classes?: Object,
}

type NodeProps = {
  children: any,
  attributes: Object,
  node: {
    data: Object,
  },
}

type ToolbarProps = {
  showTableOptions?: boolean,
  setShowTableOptions?: Function,
  classes?: Object,
  editor?: Object,
  value?: Object,
  onChange?: Function,
  page?: String,
  onSave?: Function,
}

export type { ButtonProps, NodeProps, ToolbarProps }
