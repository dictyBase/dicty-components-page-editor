_What kind of plugin is BoldButton?_

This is a framework plugin that will bundle all logic into a single reusable library.

_How does a developer implement Bold plugin?_

First, by using hotkey:

1. Create a `BoldMark` component that handles actual rendering.
   `const BoldMark = ({ children }) => <strong>{children}</strong>`

2. Write the keyboard-based handler function (if applicable). This takes `(event, editor, next)` as arguments. Here you need to write a conditional to check for a certain key press (for bold, it would be CTRL + B), then return whatever you want to happen (i.e. toggleMark("bold")).

```js
const BoldKeyboardShortcut = (event, editor, next) => {
  if (isMod(event) && event.key === "b") {
    return editor.toggleMark("bold")
  }
  return next()
}
```

3. Write a plugin that handles the key press as an internal function, then pass that into the `plugins` array for the editor.

```js
const BoldPlugin = options => ({
  onKeyDown(...args) {
    return BoldKeyboardShortcut(...args)
  },
})
```

4. Implement this use case into the `renderMark` function (inside the `renderers` folder). This is a switch statement that receives the mark type (in this case, "bold" as specified by `editor.toggleMark("bold`) then renders the HTML. This is not inside the plugin directory itself; it is used by the editor.

```jsx
const renderMark = (props: Props) => {
  const { mark } = props

  switch (mark.type) {
    case "bold":
      return <BoldMark {...props} />
  }
}
```

For clickable buttons, the process is slightly different.

1. You still need to create a `BoldMark` component to handle the rendering.
2. Rather than writing a plugin function, now you need to create `BoldButton`, a React component that receives `editor` as a prop. In this component, you need to connect a click handler to the button. In this click handler, you need to decide what to do to the value that is being changed. So for the bold button, it would be this:
   `editor.toggleMark("bold")`
3. This still needs to be implemented in the `renderMark` function as specified in step 4 above.
4. Finally, add your button component into your toolbar and make sure it receives the necessary props (`editor`).
