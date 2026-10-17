import { RuleTester } from 'oxlint/plugins-dev'
import { noLeakedRender } from '../rules/no-leaked-render'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('no-leaked-render', noLeakedRender, {
  valid: [
    {
      name: 'a ternary ending in null',
      code: 'const Page = () => <div>{isOpen ? <Modal /> : null}</div>'
    },
    {
      name: 'a && in the condition of a ternary',
      code: 'const Page = () => <div>{isOpen && isReady ? <Modal /> : null}</div>'
    },
    {
      name: 'a && in the condition of a ternary in a prop',
      code: "const Page = () => <Badge label={isPaid && isSent ? 'ok' : 'nope'} />"
    },
    {
      name: 'a && as a boolean prop',
      code: 'const Page = () => <Button disabled={isLoading && !isReady} />'
    },
    {
      name: 'a && in an event handler',
      code: 'const Page = () => <Button onClick={() => isOpen && close()} />'
    },
    {
      name: 'a && in a variable',
      code: 'const isVisible = isOpen && isReady'
    },
    {
      name: 'a fallback rendered with || or ??',
      code: 'const Page = () => <div>{title || <Untitled />}{label ?? <Untitled />}</div>'
    }
  ],
  invalid: [
    {
      name: 'an element passed to a prop with &&',
      code: 'const Page = () => <Layout aside={isOpen && <Sidebar />} />',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <Layout aside={isOpen ? <Sidebar /> : null} />'
            }
          ]
        }
      ]
    },
    {
      name: 'an element returned with &&',
      code: 'const Page = () => { return isOpen && <Modal /> }',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output: 'const Page = () => { return isOpen ? <Modal /> : null }'
            }
          ]
        }
      ]
    },
    {
      name: 'an element returned by a callback with &&',
      code: 'const List = () => <ul>{items.map((item) => item.visible && <Row />)}</ul>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const List = () => <ul>{items.map((item) => item.visible ? <Row /> : null)}</ul>'
            }
          ]
        }
      ]
    },
    {
      name: 'a fragment stored in a variable with &&',
      code: 'const footer = hasActions && <><Cancel /><Submit /></>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const footer = hasActions ? <><Cancel /><Submit /></> : null'
            }
          ]
        }
      ]
    },
    {
      name: 'an element rendered with &&',
      code: 'const Page = () => <div>{isOpen && <Modal />}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{isOpen ? <Modal /> : null}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'an element rendered with && inside a fragment',
      code: 'const Page = () => <>{isOpen && <Modal />}</>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output: 'const Page = () => <>{isOpen ? <Modal /> : null}</>'
            }
          ]
        }
      ]
    },
    {
      name: 'a fragment rendered with &&',
      code: 'const Page = () => <div>{isOpen && <><Modal /></>}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{isOpen ? <><Modal /></> : null}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'a string rendered with &&',
      code: "const Cart = () => <p>{count && 'items'}</p>",
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output: "const Cart = () => <p>{count ? 'items' : null}</p>"
            }
          ]
        }
      ]
    },
    {
      name: 'a list rendered with &&',
      code: 'const List = () => <ul>{items.length && items.map(renderItem)}</ul>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const List = () => <ul>{items.length ? items.map(renderItem) : null}</ul>'
            }
          ]
        }
      ]
    },
    {
      name: 'a && in the alternate of a ternary',
      code: 'const Page = () => <div>{isAdmin ? <Admin /> : isOpen && <Modal />}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{isAdmin ? <Admin /> : isOpen ? <Modal /> : null}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'a && in the consequent of a ternary',
      code: 'const Page = () => <div>{isAdmin ? isOpen && <Modal /> : null}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{isAdmin ? isOpen ? <Modal /> : null : null}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'a chain of &&',
      code: 'const Page = () => <div>{isOpen && isReady && <Modal />}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{isOpen && isReady ? <Modal /> : null}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'parentheses around both operands',
      code: 'const Page = () => <div>{(isOpen || isPinned) && (\n  <Modal />\n)}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{(isOpen || isPinned) ? (\n  <Modal />\n) : null}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'a && in a child of an element passed to a prop',
      code: 'const Page = () => <Tooltip content={<span>{isOpen && <Hint />}</span>} />',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <Tooltip content={<span>{isOpen ? <Hint /> : null}</span>} />'
            }
          ]
        }
      ]
    },
    {
      name: 'a whole child in parentheses',
      code: 'const Page = () => <div>{(isOpen && <Modal />)}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{(isOpen ? <Modal /> : null)}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'a comment before the operator',
      code: 'const Page = () => <div>{isOpen /* open */ && <Modal />}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{isOpen /* open */ ? <Modal /> : null}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'a && in a type assertion',
      code: 'const Page = () => <div>{(isOpen && <Modal />) as ReactNode}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{(isOpen ? <Modal /> : null) as ReactNode}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'a && in the fallback of ||',
      code: 'const Page = () => <div>{title || (isOpen && <Modal />)}</div>',
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                'const Page = () => <div>{title || (isOpen ? <Modal /> : null)}</div>'
            }
          ]
        }
      ]
    },
    {
      name: 'a && in the branch of a nested ternary',
      code: "const Page = () => <div>{isAdmin ? <Admin /> : isGuest ? <Guest /> : count && 'items'}</div>",
      errors: [
        {
          messageId: 'leakedRender',
          suggestions: [
            {
              messageId: 'useTernary',
              output:
                "const Page = () => <div>{isAdmin ? <Admin /> : isGuest ? <Guest /> : count ? 'items' : null}</div>"
            }
          ]
        }
      ]
    }
  ]
})
