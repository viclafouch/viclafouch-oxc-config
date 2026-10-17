import { RuleTester } from 'oxlint/plugins-dev'
import { componentPropsName } from '../rules/component-props-name'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('component-props-name', componentPropsName, {
  valid: [
    {
      name: 'an arrow component typed with its own props name',
      code: 'const Button = ({ label }: ButtonProps) => <button>{label}</button>'
    },
    {
      name: 'a hook, not a component',
      code: 'const useThing = (options: Options) => options'
    },
    {
      name: 'a component with no props',
      code: 'const Spinner = () => <span />'
    },
    {
      name: 'a component with an untyped props parameter',
      code: 'const Spinner = (props) => <span {...props} />'
    },
    {
      name: 'a generic props type',
      code: 'const List = <T,>({ items }: ListProps<T>) => <ul>{items.length}</ul>'
    },
    {
      name: 'a component wrapped in memo with its own props name',
      code: 'const Row = memo(({ id }: RowProps) => <tr id={id} />)'
    },
    {
      name: 'a component wrapped in React.memo with its own props name',
      code: 'const Row = React.memo(({ id }: RowProps) => <tr id={id} />)'
    },
    {
      name: 'a callback passed to a call other than memo',
      code: 'const Machine = setup((config: MachineConfig) => config)'
    },
    {
      name: 'a function declaration typed with its own props name',
      code: 'function Card(props: CardProps) { return <div {...props} /> }'
    },
    {
      name: 'a this parameter before the props',
      code: 'function Card(this: Window, props: CardProps) { return <div {...props} /> }'
    },
    {
      name: 'a SCREAMING_SNAKE_CASE constant, not a component',
      code: 'const FORMAT_PRICE = (value: Price) => value'
    },
    {
      name: 'a component named in a memo call with its own props name',
      code: 'export default memo(function Row({ id }: RowProps) { return <tr id={id} /> })'
    },
    {
      name: 'a component typed through React.FC with its own props name',
      code: 'const Rating: React.FC<RatingProps> = ({ value }) => <span>{value}</span>'
    },
    {
      name: 'a component typed through FC with no props',
      code: 'const Spinner: FC = () => <span />'
    },
    {
      name: 'a SCREAMING_SNAKE_CASE constant typed through FC',
      code: 'const EMPTY_STATE: FC<Props> = () => <span />'
    }
  ],
  invalid: [
    {
      name: 'an arrow component typed with a bare Props',
      code: 'const Button = ({ label }: Props) => <button>{label}</button>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Button', expected: 'ButtonProps' }
        }
      ]
    },
    {
      name: 'a props type named after something else',
      code: 'const Button = ({ label }: ButtonOptions) => <button>{label}</button>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Button', expected: 'ButtonProps' }
        }
      ]
    },
    {
      name: 'the props type of another component',
      code: 'const IconButton = ({ label }: ButtonProps) => <button>{label}</button>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'IconButton', expected: 'IconButtonProps' }
        }
      ]
    },
    {
      name: 'an inline type literal',
      code: 'const Button = ({ label }: { label: string }) => <button>{label}</button>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Button', expected: 'ButtonProps' }
        }
      ]
    },
    {
      name: 'an inline helper type',
      code: "const Button = (props: ComponentProps<'button'>) => <button {...props} />",
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Button', expected: 'ButtonProps' }
        }
      ]
    },
    {
      name: 'an inline Omit of the right name',
      code: "const Button = (props: Omit<ButtonProps, 'label'>) => <button {...props} />",
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Button', expected: 'ButtonProps' }
        }
      ]
    },
    {
      name: 'a function declaration',
      code: 'function Card(props: CardParams) { return <div {...props} /> }',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Card', expected: 'CardProps' }
        }
      ]
    },
    {
      name: 'a component wrapped in memo',
      code: 'const Row = memo(({ id }: RowParams) => <tr id={id} />)',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Row', expected: 'RowProps' }
        }
      ]
    },
    {
      name: 'a function expression',
      code: 'const Card = function (props: CardParams) { return <div {...props} /> }',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Card', expected: 'CardProps' }
        }
      ]
    },
    {
      name: 'a props parameter with a default value',
      code: 'const Button = ({ label }: Props = { label: "" }) => <button>{label}</button>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Button', expected: 'ButtonProps' }
        }
      ]
    },
    {
      name: 'a component named in a memo call',
      code: 'export default memo(function Row({ id }: RowParams) { return <tr id={id} /> })',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Row', expected: 'RowProps' }
        }
      ]
    },
    {
      name: 'a qualified name',
      code: 'const Button = (props: Ui.ButtonProps) => <button {...props} />',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Button', expected: 'ButtonProps' }
        }
      ]
    },
    {
      name: 'a component typed through React.FC with a bare Props',
      code: 'const Rating: React.FC<Props> = ({ value }) => <span>{value}</span>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Rating', expected: 'RatingProps' }
        }
      ]
    },
    {
      name: 'a component typed through FC with a bare Props',
      code: 'const Rating: FC<Props> = ({ value }) => <span>{value}</span>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Rating', expected: 'RatingProps' }
        }
      ]
    },
    {
      name: 'a component typed through FunctionComponent with an inline type',
      code: 'const Rating: FunctionComponent<{ value: number }> = ({ value }) => <span>{value}</span>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Rating', expected: 'RatingProps' }
        }
      ]
    },
    {
      name: 'a component typed through FC with a wrapped props name',
      code: 'const Rating: FC<PropsWithChildren<RatingProps>> = ({ children }) => <span>{children}</span>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Rating', expected: 'RatingProps' }
        }
      ]
    },
    {
      name: 'a component typed through FC with its props name and a parameter with another name',
      code: 'const Rating: FC<RatingProps> = ({ value }: Props) => <span>{value}</span>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Rating', expected: 'RatingProps' }
        }
      ]
    },
    {
      name: 'a component typed through FC and a typed parameter, each wrong type reported',
      code: 'const Rating: FC<Props> = ({ value }: Props) => <span>{value}</span>',
      errors: [
        {
          messageId: 'mismatch',
          data: { component: 'Rating', expected: 'RatingProps' }
        },
        {
          messageId: 'mismatch',
          data: { component: 'Rating', expected: 'RatingProps' }
        }
      ]
    }
  ]
})
