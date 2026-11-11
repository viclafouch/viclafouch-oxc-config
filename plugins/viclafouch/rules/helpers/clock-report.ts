import type { Context, ESTree } from '@oxlint/plugins'

export function createClockReport(context: Context, messageId: string) {
  let isClockFaked = false
  let nodes: ESTree.Node[] = []
  return {
    reset: () => {
      isClockFaked = false
      nodes = []
    },
    markClockFaked: () => {
      isClockFaked = true
    },
    collect: (node: ESTree.Node) => {
      nodes.push(node)
    },
    report: () => {
      if (isClockFaked) {
        return
      }
      for (const node of nodes) {
        context.report({ node, messageId })
      }
    }
  }
}
