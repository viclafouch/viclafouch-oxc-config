import { RuleTester } from 'oxlint/plugins-dev'
import { noUnknownReturns } from '../rules/no-unknown-returns'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'ts' } }
})

ruleTester.run('no-unknown-returns', noUnknownReturns, {
  valid: [
    {
      name: 'an imported alias the file cannot resolve',
      code: "import type { ImportedValue } from './types'\nfunction parse(): ImportedValue { return input }"
    },
    {
      name: 'a named domain type',
      code: 'function parse(): User { return user }'
    },
    {
      name: 'an inferred return type',
      code: 'function infer() { return input }'
    },
    {
      name: 'a type parameter',
      code: 'function generic<Value>(): Value { return value }'
    },
    {
      name: 'a type parameter that shadows an unknown alias',
      code: 'type Value = unknown\nfunction generic<Value>(): Value { return value }'
    },
    {
      name: 'a mapped type key that shadows an unknown alias',
      code: 'type Key = unknown\ntype Mapped<Input> = { [Key in keyof Input]: () => Key }'
    },
    {
      name: 'an infer type that shadows an unknown alias',
      code: 'type Item = unknown\ntype Unpacked<Input> = Input extends Promise<infer Item> ? () => Item : never'
    },
    {
      name: 'unknown nested in a returned object',
      code: 'function cause(): { cause: unknown } { return { cause: input } }'
    },
    {
      name: 'an alias of an object with an unknown field',
      code: 'type Result = { value: unknown }\nfunction load(): Result { return result }'
    },
    {
      name: 'a promise of a domain type',
      code: 'function load(): Promise<User> { return promise }'
    },
    {
      name: 'a generic alias applied to a domain type',
      code: 'type Identity<T> = T\nfunction load(): Identity<User> { return user }'
    },
    {
      name: 'a block alias that shadows an unknown alias',
      code: 'type Value = unknown\nfunction outer() { type Value = User\nfunction load(): Value { return user } }'
    }
  ],
  invalid: [
    {
      name: 'a function declaration',
      code: 'function load(): unknown { return input }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'an arrow function',
      code: 'const load = (): unknown => input',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a function type',
      code: 'type Loader = () => unknown',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a callback prop that returns a promise of unknown',
      code: 'type Props = { refetch: () => Promise<unknown> }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a method signature',
      code: 'interface Loader { load(): unknown }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a declared function',
      code: 'declare function load(): unknown',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a union with unknown',
      code: 'function load(): string | unknown { return input }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a promise of unknown',
      code: 'function load(): Promise<unknown> { return promise }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a PromiseLike of unknown',
      code: 'function load(): PromiseLike<unknown> { return promise }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'an alias of unknown declared before its use',
      code: 'type UnknownValue = unknown\nfunction load(): UnknownValue { return input }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'an alias of unknown declared after its use',
      code: 'function load(): UnknownValue { return input }\ntype UnknownValue = unknown',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'an infer type outside the true branch keeps the unknown alias',
      code: 'type Item = unknown\ntype Fallback<Input> = Input extends infer Item ? string : () => Item',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a block alias of unknown',
      code: 'function outer() { type Result = unknown\nfunction load(): Result { return input } }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a generic alias applied to unknown',
      code: 'type Identity<T> = T\nfunction load(): Identity<unknown> { return input }',
      errors: [{ messageId: 'unknownReturn' }]
    },
    {
      name: 'a generic alias that wraps unknown in a promise',
      code: 'type Identity<T> = T\ntype Wrapped<T> = Promise<Identity<T>>\nfunction load(): Wrapped<unknown> { return promise }',
      errors: [{ messageId: 'unknownReturn' }]
    }
  ]
})
