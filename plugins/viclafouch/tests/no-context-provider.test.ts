import { RuleTester } from 'oxlint/plugins-dev'
import { noContextProvider } from '../rules/no-context-provider'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('no-context-provider', noContextProvider, {
  valid: [
    {
      name: 'a context rendered as its own provider',
      code: 'const App = () => <ThemeContext value={theme}><Page /></ThemeContext>'
    },
    {
      name: 'the Provider of a library component',
      code: 'const App = () => <Tooltip.Provider delayDuration={0}><Page /></Tooltip.Provider>'
    },
    {
      name: 'the Provider of a library component with spread props',
      code: 'const App = () => <Form.Provider {...form}><Page /></Form.Provider>'
    },
    {
      name: 'the Provider of a component created in the file by another factory',
      code: [
        'const Tooltip = createTooltip()',
        'const App = () => <Tooltip.Provider><Page /></Tooltip.Provider>'
      ].join('\n')
    },
    {
      name: 'an imported context without the Context suffix',
      code: [
        "import { Theme } from './theme'",
        'const App = () => <Theme.Provider value={theme}><Page /></Theme.Provider>'
      ].join('\n')
    },
    {
      name: 'a parameter that shadows a context created in the file',
      code: [
        'const Theme = createContext(null)',
        'const App = ({ Theme }) => <Theme.Provider><Page /></Theme.Provider>'
      ].join('\n')
    },
    {
      name: 'the Consumer of a context',
      code: 'const App = () => <ThemeContext.Consumer>{(theme) => <Page theme={theme} />}</ThemeContext.Consumer>'
    }
  ],
  invalid: [
    {
      name: 'a context named with the Context suffix',
      code: 'const App = () => <ThemeContext.Provider value={theme}><Page /></ThemeContext.Provider>',
      output:
        'const App = () => <ThemeContext value={theme}><Page /></ThemeContext>',
      errors: [{ messageId: 'contextProvider' }]
    },
    {
      name: 'a self-closing provider',
      code: 'const App = () => <ThemeContext.Provider value={theme} />',
      output: 'const App = () => <ThemeContext value={theme} />',
      errors: [{ messageId: 'contextProvider' }]
    },
    {
      name: 'a context under a namespace',
      code: 'const App = () => <ui.ThemeContext.Provider value={theme}><Page /></ui.ThemeContext.Provider>',
      output:
        'const App = () => <ui.ThemeContext value={theme}><Page /></ui.ThemeContext>',
      errors: [{ messageId: 'contextProvider' }]
    },
    {
      name: 'nested providers, fixed in one pass',
      code: [
        'const App = () => (',
        '  <AContext.Provider value={a}>',
        '    <BContext.Provider value={b}>',
        '      <CContext.Provider value={c} />',
        '    </BContext.Provider>',
        '  </AContext.Provider>',
        ')'
      ].join('\n'),
      output: [
        'const App = () => (',
        '  <AContext value={a}>',
        '    <BContext value={b}>',
        '      <CContext value={c} />',
        '    </BContext>',
        '  </AContext>',
        ')'
      ].join('\n'),
      errors: [
        { messageId: 'contextProvider', line: 2 },
        { messageId: 'contextProvider', line: 3 },
        { messageId: 'contextProvider', line: 4 }
      ]
    },
    {
      name: 'a provider passed to a prop of another provider',
      code: 'const App = () => <AContext.Provider value={a} fallback={<BContext.Provider value={b} />}><Page /></AContext.Provider>',
      output:
        'const App = () => <AContext value={a} fallback={<BContext value={b} />}><Page /></AContext>',
      errors: [
        { messageId: 'contextProvider' },
        { messageId: 'contextProvider' }
      ]
    },
    {
      name: 'a context created in the file without the Context suffix',
      code: [
        'const Theme = createContext(null)',
        'const App = () => <Theme.Provider value={theme}><Page /></Theme.Provider>'
      ].join('\n'),
      output: [
        'const Theme = createContext(null)',
        'const App = () => <Theme value={theme}><Page /></Theme>'
      ].join('\n'),
      errors: [{ messageId: 'contextProvider' }]
    },
    {
      name: 'a context created with React.createContext and a type argument',
      code: [
        'const App = () => <Theme.Provider value={theme}><Page /></Theme.Provider>',
        'const Theme = React.createContext<string | null>(null)'
      ].join('\n'),
      output: [
        'const App = () => <Theme value={theme}><Page /></Theme>',
        'const Theme = React.createContext<string | null>(null)'
      ].join('\n'),
      errors: [{ messageId: 'contextProvider' }]
    },
    {
      name: 'a context created in the file behind a type cast',
      code: [
        'const Theme = createContext(null) as Context<Theme>',
        'const App = () => <Theme.Provider value={theme} />'
      ].join('\n'),
      output: [
        'const Theme = createContext(null) as Context<Theme>',
        'const App = () => <Theme value={theme} />'
      ].join('\n'),
      errors: [{ messageId: 'contextProvider' }]
    }
  ]
})
