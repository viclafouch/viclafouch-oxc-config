import { RuleTester } from 'oxlint/plugins-dev'
import { noHooklessUseFunction } from '../rules/no-hookless-use-function'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('no-hookless-use-function', noHooklessUseFunction, {
  valid: [
    {
      name: 'a hook that calls a React hook',
      code: 'const useToggle = () => {\n  const [isOn, setIsOn] = useState(false)\n  return [isOn, setIsOn]\n}'
    },
    {
      name: 'a hook declaration that calls a custom hook',
      code: 'function useCurrentUser() {\n  return useQuery(userQuery)\n}'
    },
    {
      name: 'a hook that calls React.useContext',
      code: 'const useTheme = () => React.useContext(ThemeContext)'
    },
    {
      name: 'a hook that calls the bare use of React 19',
      code: 'const useUser = (promise) => use(promise)'
    },
    {
      name: 'a plain function without the use prefix',
      code: "const getFullName = (user) => [user.first, user.last].join(' ')"
    },
    {
      name: 'a name that only starts with use',
      code: 'const username = () => user.name'
    },
    {
      name: 'an anonymous callback with no name',
      code: 'items.map((item) => item.id)'
    }
  ],
  invalid: [
    {
      name: 'an arrow hook that calls no hook',
      code: "const useFullName = (user) => [user.first, user.last].join(' ')",
      errors: [{ messageId: 'hookless', data: { name: 'useFullName' } }]
    },
    {
      name: 'a hook declaration that calls no hook',
      code: 'export function useFormat(value) {\n  return format(value)\n}',
      errors: [{ messageId: 'hookless', data: { name: 'useFormat' } }]
    },
    {
      name: 'a function expression hook that calls no hook',
      code: 'const useSum = function (a, b) {\n  return a + b\n}',
      errors: [{ messageId: 'hookless', data: { name: 'useSum' } }]
    },
    {
      name: 'a hook whose only hook call runs in a nested callback',
      code: 'const useHandlers = () => ({\n  onClick: () => useTracking()\n})',
      errors: [{ messageId: 'hookless', data: { name: 'useHandlers' } }]
    }
  ]
})
