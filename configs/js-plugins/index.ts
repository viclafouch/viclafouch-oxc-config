import type { OxlintConfig } from 'oxlint'

type JsPlugin = NonNullable<OxlintConfig['jsPlugins']>[number]

export const VICLAFOUCH_PLUGIN = {
  name: 'viclafouch',
  specifier: '@viclafouch/oxc-config/plugins/viclafouch'
} satisfies JsPlugin

// React Doctor skips a file under a scripts, tools, tooling, cli or bin folder: set settings['react-doctor'].rootDirectory
export const REACT_DOCTOR_PLUGIN = {
  name: 'react-doctor',
  specifier: import.meta.resolve('oxlint-plugin-react-doctor')
} satisfies JsPlugin
