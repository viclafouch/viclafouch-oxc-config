import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

type Diagnostic = { code: string; severity: string; filename: string }

type LintFileParams = { rule?: string; filename: string; code: string }

type ProcessOutput = { stdout: string; stderr: string }

type LintReport = { diagnostics: Diagnostic[] }

export function matchIsProcessOutput(error: unknown): error is ProcessOutput {
  return (
    error instanceof Error &&
    'stdout' in error &&
    typeof error.stdout === 'string' &&
    'stderr' in error &&
    typeof error.stderr === 'string'
  )
}

function matchIsDiagnostic(diagnostic: unknown): diagnostic is Diagnostic {
  return (
    typeof diagnostic === 'object' &&
    diagnostic !== null &&
    'code' in diagnostic &&
    typeof diagnostic.code === 'string' &&
    'severity' in diagnostic &&
    typeof diagnostic.severity === 'string' &&
    'filename' in diagnostic &&
    typeof diagnostic.filename === 'string'
  )
}

function matchIsLintReport(report: unknown): report is LintReport {
  return (
    typeof report === 'object' &&
    report !== null &&
    'diagnostics' in report &&
    Array.isArray(report.diagnostics) &&
    report.diagnostics.every(matchIsDiagnostic)
  )
}

export function createLintWorkDir(name: string, configLines: string[]): string {
  const workDir = mkdtempSync(join(ROOT, `.oxlint.test-${name}-`))
  writeFileSync(join(workDir, 'oxlint.config.ts'), configLines.join('\n'))

  return workDir
}

export function lintFile(
  workDir: string,
  { rule, filename, code }: LintFileParams
): Diagnostic[] {
  writeFileSync(join(workDir, filename), code)
  try {
    execFileSync(
      'oxlint',
      ['-c', 'oxlint.config.ts', '--format=json', filename],
      { cwd: workDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    )
    return []
  } catch (error: unknown) {
    if (!matchIsProcessOutput(error)) {
      throw error
    }
    const report: unknown = JSON.parse(error.stdout)
    if (!matchIsLintReport(report)) {
      throw error
    }
    return report.diagnostics.filter((diagnostic) => {
      return rule === undefined || diagnostic.code === rule
    })
  }
}
