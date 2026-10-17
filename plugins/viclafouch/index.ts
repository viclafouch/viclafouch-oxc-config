import { eslintCompatPlugin } from '@oxlint/plugins'
import { componentPropsName } from './rules/component-props-name'
import { noChainedTypeAssertions } from './rules/no-chained-type-assertions'
import { noContextProvider } from './rules/no-context-provider'
import { noForwardRef } from './rules/no-forward-ref'
import { noKnownValueWidening } from './rules/no-known-value-widening'
import { noLeakedRender } from './rules/no-leaked-render'
import { noUnknownReturns } from './rules/no-unknown-returns'

export default eslintCompatPlugin({
  meta: { name: 'viclafouch' },
  rules: {
    'component-props-name': componentPropsName,
    'no-chained-type-assertions': noChainedTypeAssertions,
    'no-context-provider': noContextProvider,
    'no-forward-ref': noForwardRef,
    'no-known-value-widening': noKnownValueWidening,
    'no-leaked-render': noLeakedRender,
    'no-unknown-returns': noUnknownReturns
  }
})
