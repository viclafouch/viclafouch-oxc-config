import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createLintWorkDir, lintFile } from './lint-file'

const FILENAME_CASE = 'unicorn(filename-case)'
const ONLY_EXPORT_COMPONENTS = 'react(only-export-components)'
const NO_DEFAULT_EXPORT = 'import(no-default-export)'
const DYNAMIC_MESSAGE = 'paraglide(no-dynamic-message-access)'

const ROUTE_WITH_COMPONENT = [
  "import { createFileRoute } from '@tanstack/react-router'",
  '',
  'const Home = () => <main />',
  '',
  "export const Route = createFileRoute('/')({ component: Home })",
  ''
].join('\n')

describe('tanstackStart config', () => {
  let workDir: string

  const lintAppFile = (rule: string, filename: string, code: string) => {
    mkdirSync(join(workDir, dirname(filename)), { recursive: true })
    return lintFile(workDir, { rule, filename, code })
  }

  beforeAll(() => {
    workDir = createLintWorkDir('tanstack-start-config', [
      "import { defineConfig } from 'oxlint'",
      "import imports from '../configs/imports.ts'",
      "import paraglide from '../configs/paraglide.ts'",
      "import react from '../configs/react.ts'",
      "import tanstackStart from '../configs/tanstack-start.ts'",
      '',
      'export default defineConfig({ extends: [react, tanstackStart, paraglide, imports] })'
    ])
  })

  afterAll(() => {
    rmSync(workDir, { recursive: true, force: true })
  })

  describe('file names', () => {
    it.each([
      'src/components/event/EventCard.tsx',
      'src/utils/$formatPrice.ts',
      'src/routes/-components/$eventCard.tsx'
    ])('fails the file name %s', (filename) => {
      const diagnostics = lintAppFile(
        FILENAME_CASE,
        filename,
        'export const value = 1\n'
      )

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: FILENAME_CASE })
      ])
    })

    it.each([
      'src/routes/__root.tsx',
      'src/routes/_authenticated.tsx',
      'src/routes/events/$eventId.tsx',
      'src/routes/(marketing)/pricing.tsx',
      'src/routes/sitemap[.]xml.ts',
      'src/routes/{-$locale}/about.tsx',
      'src/routes/events.$eventId.edit.tsx',
      'src/server/event.functions.ts'
    ])('passes the file name %s', (filename) => {
      const diagnostics = lintAppFile(
        FILENAME_CASE,
        filename,
        'export const value = 1\n'
      )

      expect(diagnostics).toStrictEqual([])
    })
  })

  describe('route files', () => {
    it('passes a route file that exports Route next to its component', () => {
      const diagnostics = lintAppFile(
        ONLY_EXPORT_COMPONENTS,
        'src/routes/index.tsx',
        ROUTE_WITH_COMPONENT
      )

      expect(diagnostics).toStrictEqual([])
    })

    it.each([
      'src/components/home/home.tsx',
      'src/routes/-components/home.tsx'
    ])('fails the same exports in %s', (filename) => {
      const diagnostics = lintAppFile(
        ONLY_EXPORT_COMPONENTS,
        filename,
        ROUTE_WITH_COMPONENT
      )

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: ONLY_EXPORT_COMPONENTS })
      ])
    })
  })

  describe('server entry', () => {
    it('passes the default export of src/server.ts', () => {
      const diagnostics = lintAppFile(
        NO_DEFAULT_EXPORT,
        'src/server.ts',
        'export default { fetch: () => new Response() }\n'
      )

      expect(diagnostics).toStrictEqual([])
    })

    it('fails a default export in another file', () => {
      const diagnostics = lintAppFile(
        NO_DEFAULT_EXPORT,
        'src/utils/event.ts',
        'export default { title: "Event" }\n'
      )

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: NO_DEFAULT_EXPORT })
      ])
    })
  })

  describe('paraglide messages', () => {
    it('fails a dynamic message access', () => {
      const diagnostics = lintAppFile(
        DYNAMIC_MESSAGE,
        'src/components/event/event-status.tsx',
        [
          "import { m } from '#/paraglide/messages'",
          '',
          'type EventStatusProps = { status: string }',
          '',
          'export const EventStatus = ({ status }: EventStatusProps) => <span>{m[status]()}</span>',
          ''
        ].join('\n')
      )

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: DYNAMIC_MESSAGE })
      ])
    })
  })
})

describe('tanstackStart config on thrown values', () => {
  const ONLY_THROW_ERROR = 'typescript(only-throw-error)'
  let workDir: string

  beforeAll(() => {
    workDir = createLintWorkDir('tanstack-start-throw', [
      "import { defineConfig } from 'oxlint'",
      "import tanstackStart from '../configs/tanstack-start.ts'",
      "import typescript from '../configs/typescript.ts'",
      '',
      'export default defineConfig({',
      '  extends: [typescript, tanstackStart]',
      '})'
    ])
    const routerCore = join(workDir, 'node_modules/@tanstack/router-core')
    mkdirSync(routerCore, { recursive: true })
    writeFileSync(
      join(routerCore, 'package.json'),
      JSON.stringify({ name: '@tanstack/router-core', types: 'index.d.ts' })
    )
    writeFileSync(
      join(routerCore, 'index.d.ts'),
      [
        'export interface Redirect { isRedirect: true }',
        'export interface NotFoundError { isNotFound: true }',
        'export declare function redirect(): Redirect',
        'export declare function notFound(): NotFoundError',
        ''
      ].join('\n')
    )
    writeFileSync(
      join(workDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          module: 'esnext',
          moduleResolution: 'bundler'
        }
      })
    )
  })

  afterAll(() => {
    rmSync(workDir, { recursive: true, force: true })
  })

  it.each([
    ['redirect', 'throw redirect()'],
    ['notFound', 'throw notFound()']
  ])('passes a thrown %s()', (name, statement) => {
    const diagnostics = lintFile(workDir, {
      rule: ONLY_THROW_ERROR,
      filename: `throw-${name}.ts`,
      code: `import { ${name} } from '@tanstack/router-core'\n\nexport const guard = () => {\n  ${statement}\n}\n`
    })

    expect(diagnostics).toStrictEqual([])
  })

  it('fails a thrown plain object', () => {
    const diagnostics = lintFile(workDir, {
      rule: ONLY_THROW_ERROR,
      filename: 'throw-object.ts',
      code: "export const guard = () => {\n  throw { reason: 'denied' }\n}\n"
    })

    expect(diagnostics).toStrictEqual([
      expect.objectContaining({ code: ONLY_THROW_ERROR })
    ])
  })
})
