import type { OxlintConfig } from 'oxlint'

/**
 * Required base config. TypeScript, core, unicorn, and oxc rules.
 *
 * @example
 * ```ts
 * extends: [typescript, imports]
 * ```
 */
export default {
  plugins: ['typescript', 'unicorn'],
  env: {
    browser: true,
    node: true,
    es2024: true
  },
  categories: {
    correctness: 'error',
    suspicious: 'off',
    pedantic: 'off',
    perf: 'off',
    style: 'off',
    restriction: 'off',
    nursery: 'off'
  },
  options: {
    reportUnusedDisableDirectives: 'error',
    denyWarnings: true,
    maxWarnings: 0,
    typeAware: false,
    typeCheck: false
  },
  rules: {
    // Force curly braces in all control flow
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/curly
    curly: ['error', 'all'],

    // Enforce return statements in callbacks of array methods
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/array-callback-return
    'array-callback-return': [
      'error',
      { allowImplicit: true, checkForEach: true }
    ],

    // Enforce for loop update clause moving the counter in the right direction
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/for-direction
    'for-direction': 'error',

    // Enforce return statements in getters
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/getter-return
    'getter-return': 'error',

    // Treat var statements as if they were block scoped
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/block-scoped-var
    'block-scoped-var': 'error',

    // Specify the maximum cyclomatic complexity allowed in a program
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/complexity
    complexity: ['error', 20],

    // Disallow nested ternary expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-nested-ternary
    'no-nested-ternary': 'error',

    // Enforce a maximum number of parameters in function definitions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-params
    'max-params': ['error', { max: 3 }],

    // Enforce a maximum depth of nested blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-depth
    'max-depth': ['error', { max: 3 }],

    // Enforce a maximum number of lines per function
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-lines-per-function
    'max-lines-per-function': [
      'error',
      { max: 250, skipBlankLines: true, skipComments: true }
    ],

    // Enforce that class methods use "this"
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/class-methods-use-this
    'class-methods-use-this': ['error', { exceptMethods: [] }],

    // Disallow comparing against -0
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-compare-neg-zero
    'no-compare-neg-zero': 'error',

    // Disallow sparse arrays
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sparse-arrays
    'no-sparse-arrays': 'error',

    // Disallow expressions where the operation doesn't affect the value
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-binary-expression
    'no-constant-binary-expression': 'error',

    // Require default case in switch statements
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case
    'default-case': 'error',

    // Enforce default clauses in switch statements to be last
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case-last
    'default-case-last': 'error',

    // Require the use of === and !==
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/eqeqeq
    eqeqeq: ['error', 'always'],

    // Make sure for-in loops have an if statement
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/guard-for-in
    'guard-for-in': 'error',

    // Disallow the use of alert, confirm, and prompt
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-alert
    'no-alert': 'error',

    // Disallow lexical declarations in case/default clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-case-declarations
    'no-case-declarations': 'error',

    // Disallow returning value in constructor
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constructor-return
    'no-constructor-return': 'error',

    // Disallow else after a return in an if
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-else-return
    'no-else-return': ['error', { allowElseIf: false }],

    // Disallow empty destructuring patterns
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-pattern
    'no-empty-pattern': 'error',

    // Disallow adding to native types
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extend-native
    'no-extend-native': 'error',

    // Disallow unnecessary labels
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-label
    'no-extra-label': 'error',

    // Disallow fallthrough of case statements
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-fallthrough
    'no-fallthrough': 'error',

    // Disallow reassignments of native objects or read-only globals
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-global-assign
    'no-global-assign': 'error',

    // Disallow implicit type conversions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-coercion
    'no-implicit-coercion': 'error',

    // Disallow reassigning function declarations
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-func-assign
    'no-func-assign': 'error',

    // Disallow assigning to imported bindings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-import-assign
    'no-import-assign': 'error',

    // Disallow variable or function declarations in nested blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-inner-declarations
    'no-inner-declarations': ['error', 'both'],

    // Disallow usage of __iterator__ property
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-iterator
    'no-iterator': 'error',

    // Disallow use of labels for anything other than loops and switches
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-labels
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

    // Disallow unnecessary nested blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lone-blocks
    'no-lone-blocks': 'error',

    // Disallow use of multiline strings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-multi-str
    'no-multi-str': 'error',

    // Disallow use of new operator when not part of an assignment or comparison
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new
    'no-new': 'error',

    // Disallow creating new instances of String, Number, and Boolean
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-wrappers
    'no-new-wrappers': 'error',

    // Disallow reassignment of function parameters
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-param-reassign
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsForRegex: [
          'draft',
          'context2D',
          'canvasElement'
        ]
      }
    ],

    // Disallow use of assignment in return statement
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-return-assign
    'no-return-assign': ['error', 'always'],

    // Disallow ternary operators when simpler alternatives exist
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unneeded-ternary
    'no-unneeded-ternary': 'error',

    // Disallow assignments where both sides are exactly the same
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-assign
    'no-self-assign': ['error', { props: true }],

    // Disallow comparisons where both sides are exactly the same
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-compare
    'no-self-compare': 'error',

    // Restrict what can be thrown as an exception
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-throw-literal
    'no-throw-literal': 'error',

    // Disallow unmodified conditions of loops
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unmodified-loop-condition
    'no-unmodified-loop-condition': 'error',

    // Disallow negating the left operand of relational operators
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-negation
    'no-unsafe-negation': 'error',

    // Enforce comparing typeof expressions against valid strings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/valid-typeof
    'valid-typeof': 'error',

    // Require calls to isNaN() when checking for NaN
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/use-isnan
    'use-isnan': 'error',

    // Disallow unreachable code after return, throw, continue, and break statements
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unreachable
    'no-unreachable': 'error',

    // Disallow unused labels
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-labels
    'no-unused-labels': 'error',

    // Disallow unnecessary catch clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-catch
    'no-useless-catch': 'error',

    // Disallow useless string concatenation
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-concat
    'no-useless-concat': 'error',

    // Disallow unnecessary string escaping
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-escape
    'no-useless-escape': 'error',

    // Disallow redundant return; keywords
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-return
    'no-useless-return': 'error',

    // Require using Error objects as Promise rejection reasons
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-promise-reject-errors
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

    // Require use of the second argument for parseInt()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/radix
    radix: 'error',

    // Disallow deletion of variables
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-delete-var
    'no-delete-var': 'error',

    // Disallow labels that share a name with a variable
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-label-var
    'no-label-var': 'error',

    // Enforce minimum identifier length for code readability
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-length
    'id-length': [
      'error',
      { min: 2, exceptions: ['t', '_'], properties: 'never' }
    ],

    // Disallow shadowing of names such as arguments
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow-restricted-names
    'no-shadow-restricted-names': 'error',

    // Disallow use of undeclared variables unless mentioned in a /*global */ block
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undef
    'no-undef': ['error', { typeof: true }],

    // Require braces around arrow function bodies
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/arrow-body-style
    'arrow-body-style': ['error', 'always'],

    // Verify super() callings in constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/constructor-super
    'constructor-super': 'error',

    // Disallow modifying variables of class declarations
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-class-assign
    'no-class-assign': 'error',

    // Disallow duplicate class members
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-class-members
    'no-dupe-class-members': 'error',

    // Disallow modifying variables that are declared using const
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-const-assign
    'no-const-assign': 'error',

    // Disallow new operators with global non-constructor functions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-native-nonconstructor
    'no-new-native-nonconstructor': 'error',

    // Disallow returning values from Promise executor functions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-promise-executor-return
    'no-promise-executor-return': 'error',

    // Disallow invalid regular expression strings in RegExp constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-invalid-regexp
    'no-invalid-regexp': 'error',

    // Disallow this/super before calling super() in constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-this-before-super
    'no-this-before-super': 'error',

    // Disallow use of optional chaining in contexts where undefined is not allowed
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-optional-chaining
    'no-unsafe-optional-chaining': 'error',

    // Disallow control flow statements in finally blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-finally
    'no-unsafe-finally': 'error',

    // Disallow useless computed property keys
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-computed-key
    'no-useless-computed-key': 'error',

    // Disallow renaming import, export, and destructured assignments to the same name
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-rename
    'no-useless-rename': 'error',

    // Require let or const instead of var
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-var
    'no-var': 'error',

    // Suggest using const for variables that are never modified after declared
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-const
    'prefer-const': [
      'error',
      { destructuring: 'any', ignoreReadBeforeAssign: true }
    ],

    // Prefer destructuring from arrays and objects
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: true, object: false }
      },
      { enforceForRenamedProperties: false }
    ],

    // Disallow parseInt() in favor of binary, octal, and hexadecimal literals
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-numeric-literals
    'prefer-numeric-literals': 'error',

    // Use rest parameters instead of arguments
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-rest-params
    'prefer-rest-params': 'error',

    // Suggest using the spread syntax instead of .apply()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-spread
    'prefer-spread': 'error',

    // Suggest using template literals instead of string concatenation
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-template
    'prefer-template': 'error',

    // Disallow using an async function as a Promise executor
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-async-promise-executor
    'no-async-promise-executor': 'error',

    // Disallow template literal placeholder syntax in regular strings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-template-curly-in-string
    'no-template-curly-in-string': 'error',

    // Disallow await inside of loops
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-await-in-loop
    'no-await-in-loop': 'error',

    // Disallow assignment in conditional expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-cond-assign
    'no-cond-assign': ['error', 'always'],

    // Disallow use of console
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-console
    // EXCEPTION: uses 'warn' to allow console statements during development
    'no-console': 'warn',

    // Disallow use of constant expressions in conditions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-condition
    'no-constant-condition': 'error',

    // Disallow use of debugger
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-debugger
    'no-debugger': 'error',

    // Disallow duplicate conditions in if-else-if chains
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-else-if
    'no-dupe-else-if': 'error',

    // Disallow duplicate case labels
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-duplicate-case
    'no-duplicate-case': 'error',

    // Disallow duplicate keys when creating object literals
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-keys
    'no-dupe-keys': 'error',

    // Disallow reassigning exceptions in catch clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-ex-assign
    'no-ex-assign': 'error',

    // Prefer color === "red" over "red" === color
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/yoda
    yoda: 'error',

    // Disallow the unary operators ++ and --
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-plusplus
    'no-plusplus': 'error',

    // Disallow @nocommit comments to prevent committing temporary code
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-warning-comments
    'no-warning-comments': ['error', { terms: ['@nocommit'] }],

    // Detect missing throw before new Error()
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/missing-throw
    'oxc/missing-throw': 'error',

    // Detect chained comparisons that don't work as expected in JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-comparison-sequence
    'oxc/bad-comparison-sequence': 'error',

    // Detect regex without global flag passed to replaceAll()
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-replace-all-arg
    'oxc/bad-replace-all-arg': 'error',

    // Detect inverted Math.min/Math.max (broken clamp)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-min-max-func
    'oxc/bad-min-max-func': 'error',

    // Detect object/array literal comparison (always false)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-object-literal-comparison
    'oxc/bad-object-literal-comparison': 'error',

    // Detect array callbacks that lose their `this` context
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/uninvoked-array-callback
    'oxc/uninvoked-array-callback': 'error',

    // Detect out-of-range numeric arguments (toFixed, parseInt radix, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/number-arg-out-of-range
    'oxc/number-arg-out-of-range': 'error',

    // Detect bitwise operators used instead of logical operators
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-bitwise-operator
    'oxc/bad-bitwise-operator': 'error',

    // Detect charAt() compared to multi-char string (always false)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-char-at-comparison
    'oxc/bad-char-at-comparison': 'error',

    // Detect operations that always erase the value (x * 0, x & 0, x && false)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/erasing-op
    'oxc/erasing-op': 'error',

    // Simplify redundant double comparisons (x === y || x < y → x <= y)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/double-comparisons
    'oxc/double-comparisons': 'error',

    // Detect constant comparisons that are always true or false
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/const-comparisons
    'oxc/const-comparisons': 'error',

    // Detect misrefactored assignment operators (a -= a - b)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/misrefactored-assign-op
    'oxc/misrefactored-assign-op': 'error',

    // Detect O(n²) accumulating spread in loops/reduce
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-accumulating-spread
    'oxc/no-accumulating-spread': 'error',

    // Disallow const enum (broken with isolatedModules/bundlers)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-const-enum
    'oxc/no-const-enum': 'error',

    // Detect duplicated code between if/else branches
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/branches-sharing-code
    'oxc/branches-sharing-code': 'error',

    // Enforce kebab-case for filenames
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/filename-case
    // ignore: framework conventions ($param.tsx, [slug].tsx, [...catchAll].tsx)
    'unicorn/filename-case': [
      'error',
      { case: 'kebabCase', ignore: '^[\\[$]' }
    ],

    // Disallow creating a variable and immediately mutating it
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-immediate-mutation
    'unicorn/no-immediate-mutation': 'error',

    // Disallow useless arguments when constructing Set, Map, WeakSet, WeakMap
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-collection-argument
    'unicorn/no-useless-collection-argument': 'error',

    // Prefer class fields over constructor assignments
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-class-fields
    'unicorn/prefer-class-fields': 'error',

    // Prefer Array#toReversed() over Array#reverse() to avoid mutation
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-reverse
    'unicorn/no-array-reverse': 'error',

    // Prefer Array#toSorted() over Array#sort() to avoid mutation
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-sort
    'unicorn/no-array-sort': 'error',

    // Require using new when throwing an error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/throw-new-error
    'unicorn/throw-new-error': 'error',

    // Prefer includes() over indexOf() when checking for existence
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-includes
    'unicorn/prefer-includes': 'error',

    // Prefer find() over filter()[0] when searching for a single element
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-find
    'unicorn/prefer-array-find': 'error',

    // Prefer startsWith() and endsWith() over regex or slice comparisons
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-starts-ends-with
    'unicorn/prefer-string-starts-ends-with': 'error',

    // Prefer .at() for accessing elements by negative index
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-at
    'unicorn/prefer-at': 'error',

    // Prefer Number static properties over global ones
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-properties
    'unicorn/prefer-number-properties': 'error',

    // Prefer for...of over Array#forEach
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-for-each
    'unicorn/no-array-for-each': 'error',

    // Prefer Array#flat() over legacy techniques to flatten arrays
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-flat
    'unicorn/prefer-array-flat': 'error',

    // Prefer flatMap() over map().flat()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-flat-map
    'unicorn/prefer-array-flat-map': 'error',

    // Disallow useless undefined
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-undefined
    'unicorn/no-useless-undefined': 'error',

    // Prefer String#replaceAll() over regex with global flag
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-replace-all
    'unicorn/prefer-string-replace-all': 'error',

    // Prefer String#trimStart() / String#trimEnd() over trimLeft() / trimRight()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-trim-start-end
    'unicorn/prefer-string-trim-start-end': 'error',

    // Disallow if statements as the only statement in else blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-lonely-if
    'unicorn/no-lonely-if': 'error',

    // Prefer RegExp#test() over String#match() for boolean checks
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-regexp-test
    'unicorn/prefer-regexp-test': 'error',

    // Prefer modern DOM APIs
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-modern-dom-apis
    'unicorn/prefer-modern-dom-apis': 'error',

    // Prefer Date.now() over new Date().getTime()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-date-now
    'unicorn/prefer-date-now': 'error',

    // Prefer === undefined over typeof === 'undefined'
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-typeof-undefined
    'unicorn/no-typeof-undefined': 'error',

    // Prefer Object.fromEntries() over reduce to create objects
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-object-from-entries
    'unicorn/prefer-object-from-entries': 'error',

    // Prefer some() over find() !== undefined for boolean checks
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-some
    'unicorn/prefer-array-some': 'error',

    // Disallow new Array() and prefer Array.from({length: n})
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-new-array
    'unicorn/no-new-array': 'error',

    // Prefer default parameters over reassignment
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-default-parameters
    'unicorn/prefer-default-parameters': 'error',

    // Prefer negative index over length minus index
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-negative-index
    'unicorn/prefer-negative-index': 'error',

    // Enforce usage of the `node:` prefix for builtin imports
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-node-protocol
    'unicorn/prefer-node-protocol': 'error',

    // Disallow useless spread operators
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-spread
    'unicorn/no-useless-spread': 'error',

    // Disallow useless Promise.resolve/reject in async functions
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-promise-resolve-reject
    'unicorn/no-useless-promise-resolve-reject': 'error',

    // Prefer structuredClone over JSON.parse(JSON.stringify())
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-structured-clone
    'unicorn/prefer-structured-clone': 'error',

    // Enforce the name `error` in catch clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/catch-error-name
    'unicorn/catch-error-name': 'error',

    // Prefer .slice() over .substring() and .substr()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-slice
    'unicorn/prefer-string-slice': 'error',

    // Enforce numeric separators for readability
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/numeric-separators-style
    'unicorn/numeric-separators-style': 'error',

    // Prefer Set#size over converting to array
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-size
    'unicorn/prefer-set-size': 'error',

    // Enforce consistent text encoding identifier casing (utf-8)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/text-encoding-identifier-case
    'unicorn/text-encoding-identifier-case': 'error',

    // Disallow disable comments without specifying a rule
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-abusive-eslint-disable
    'unicorn/no-abusive-eslint-disable': 'error',

    // Enforce default parameters to be last
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-param-last
    'default-param-last': 'error',

    // Disallow empty functions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-function
    'no-empty-function': [
      'error',
      { allow: ['arrowFunctions', 'functions', 'methods'] }
    ],

    // Disallow variable redeclaration
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-redeclare
    'no-redeclare': 'error',

    // Disallow variable declarations from shadowing variables declared in the outer scope
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow
    'no-shadow': 'error',

    // Disallow unused expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-expressions
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false
      }
    ],

    // Disallow unused variables
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-vars
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'none',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],

    // Disallow unnecessary constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-constructor
    'no-useless-constructor': 'error',

    // Disallow @ts-<directive> comments or require descriptions after directives
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-ts-comment
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': false
      }
    ],

    // Require consistently using T[] instead of Array<T>
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/array-type
    '@typescript-eslint/array-type': 'error',

    // Enforce type definitions to consistently use type instead of interface
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-definitions
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    // Disallow the any type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-explicit-any
    '@typescript-eslint/no-explicit-any': 'error',

    // Disallow explicit return type annotations on functions (trust inference)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-function-return-type
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Enforce import type { T }
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-imports
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' }
    ],

    // Disallow unnecessarily defining types for simple inferred values
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-inferrable-types
    '@typescript-eslint/no-inferrable-types': [
      'error',
      { ignoreParameters: true }
    ],

    // Disallow TypeScript namespaces
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-namespace
    '@typescript-eslint/no-namespace': 'error',

    // Disallow non-null assertions after an optional chain expression
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-optional-chain
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // Require class properties that are never reassigned to be readonly
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly
    '@typescript-eslint/prefer-readonly': 'error',

    // Enforce RegExp#exec() over String#match() when no global flag
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-regexp-exec
    '@typescript-eslint/prefer-regexp-exec': 'error'

    // Type-aware rules (REQUIRES tsgolint + TypeScript-Go)
    // To enable: set typeAware: true and uncomment these rules.
    // '@typescript-eslint/consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
    // '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
    // '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    // '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    // '@typescript-eslint/no-array-delete': 'error',
    // '@typescript-eslint/prefer-find': 'error',
    // '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    // '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    // '@typescript-eslint/no-duplicate-type-constituents': 'error',
    // '@typescript-eslint/no-deprecated': 'error',
    // '@typescript-eslint/no-misused-spread': 'error',
    // '@typescript-eslint/no-useless-default-assignment': 'error',
    // '@typescript-eslint/strict-void-return': 'off',
    // '@typescript-eslint/require-await': 'off',
  },
  overrides: [
    {
      // Disable rules already checked by the TypeScript compiler
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      rules: {
        'constructor-super': 'off',
        'getter-return': 'off',
        'no-class-assign': 'off',
        'no-const-assign': 'off',
        'no-dupe-class-members': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-import-assign': 'off',
        'no-new-native-nonconstructor': 'off',
        'no-obj-calls': 'off',
        'no-setter-return': 'off',
        'no-this-before-super': 'off',
        'no-undef': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'no-with': 'off',
        'no-redeclare': 'off'
      }
    }
  ]
} satisfies OxlintConfig
