import { eslintCompatPlugin } from '@oxlint/plugins'
import { appFolders } from './rules/app-folders'
import { booleanFunctionName } from './rules/boolean-function-name'
import { booleanName } from './rules/boolean-name'
import { commentPolicy } from './rules/comment-policy'
import { componentPropsName } from './rules/component-props-name'
import { destructureInSignature } from './rules/destructure-in-signature'
import { envFile } from './rules/env-file'
import { functionalUpdate } from './rules/functional-update'
import { jsxBlankLine } from './rules/jsx-blank-line'
import { noChainedTypeAssertions } from './rules/no-chained-type-assertions'
import { noContextProvider } from './rules/no-context-provider'
import { noDomTestEnvironment } from './rules/no-dom-test-environment'
import { noForwardRef } from './rules/no-forward-ref'
import { noHooklessUseFunction } from './rules/no-hookless-use-function'
import { noKnownValueWidening } from './rules/no-known-value-widening'
import { noLeakedRender } from './rules/no-leaked-render'
import { noModuleStore } from './rules/no-module-store'
import { noNoopSubscribe } from './rules/no-noop-subscribe'
import { noRealTimeWaitInTests } from './rules/no-real-time-wait-in-tests'
import { noTestTimeoutOrUnreasonedSkip } from './rules/no-test-timeout-or-unreasoned-skip'
import { noUnknownReturns } from './rules/no-unknown-returns'
import { noWallClockInTests } from './rules/no-wall-clock-in-tests'
import { optionalLast } from './rules/optional-last'
import { paramsTypeName } from './rules/params-type-name'
import { queryNaming } from './rules/query-naming'
import { requireSuppressionReason } from './rules/require-suppression-reason'
import { serverFunctionFile } from './rules/server-function-file'

export default eslintCompatPlugin({
  meta: { name: 'viclafouch' },
  rules: {
    'app-folders': appFolders,
    'boolean-function-name': booleanFunctionName,
    'boolean-name': booleanName,
    'comment-policy': commentPolicy,
    'component-props-name': componentPropsName,
    'destructure-in-signature': destructureInSignature,
    'env-file': envFile,
    'functional-update': functionalUpdate,
    'jsx-blank-line': jsxBlankLine,
    'no-chained-type-assertions': noChainedTypeAssertions,
    'no-context-provider': noContextProvider,
    'no-dom-test-environment': noDomTestEnvironment,
    'no-forward-ref': noForwardRef,
    'no-hookless-use-function': noHooklessUseFunction,
    'no-known-value-widening': noKnownValueWidening,
    'no-leaked-render': noLeakedRender,
    'no-module-store': noModuleStore,
    'no-noop-subscribe': noNoopSubscribe,
    'no-real-time-wait-in-tests': noRealTimeWaitInTests,
    'no-test-timeout-or-unreasoned-skip': noTestTimeoutOrUnreasonedSkip,
    'no-unknown-returns': noUnknownReturns,
    'no-wall-clock-in-tests': noWallClockInTests,
    'optional-last': optionalLast,
    'params-type-name': paramsTypeName,
    'query-naming': queryNaming,
    'require-suppression-reason': requireSuppressionReason,
    'server-function-file': serverFunctionFile
  }
})
