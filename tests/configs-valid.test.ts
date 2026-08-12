import childProcess from 'node:child_process'
import fsSync from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const CONFIGS_DIR = path.resolve(ROOT, 'configs')
const DUMMY_FILE = path.resolve(ROOT, 'index.ts')
const OXLINT_BIN = path.resolve(ROOT, 'node_modules/.bin/oxlint')

const allConfigFiles = fsSync
  .readdirSync(CONFIGS_DIR)
  .filter((file) => {
    return file.endsWith('.ts')
  })
  .map((file) => {
    return path.basename(file, '.ts')
  })

const jsPluginSet = new Set(
  allConfigFiles.filter((name) => {
    const content = fsSync.readFileSync(
      path.resolve(CONFIGS_DIR, `${name}.ts`),
      'utf8'
    )
    return content.includes('jsPlugins')
  })
)

const nativeConfigs = allConfigFiles.filter((name) => {
  return !jsPluginSet.has(name)
})

const jsPluginConfigs = allConfigFiles.filter((name) => {
  return jsPluginSet.has(name)
})

function toCamelCase(kebab: string): string {
  return kebab.replaceAll(/-([a-z])/gu, (_, char: string) => {
    return char.toUpperCase()
  })
}

function tmpConfigPath(name: string): string {
  return path.resolve(ROOT, `.oxlint.test-${name}.ts`)
}

async function runOxlintPrintConfig(name: string): Promise<string> {
  const varName = toCamelCase(name)
  const tmpPath = tmpConfigPath(name)
  const configSource = [
    "import { defineConfig } from 'oxlint'",
    `import ${varName} from './configs/${name}.ts'`,
    '',
    `export default defineConfig({ extends: [${varName}] })`
  ].join('\n')

  await fs.writeFile(tmpPath, configSource)
  try {
    childProcess.execSync(
      `${OXLINT_BIN} -c ${tmpPath} --print-config ${DUMMY_FILE}`,
      {
        cwd: ROOT,
        env: {
          ...process.env,
          NODE_OPTIONS: '--experimental-strip-types --no-warnings'
        },
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      }
    )
    return ''
  } catch (error: unknown) {
    const execError = error as { stdout: string; stderr: string }
    return execError.stdout || execError.stderr
  } finally {
    await fs.unlink(tmpPath).catch(() => {})
  }
}

describe('native configs — rules and options validated by oxlint', () => {
  it.concurrent.each(nativeConfigs)('%s', async (name) => {
    expect(await runOxlintPrintConfig(name)).toBe('')
  })
})

describe('jsPlugin configs — importable without errors', () => {
  it.concurrent.each(jsPluginConfigs)('%s', async (name) => {
    const mod = await import(`../configs/${name}.ts`)
    expect(mod.default).toHaveProperty('rules')
  })
})
