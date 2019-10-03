# dicty-components-page-editor

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub action](https://github.com/dictyBase/dicty-components-page-editor/workflows/Node%20CI/badge.svg)
[![Dependency Status](https://david-dm.org/dictyBase/dicty-components-page-editor/develop.svg?style=flat-square)](https://david-dm.org/dictyBase/dicty-components-page-editor/develop)
[![devDependency Status](https://david-dm.org/dictyBase/dicty-components-page-editor/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictyBase/dicty-components-page-editor/develop?type=dev)
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/dicty-components-page-editor)  
![Commits](https://badgen.net/github/commits/dictyBase/dicty-components-page-editor/develop)
![Last commit](https://badgen.net/github/last-commit/dictyBase/dicty-components-page-editor/develop)
![Branches](https://badgen.net/github/branches/dictyBase/dicty-components-page-editor)
![Tags](https://badgen.net/github/tags/dictyBase/dicty-components-page-editor)
![GitHub repo size](https://img.shields.io/github/repo-size/dictyBase/dicty-components-page-editor?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictyBase/dicty-components-page-editor?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictyBase/dicty-components-page-editor)](https://codeclimate.com/github/dictyBase/dicty-components-page-editor/code)  
![Issues](https://badgen.net/github/issues/dictyBase/dicty-components-page-editor)
![Open Issues](https://badgen.net/github/open-issues/dictyBase/dicty-components-page-editor)
![Closed Issues](https://badgen.net/github/closed-issues/dictyBase/dicty-components-page-editor)
![Total PRS](https://badgen.net/github/prs/dictyBase/dicty-components-page-editor)
![Open PRS](https://badgen.net/github/open-prs/dictyBase/dicty-components-page-editor)
![Closed PRS](https://badgen.net/github/closed-prs/dictyBase/dicty-components-page-editor)
![Merged PRS](https://badgen.net/github/merged-prs/dictyBase/dicty-components-page-editor)  
[![Technical debt](https://badgen.net/codeclimate/tech-debt/dictyBase/dicty-components-page-editor)](https://codeclimate.com/github/dictyBase/dicty-components-page-editor/trends/technical_debt)
[![Issues](https://badgen.net/codeclimate/issues/dictyBase/dicty-components-page-editor)](https://codeclimate.com/github/dictyBase/dicty-components-page-editor/issues)
[![Maintainability percentage](https://badgen.net/codeclimate/maintainability-percentage/dictyBase/dicty-components-page-editor)](https://codeclimate.com/github/dictyBase/dicty-components-page-editor)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dictyBase/dicty-components-page-editor)](https://dependabot.com)  
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,dictyBase/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9476993)
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,DSC/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9438930)

> dictyBase page editor built using Slatejs

Documentation coming soon...

This app relies on the these core libraries (hence the large bundle size):

![Slate](https://img.shields.io/bundlephobia/min/slate/0.44.13?label=slate)
![slate-react](https://img.shields.io/bundlephobia/min/slate-react/0.21.20?label=slate-react)
![Immutable](https://img.shields.io/bundlephobia/min/immutable/3.8.2?label=immutable)

## Semantic Versioning

This app has been set up to use [semantic-release](https://github.com/semantic-release/semantic-release)
and [commitizen](https://github.com/commitizen/cz-cli). After adding a new commit
(`git add ...`), use `npm run cz` and follow the prompts to categorize and provide
more details about your commit. Once complete, push your changes to whatever branch
you are working on.

When you are ready to push to prod, you can use `semantic-release` to automate the
release process:

- Merge your changes into `master`
- Run `npx semantic-release`

**Important:** you MUST have an env variable stored for `GH_TOKEN` or `GITHUB_TOKEN`
that contains a GitHub [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
You can either pass this in manually when you run the script (i.e. `GH_TOKEN=XXX npx semantic-release`)
or you can [store your env variable locally](https://www.schrodinger.com/kb/1842).

This will look at your most recent commits since the last `git tag` and automatically
determine the appropriate version number for your release.
