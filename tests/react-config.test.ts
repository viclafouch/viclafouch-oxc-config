import { rmSync } from 'node:fs'
import { createLintWorkDir, lintFile } from './lint-file'

const COMPONENT_PROPS_NAME = 'viclafouch(component-props-name)'
const NO_CONTEXT_PROVIDER = 'viclafouch(no-context-provider)'
const NO_FORWARD_REF = 'viclafouch(no-forward-ref)'
const NO_LEAKED_RENDER = 'viclafouch(no-leaked-render)'
const RESTRICTED_TYPES = 'typescript(no-restricted-types)'

describe('react config', () => {
  let workDir: string

  beforeAll(() => {
    workDir = createLintWorkDir('react-config', [
      "import { defineConfig } from 'oxlint'",
      "import react from '../configs/react.ts'",
      '',
      'export default defineConfig({ extends: [react] })'
    ])
  })

  afterAll(() => {
    rmSync(workDir, { recursive: true, force: true })
  })

  describe('component props name', () => {
    it('fails a .tsx component typed with a bare Props', () => {
      const diagnostics = lintFile(workDir, {
        rule: COMPONENT_PROPS_NAME,
        filename: 'bare-props.tsx',
        code: 'export const Button = ({ label }: Props) => <button>{label}</button>\n'
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({
          code: COMPONENT_PROPS_NAME,
          severity: 'error'
        })
      ])
    })

    it('passes a .tsx component typed with its own props name', () => {
      const diagnostics = lintFile(workDir, {
        rule: COMPONENT_PROPS_NAME,
        filename: 'own-props.tsx',
        code: 'export const Button = ({ label }: ButtonProps) => <button>{label}</button>\n'
      })

      expect(diagnostics).toStrictEqual([])
    })

    it('fails a .tsx component typed through FC with a bare Props', () => {
      const diagnostics = lintFile(workDir, {
        rule: COMPONENT_PROPS_NAME,
        filename: 'function-component-props.tsx',
        code: 'export const Rating: FC<Props> = ({ value }) => <span>{value}</span>\n'
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({
          code: COMPONENT_PROPS_NAME,
          severity: 'error'
        })
      ])
    })

    it('ignores a .ts file', () => {
      const diagnostics = lintFile(workDir, {
        rule: COMPONENT_PROPS_NAME,
        filename: 'bare-props.ts',
        code: 'export const Button = ({ label }: Props) => label\n'
      })

      expect(diagnostics).toStrictEqual([])
    })
  })

  describe('component types', () => {
    it('fails a .tsx component typed through FC', () => {
      const diagnostics = lintFile(workDir, {
        rule: RESTRICTED_TYPES,
        filename: 'function-component.tsx',
        code: 'export const Rating: React.FC<RatingProps> = ({ value }) => <span>{value}</span>\n'
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: RESTRICTED_TYPES, severity: 'error' })
      ])
    })
  })

  describe('no context provider', () => {
    it('fails a context rendered through its Provider', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_CONTEXT_PROVIDER,
        filename: 'context-provider.tsx',
        code: 'export const App = () => <ThemeContext.Provider value={theme}><Page /></ThemeContext.Provider>\n'
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({
          code: NO_CONTEXT_PROVIDER,
          severity: 'error'
        })
      ])
    })

    it('passes a context rendered as its own provider', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_CONTEXT_PROVIDER,
        filename: 'context-value.tsx',
        code: 'export const App = () => <ThemeContext value={theme}><Page /></ThemeContext>\n'
      })

      expect(diagnostics).toStrictEqual([])
    })

    it('passes the Provider of a library component', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_CONTEXT_PROVIDER,
        filename: 'library-provider.tsx',
        code: 'export const App = () => <Tooltip.Provider><Page /></Tooltip.Provider>\n'
      })

      expect(diagnostics).toStrictEqual([])
    })
  })

  describe('no forward ref', () => {
    it('fails the named import of forwardRef', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_FORWARD_REF,
        filename: 'named-forward-ref.tsx',
        code: "import { forwardRef } from 'react'\nexport const Input = forwardRef(render)\n"
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: NO_FORWARD_REF, severity: 'error' })
      ])
    })

    it('fails React.forwardRef', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_FORWARD_REF,
        filename: 'member-forward-ref.tsx',
        code: "import * as React from 'react'\nexport const Input = React.forwardRef(render)\n"
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: NO_FORWARD_REF, severity: 'error' })
      ])
    })

    it('passes a namespace import that never reads forwardRef', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_FORWARD_REF,
        filename: 'namespace-react.tsx',
        code: "import * as React from 'react'\nexport const useCount = () => React.useState(0)\n"
      })

      expect(diagnostics).toStrictEqual([])
    })
  })

  describe('no leaked render', () => {
    it('fails an element rendered with &&', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_LEAKED_RENDER,
        filename: 'leaked-render.tsx',
        code: 'export const Page = () => <div>{isOpen && <Modal />}</div>\n'
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: NO_LEAKED_RENDER, severity: 'error' })
      ])
    })

    it('passes a ternary ending in null', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_LEAKED_RENDER,
        filename: 'ternary-render.tsx',
        code: 'export const Page = () => <div>{isOpen ? <Modal /> : null}</div>\n'
      })

      expect(diagnostics).toStrictEqual([])
    })

    it('passes a && in a prop', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_LEAKED_RENDER,
        filename: 'prop-and.tsx',
        code: 'export const Page = () => <Button disabled={isLoading && !isReady} />\n'
      })

      expect(diagnostics).toStrictEqual([])
    })
  })
})
