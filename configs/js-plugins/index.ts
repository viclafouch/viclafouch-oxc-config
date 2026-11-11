import type { OxlintConfig } from 'oxlint'

type JsPlugin = NonNullable<OxlintConfig['jsPlugins']>[number]

export const VICLAFOUCH_PLUGIN = {
  name: 'viclafouch',
  specifier: '@viclafouch/oxc-config/plugins/viclafouch'
} satisfies JsPlugin
