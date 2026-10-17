import { RuleTester } from 'oxlint/plugins-dev'
import { noKnownValueWidening } from '../rules/no-known-value-widening'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'ts' } }
})

const PRELUDE = 'type Command = () => void\nconst startCommand = () => {}\n'

ruleTester.run('no-known-value-widening', noKnownValueWidening, {
  valid: [
    {
      name: 'an empty dictionary accumulator',
      code: `${PRELUDE}const commands: Record<string, Command> = {}`
    },
    {
      name: 'an empty accumulator through a generic alias',
      code: `${PRELUDE}type Index<T> = Record<string, T>\nconst commands: Index<Command> = {}`
    },
    {
      name: 'an empty accumulator on a class property',
      code: `${PRELUDE}class Registry { commands: Record<string, Command> = {} }`
    },
    {
      name: 'an empty accumulator on a class accessor',
      code: `${PRELUDE}class Registry { accessor commands: Record<string, Command> = {} }`
    },
    {
      name: 'an empty accumulator assigned later',
      code: `${PRELUDE}let commands: Record<string, Command>\ncommands = {}`
    },
    {
      name: 'an empty accumulator returned from a function',
      code: `${PRELUDE}function create(): Record<string, Command> { return {} }`
    },
    {
      name: 'an empty accumulator returned from an arrow',
      code: `${PRELUDE}const create = (): Record<string, Command> => ({})`
    },
    {
      name: 'an empty accumulator asserted',
      code: `${PRELUDE}const commands = {} as Record<string, Command>`
    },
    {
      name: 'an empty accumulator asserted with angle brackets',
      code: `${PRELUDE}const commands = <Record<string, Command>>{}`
    },
    {
      name: 'an inferred object',
      code: `${PRELUDE}const commands = { start: startCommand }`
    },
    {
      name: 'a const assertion',
      code: `${PRELUDE}const commands = { start: startCommand } as const`
    },
    {
      name: 'a satisfies check',
      code: `${PRELUDE}const commands = { start: startCommand } satisfies Record<string, Command>`
    },
    {
      name: 'a const assertion with a satisfies check',
      code: `${PRELUDE}type Commands = Record<string, Command>\nconst commands = { start: startCommand } as const satisfies Commands`
    },
    {
      name: 'a named interface',
      code: `${PRELUDE}interface Commands { readonly start: Command }\nconst commands: Commands = { start: startCommand }`
    },
    {
      name: 'a named object alias',
      code: `${PRELUDE}type Commands = { readonly start: Command }\nconst commands: Commands = { start: startCommand }`
    },
    {
      name: 'a mapped alias over finite keys',
      code: `${PRELUDE}type PermissionLevels = { readonly [Level in Permission]: number }\nconst levels: PermissionLevels = { admin: 1 }`
    },
    {
      name: 'an inferred return type',
      code: `${PRELUDE}function create() { return { start: startCommand } }`
    },
    {
      name: 'a named return type',
      code: `${PRELUDE}interface Commands { readonly start: Command }\nfunction create(): Commands { return { start: startCommand } }`
    },
    {
      name: 'a value from a call',
      code: `${PRELUDE}declare function make(): Record<string, Command>\nconst commands: Record<string, Command> = make()`
    },
    {
      name: 'an imported type',
      code: `${PRELUDE}import { Commands } from './types'\nconst commands: Commands = { start: startCommand }`
    },
    {
      name: 'a record over finite keys',
      code: `${PRELUDE}type Diet = 'vegan' | 'omnivore'\nconst labels: Record<Diet, string> = { vegan: 'V', omnivore: 'O' }`
    },
    {
      name: 'an alias of a record over finite keys',
      code: `${PRELUDE}type Diet = 'vegan' | 'omnivore'\ntype Labels = Record<Diet, string>\nconst labels: Labels = { vegan: 'V', omnivore: 'O' }`
    },
    {
      name: 'a readonly record over finite keys',
      code: `${PRELUDE}type Diet = 'vegan' | 'omnivore'\nconst labels: Readonly<Record<Diet, string>> = { vegan: 'V', omnivore: 'O' }`
    },
    {
      name: 'a record over literal keys',
      code: `${PRELUDE}const labels: Record<'a' | 'b', number> = { a: 1, b: 2 }`
    },
    {
      name: 'a generic record applied to a literal key',
      code: `${PRELUDE}type Index<Key extends PropertyKey, Value> = Record<Key, Value>\nconst commands: Index<'start', Command> = { start: startCommand }`
    },
    {
      name: 'a type predicate called on an unknown value',
      code: 'function isString(value: unknown): value is string { return true }\ndeclare const input: unknown\nisString(input)'
    },
    {
      name: 'a type predicate over a union with unknown, called on the same union',
      code: 'function isString(value: string | unknown): value is string { return true }\ndeclare const input: string | unknown\nisString(input)'
    },
    {
      name: 'a type predicate called on an unknown call result',
      code: 'function isString(value: unknown): value is string { return true }\ndeclare function readInput(): unknown\nisString(readInput())'
    }
  ],
  invalid: [
    {
      name: 'an object widened to unknown',
      code: 'const value: unknown = {}',
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an object widened to object',
      code: 'const value: object = {}',
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an object assigned to an unknown binding',
      code: 'let value: unknown\nvalue = {}',
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an object returned as unknown',
      code: 'function create(): unknown { return {} }',
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a populated object widened to an open record',
      code: `${PRELUDE}const commands: Record<string, Command> = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a populated object widened to an index signature',
      code: `${PRELUDE}const commands: { [key: string]: Command } = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a populated object widened to a mapped type',
      code: `${PRELUDE}const commands: { [K in string]: Command } = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a populated object typed with an anonymous object',
      code: `${PRELUDE}const commands: { start: Command } = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a populated object asserted to an open record',
      code: `${PRELUDE}const commands = { start: startCommand } as Record<string, Command>`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a chain of widening assertions reports once',
      code: `${PRELUDE}const commands = ({ start: startCommand } as Record<string, Command>) as object`,
      errors: 1
    },
    {
      name: 'a class property',
      code: `${PRELUDE}class Registry { commands: Record<string, Command> = { start: startCommand } }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an assignment to an annotated binding',
      code: `${PRELUDE}let commands: Record<string, Command>\ncommands = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a return value widened to an open record',
      code: `${PRELUDE}function create(): Record<string, Command> { return { start: startCommand } }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a return value typed with an anonymous object',
      code: `${PRELUDE}function create(): { start: Command } { return { start: startCommand } }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an arrow return value typed with an anonymous object',
      code: `${PRELUDE}const create = (): { start: Command } => ({ start: startCommand })`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a known const widened to an open record',
      code: `${PRELUDE}const source = { start: startCommand }\nconst commands: Record<string, Command> = source`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a known const widened through an alias of a record',
      code: `${PRELUDE}type Open = Record<string, Command>\nconst source = { start: startCommand }\nconst commands: Open = source`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a known const widened through an alias of an index signature',
      code: `${PRELUDE}type Open = { [key: string]: Command }\nconst source = { start: startCommand }\nconst commands: Open = source`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a known const widened through an alias of a mapped type',
      code: `${PRELUDE}type Open = { [key in string]: Command }\nconst source = { start: startCommand }\nconst commands: Open = source`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a known const widened through a readonly record alias',
      code: `${PRELUDE}type Open = Readonly<Record<string, Command>>\nconst source = { start: startCommand }\nconst commands: Open = source`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a block alias of an open record',
      code: `${PRELUDE}function outer() { type Open = Record<string, Command>\nconst commands: Open = { start: startCommand } }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an alias declared after its use',
      code: `${PRELUDE}const commands: Open = { start: startCommand }\ntype Open = Record<string, Command>`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a generic alias of an open record',
      code: `${PRELUDE}type Index<T> = Record<string, T>\nconst commands: Index<Command> = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an identity alias around an open record',
      code: `${PRELUDE}type Identity<T> = T\nconst commands: Identity<Record<string, Command>> = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an alias of a generic open record',
      code: `${PRELUDE}type Index<T> = Record<string, T>\ntype CommandsByName = Index<Command>\nconst commands: CommandsByName = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a generic open record with a default argument',
      code: `${PRELUDE}type Index<T = Command> = Record<string, T>\nconst commands: Index = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a record over an alias of string',
      code: `${PRELUDE}type Key = string\nconst commands: Record<Key, Command> = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a record over PropertyKey',
      code: `${PRELUDE}const commands: Record<PropertyKey, Command> = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a record over a union with string',
      code: `${PRELUDE}const commands: Record<string | 'start', Command> = { start: startCommand }`,
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a literal widened to unknown',
      code: 'const value: unknown = 1',
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an array widened to object',
      code: 'const value: object = []',
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a type predicate called on a literal',
      code: "function isString(value: unknown): value is string { return true }\nisString('known')",
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a type predicate called on a known const',
      code: "function isString(value: unknown): value is string { return true }\nconst known = 'known'\nisString(known)",
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a type predicate over a union with unknown, called on a literal',
      code: "function isString(value: string | unknown): value is string { return true }\nisString('known')",
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a type predicate called on a typed parameter',
      code: 'function isString(value: unknown): value is string { return true }\nfunction check(known: string): boolean { return isString(known) }',
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'an arrow type predicate called on a typed binding',
      code: 'const isString = (value: unknown): value is string => true\nconst known: string = getValue()\nisString(known)',
      errors: [{ messageId: 'widening' }]
    },
    {
      name: 'a type predicate called on the result of a typed local function',
      code: "type User = { readonly id: string }\nfunction isUser(value: unknown): value is User { return true }\nfunction parse(): User { return { id: 'known' } }\nconst user = parse()\nisUser(user)",
      errors: [{ messageId: 'widening' }]
    }
  ]
})
