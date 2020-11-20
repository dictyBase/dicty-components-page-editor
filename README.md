# dicty-components-page-editor 📝
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/dicty-components-page-editor)  
![GitHub action](https://github.com/dictyBase/dicty-components-page-editor/workflows/Node%20CI/badge.svg)
[![codecov](https://codecov.io/gh/dictyBase/dicty-components-page-editor/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictyBase/dicty-components-page-editor)  
[![Dependency Status](https://david-dm.org/dictyBase/dicty-components-page-editor/develop.svg?style=flat-square)](https://david-dm.org/dictyBase/dicty-components-page-editor/develop)
[![devDependency Status](https://david-dm.org/dictyBase/dicty-components-page-editor/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictyBase/dicty-components-page-editor/develop?type=dev)  
[![Technical debt](https://badgen.net/codeclimate/tech-debt/dictyBase/dicty-components-page-editor)](https://codeclimate.com/github/dictyBase/dicty-components-page-editor/trends/technical_debt)
[![Issues](https://badgen.net/codeclimate/issues/dictyBase/dicty-components-page-editor)](https://codeclimate.com/github/dictyBase/dicty-components-page-editor/issues)
[![Maintainability percentage](https://badgen.net/codeclimate/maintainability-percentage/dictyBase/dicty-components-page-editor)](https://codeclimate.com/github/dictyBase/dicty-components-page-editor)  
![Issues](https://badgen.net/github/issues/dictyBase/dicty-components-page-editor)
![Open Issues](https://badgen.net/github/open-issues/dictyBase/dicty-components-page-editor)
![Closed Issues](https://badgen.net/github/closed-issues/dictyBase/dicty-components-page-editor)
![Total PRS](https://badgen.net/github/prs/dictyBase/dicty-components-page-editor)
![Open PRS](https://badgen.net/github/open-prs/dictyBase/dicty-components-page-editor)
![Closed PRS](https://badgen.net/github/closed-prs/dictyBase/dicty-components-page-editor)
![Merged PRS](https://badgen.net/github/merged-prs/dictyBase/dicty-components-page-editor)  
![Commits](https://badgen.net/github/commits/dictyBase/dicty-components-page-editor/develop)
![Last commit](https://badgen.net/github/last-commit/dictyBase/dicty-components-page-editor/develop)
![Branches](https://badgen.net/github/branches/dictyBase/dicty-components-page-editor)
![Tags](https://badgen.net/github/tags/dictyBase/dicty-components-page-editor)
![GitHub repo size](https://img.shields.io/github/repo-size/dictyBase/dicty-components-page-editor?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictyBase/dicty-components-page-editor?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictyBase/dicty-components-page-editor)](https://codeclimate.com/github/dictyBase/dicty-components-page-editor/code)  
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,dictyBase/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9476993)
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,DSC/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9438930)

> dictyBase page editor built using Slatejs

## Install

```bash
yarn add dictyBase/dicty-components-page-editor
```

To install a specific version, add a tag to the end. You can see the latest release on
the right side of this repository page.

```bash
yarn add dictyBase/dicty-components-page-editor#1.0.0
```

## Usage

```jsx
import { PageEditor } from "dicty-components-page-editor"

const Demo = () => {
  const onCancel = () => {}
  const onSave = () => {}

  return (
    <PageEditor
      pageContent={data.content}
      onCancel={onCancel}
      onSave={onSave}
      readOnly={false}
      newPage
    />
  )
}
```

### Props

- `pageContent` (string) - fetched page content _(optional)_
- `readOnly` (boolean) - determines if editor is in read-only mode
- `newPage` (boolean) - identifier for creating a new page _(optional)_
- `onSave` (function) - called when user clicks the save button
- `onCancel` (function) - called when user clicks the cancel button
- `inline` (boolean) - used to display a smaller toolbar for inline editing _(optional)_

## Development

- Clone the `develop` branch of this repository
- Run `yarn install`
- Create a new branch (i.e. `feature/foo-plugin`)
- Complete any necessary work.
- If creating a new plugin, there is a [guide](./docs/bold.md) that
  walks you through the process using the bold plugin as a guide.
- Commit all changes and open a pull request. If all checks pass, it is ready
  to merge to `develop`.

If you are ready to cut a new release, you can then merge into `master`. This
will trigger a GitHub Action that uses `semantic-release` to create a new tag
automatically.

### Live Development

To open a demo and see your changes happen live, first run `yarn start` from the
root directory. Then run `yarn start` from the `/example` directory.

## Dependencies

This editor relies on the these core libraries (hence the large bundle size):

![Slate](https://img.shields.io/bundlephobia/min/slate/0.44.13?label=slate)
![slate-react](https://img.shields.io/bundlephobia/min/slate-react/0.21.20?label=slate-react)
![Immutable](https://img.shields.io/bundlephobia/min/immutable/3.8.2?label=immutable)

## Active Developers

<a href="https://sourcerer.io/cybersiddhu"><img src="https://sourcerer.io/assets/avatar/cybersiddhu" height="80px" alt="Sourcerer"></a>
<a href="https://sourcerer.io/wildlifehexagon"><img src="https://sourcerer.io/assets/avatar/wildlifehexagon" height="80px" alt="Sourcerer"></a>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.erichartline.net/"><img src="https://avatars3.githubusercontent.com/u/13489381?v=4" width="100px;" alt=""/><br /><sub><b>Eric Hartline</b></sub></a><br /><a href="https://github.com/dictyBase/dicty-components-page-editor/issues?q=author%3Awildlifehexagon" title="Bug reports">🐛</a> <a href="https://github.com/dictyBase/dicty-components-page-editor/commits?author=wildlifehexagon" title="Code">💻</a> <a href="#content-wildlifehexagon" title="Content">🖋</a> <a href="#design-wildlifehexagon" title="Design">🎨</a> <a href="https://github.com/dictyBase/dicty-components-page-editor/commits?author=wildlifehexagon" title="Documentation">📖</a> <a href="#maintenance-wildlifehexagon" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://cybersiddhu.github.com/"><img src="https://avatars3.githubusercontent.com/u/48740?v=4" width="100px;" alt=""/><br /><sub><b>Siddhartha Basu</b></sub></a><br /><a href="https://github.com/dictyBase/dicty-components-page-editor/issues?q=author%3Acybersiddhu" title="Bug reports">🐛</a> <a href="https://github.com/dictyBase/dicty-components-page-editor/commits?author=cybersiddhu" title="Code">💻</a> <a href="#content-cybersiddhu" title="Content">🖋</a> <a href="https://github.com/dictyBase/dicty-components-page-editor/commits?author=cybersiddhu" title="Documentation">📖</a> <a href="#maintenance-cybersiddhu" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!