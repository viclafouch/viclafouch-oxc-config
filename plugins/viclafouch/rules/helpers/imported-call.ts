import type { ESTree } from '@oxlint/plugins'
import { getPropertyName } from './ast'

type ImportedCallParams = {
  sources: ReadonlySet<string>
  importedNames: ReadonlySet<string>
}

const getImportedName = ({ imported }: ESTree.ImportSpecifier) => {
  return imported.type === 'Identifier' ? imported.name : imported.value
}

export function createImportedCallMatcher({
  sources,
  importedNames
}: ImportedCallParams) {
  const localNames = new Set<string>()
  const objectImportNames = new Set<string>()

  return {
    reset() {
      localNames.clear()
      objectImportNames.clear()
    },
    collect(declaration: ESTree.ImportDeclaration) {
      if (!sources.has(declaration.source.value)) {
        return
      }
      for (const specifier of declaration.specifiers) {
        if (specifier.type !== 'ImportSpecifier') {
          objectImportNames.add(specifier.local.name)
        } else if (importedNames.has(getImportedName(specifier))) {
          localNames.add(specifier.local.name)
        }
      }
    },
    matchIsImportedCall({ callee }: ESTree.CallExpression) {
      if (callee.type === 'Identifier') {
        return localNames.has(callee.name)
      }
      if (
        callee.type !== 'MemberExpression' ||
        callee.object.type !== 'Identifier' ||
        !objectImportNames.has(callee.object.name)
      ) {
        return false
      }
      const propertyName = getPropertyName(callee)
      return propertyName !== null && importedNames.has(propertyName)
    }
  }
}
