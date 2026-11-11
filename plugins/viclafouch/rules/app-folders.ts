import { defineRule } from '@oxlint/plugins'

const SHARED_FOLDERS = [
  'components',
  'constants',
  'hooks',
  'lib',
  'queries',
  'server',
  'stores',
  'types',
  'utils'
]
const SOURCE_FOLDERS = new Set(['routes', ...SHARED_FOLDERS])
const ROUTE_FOLDERS = new Set(
  SHARED_FOLDERS.map((folder) => {
    return `-${folder}`
  })
)

function getSourceFolders(filename: string) {
  const segments = filename.replaceAll('\\', '/').split('/')
  const sourceIndex = segments.lastIndexOf('src')
  return sourceIndex === -1 ? [] : segments.slice(sourceIndex + 1, -1)
}

export const appFolders = defineRule({
  meta: {
    type: 'suggestion',
    messages: {
      sourceFolder:
        'Put this file in one of the folders of `src/`: {{folders}}. A file that serves one route lives under that route.',
      routeFolder:
        'Name the folder of this route `{{folders}}`: the same names as `src/`, with a `-` prefix.'
    },
    schema: []
  },
  createOnce(context) {
    return {
      Program(node) {
        const [topFolder, ...nestedFolders] = getSourceFolders(context.filename)
        if (topFolder === undefined) {
          return
        }
        if (!SOURCE_FOLDERS.has(topFolder)) {
          context.report({
            node,
            messageId: 'sourceFolder',
            data: { folders: [...SOURCE_FOLDERS].join(', ') }
          })
          return
        }
        const unknownRouteFolder =
          topFolder === 'routes' &&
          nestedFolders.some((folder) => {
            return folder.startsWith('-') && !ROUTE_FOLDERS.has(folder)
          })
        if (unknownRouteFolder) {
          context.report({
            node,
            messageId: 'routeFolder',
            data: { folders: [...ROUTE_FOLDERS].join('`, `') }
          })
        }
      }
    }
  }
})
