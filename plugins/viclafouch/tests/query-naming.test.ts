import { RuleTester } from 'oxlint/plugins-dev'
import { queryNaming } from '../rules/query-naming'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('query-naming', queryNaming, {
  valid: [
    'const memesQuery = useQuery(memesOptions)',
    'const saveMutation = useMutation(saveOptions)'
  ],
  invalid: [
    {
      code: 'const memes = useQuery(memesOptions)',
      errors: [{ messageId: 'queryName' }]
    },
    {
      code: 'const { data } = useSuspenseQuery(memesOptions)',
      errors: [{ messageId: 'destructuredQuery' }]
    },
    {
      code: 'const save = useMutation(saveOptions)',
      errors: [{ messageId: 'mutationName' }]
    },
    {
      code: 'const { mutate } = useMutation(saveOptions)',
      errors: [{ messageId: 'destructuredMutation' }]
    },
    {
      code: 'const memes = memesQuery.data',
      errors: [{ messageId: 'intermediateData' }]
    },
    {
      code: 'const { data } = memesQuery',
      errors: [{ messageId: 'destructuredResult' }]
    }
  ]
})
