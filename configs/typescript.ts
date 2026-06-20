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
    'getter-return': ['error', { allowImplicit: false }],

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
    'default-case': ['error', { commentPattern: 'no default' }],

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
    'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: false }],

    // Disallow adding to native types
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extend-native
    'no-extend-native': ['error', { exceptions: [] }],

    // Disallow unnecessary labels
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-label
    'no-extra-label': 'error',

    // Disallow fallthrough of case statements
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-fallthrough
    'no-fallthrough': [
      'error',
      {
        allowEmptyCase: false,
        commentPattern: 'falls?\\s?through',
        reportUnusedFallthroughComment: false
      }
    ],

    // Disallow reassignments of native objects or read-only globals
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-global-assign
    'no-global-assign': ['error', { exceptions: [] }],

    // Disallow implicit type conversions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-coercion
    'no-implicit-coercion': [
      'error',
      {
        allow: [],
        boolean: true,
        disallowTemplateShorthand: false,
        number: true,
        string: true
      }
    ],

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

    // Disallow use of __proto__ (deprecated, use Object.getPrototypeOf/setPrototypeOf)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-proto
    'no-proto': 'error',

    // Disallow calling Object.prototype methods directly on objects
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-prototype-builtins
    'no-prototype-builtins': 'error',

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

    // Disallow use of new Function() (equivalent to eval)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-func
    'no-new-func': 'error',

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
    'no-unneeded-ternary': ['error', { defaultAssignment: true }],

    // Disallow use of the comma operator
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sequences
    'no-sequences': ['error', { allowInParentheses: true }],

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
    'no-unsafe-negation': ['error', { enforceForOrderingRelations: false }],

    // Enforce comparing typeof expressions against valid strings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/valid-typeof
    'valid-typeof': ['error', { requireStringLiterals: false }],

    // Require calls to isNaN() when checking for NaN
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/use-isnan
    'use-isnan': [
      'error',
      { enforceForIndexOf: false, enforceForSwitchCase: true }
    ],

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
    'no-useless-escape': ['error', { allowRegexCharacters: [] }],

    // Disallow redundant return; keywords
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-return
    'no-useless-return': 'error',

    // Disallow assignments that are never read (dead stores)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-assignment
    'no-useless-assignment': 'error',

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
    'no-shadow-restricted-names': ['error', { reportGlobalThis: true }],

    // Disallow use of undeclared variables unless mentioned in a /*global */ block
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undef
    'no-undef': ['error', { typeof: true }],

    // Enforce shorthand syntax for object properties and methods
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/object-shorthand
    'object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: true,
        ignoreConstructors: false,
        avoidExplicitReturnArrows: false,
        methodsIgnorePattern: ''
      }
    ],

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
    'no-promise-executor-return': ['error', { allowVoid: false }],

    // Disallow invalid regular expression strings in RegExp constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-invalid-regexp
    'no-invalid-regexp': ['error', { allowConstructorFlags: [] }],

    // Disallow this/super before calling super() in constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-this-before-super
    'no-this-before-super': 'error',

    // Disallow use of optional chaining in contexts where undefined is not allowed
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-optional-chaining
    'no-unsafe-optional-chaining': [
      'error',
      { disallowArithmeticOperators: false }
    ],

    // Disallow control flow statements in finally blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-finally
    'no-unsafe-finally': 'error',

    // Disallow useless computed property keys
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-computed-key
    'no-useless-computed-key': ['error', { enforceForClassMembers: true }],

    // Disallow renaming import, export, and destructured assignments to the same name
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-rename
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreExport: false,
        ignoreImport: false
      }
    ],

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
    'no-constant-condition': ['error', { checkLoops: 'allExceptWhileTrue' }],

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
    yoda: ['error', 'never', { exceptRange: false, onlyEquality: false }],

    // Disallow the unary operators ++ and --
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-plusplus
    'no-plusplus': ['error', { allowForLoopAfterthoughts: false }],

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

    // Detect approximate constants that should use Math.*
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/approx-constant
    'oxc/approx-constant': 'error',

    // Disallow this in exported functions (undefined after bundling)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-this-in-exported-function
    'oxc/no-this-in-exported-function': 'error',

    // Disallow spread in map() — Object.assign fix mutates, dangerous in React
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-map-spread
    'oxc/no-map-spread': 'off',

    // Disallow async Express handlers — Express 5 handles natively
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-endpoint-handlers
    'oxc/no-async-endpoint-handlers': 'off',

    // Disallow barrel files re-exporting too many modules
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-barrel-file
    'oxc/no-barrel-file': ['error', { threshold: 10 }],

    // Disallow async/await — no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-await
    'oxc/no-async-await': 'off',

    // Disallow optional chaining — no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-optional-chaining
    'oxc/no-optional-chaining': 'off',

    // Disallow rest/spread properties — no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-rest-spread-properties
    'oxc/no-rest-spread-properties': 'off',

    // Enforce kebab-case for filenames
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/filename-case
    // ignore: framework conventions ($param.tsx, [slug].tsx, [...catchAll].tsx)
    'unicorn/filename-case': [
      'error',
      { case: 'kebabCase', ignore: ['^[\\[$]'] }
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
    'unicorn/no-array-reverse': ['error', { allowExpressionStatement: true }],

    // Prefer Array#toSorted() over Array#sort() to avoid mutation
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-sort
    'unicorn/no-array-sort': ['error', { allowExpressionStatement: true }],

    // Require using new when throwing an error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/throw-new-error
    'unicorn/throw-new-error': 'error',

    // Prefer includes() over indexOf() when checking for existence
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-includes
    'unicorn/prefer-includes': 'error',

    // Prefer find() over filter()[0] when searching for a single element
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-find
    'unicorn/prefer-array-find': 'error',

    // Deprecated in oxlint v1.70 — replaced by type-aware @typescript-eslint/prefer-string-starts-ends-with
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-starts-ends-with
    'unicorn/prefer-string-starts-ends-with': 'off',

    // Prefer .at() for accessing elements by negative index
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-at
    'unicorn/prefer-at': [
      'error',
      {
        checkAllIndexAccess: false,
        getLastElementFunctions: []
      }
    ],

    // Prefer Number static properties over global ones
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-properties
    'unicorn/prefer-number-properties': [
      'error',
      { checkInfinity: false, checkNaN: true }
    ],

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
    'unicorn/no-useless-undefined': [
      'error',
      { checkArguments: true, checkArrowFunctionBody: true }
    ],

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
    'unicorn/no-typeof-undefined': ['error', { checkGlobalVariables: false }],

    // Prefer Object.fromEntries() over reduce to create objects
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-object-from-entries
    'unicorn/prefer-object-from-entries': [
      'error',
      { functions: ['_.fromPairs', 'lodash.fromPairs'] }
    ],

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

    // Prefer import.meta.dirname/filename over __dirname/__filename
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-import-meta-properties
    'unicorn/prefer-import-meta-properties': 'error',

    // Disallow useless spread operators
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-spread
    'unicorn/no-useless-spread': 'error',

    // Disallow unnecessary iterator-to-array conversion
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-iterator-to-array
    'unicorn/no-useless-iterator-to-array': 'error',

    // Disallow useless Promise.resolve/reject in async functions
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-promise-resolve-reject
    'unicorn/no-useless-promise-resolve-reject': [
      'error',
      { allowReject: false }
    ],

    // Prefer structuredClone over JSON.parse(JSON.stringify())
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-structured-clone
    'unicorn/prefer-structured-clone': [
      'error',
      { functions: ['cloneDeep', 'utils.clone'] }
    ],

    // Enforce the name `error` in catch clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/catch-error-name
    'unicorn/catch-error-name': ['error', { ignore: [], name: 'error' }],

    // Prefer .slice() over .substring() and .substr()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-slice
    'unicorn/prefer-string-slice': 'error',

    // Enforce numeric separators for readability
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/numeric-separators-style
    'unicorn/numeric-separators-style': [
      'error',
      {
        onlyIfContainsSeparator: false,
        binary: { groupLength: 4, minimumDigits: 0 },
        hexadecimal: { groupLength: 2, minimumDigits: 0 },
        number: { groupLength: 3, minimumDigits: 5 },
        octal: { groupLength: 4, minimumDigits: 0 }
      }
    ],

    // Prefer Set#size over converting to array
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-size
    'unicorn/prefer-set-size': 'error',

    // Enforce consistent text encoding identifier casing (utf-8)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/text-encoding-identifier-case
    'unicorn/text-encoding-identifier-case': ['error', { withDash: false }],

    // Enforce consistent break/return position in switch cases
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/switch-case-break-position
    'unicorn/switch-case-break-position': 'error',

    // Disallow disable comments without specifying a rule
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-abusive-eslint-disable
    'unicorn/no-abusive-eslint-disable': 'error',

    // Enforce consistent style for escaping ${ in template literals
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-template-literal-escape
    'unicorn/consistent-template-literal-escape': 'error',

    // Require a message when throwing Error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/error-message
    'unicorn/error-message': 'error',

    // Prefer Array.isArray() over instanceof Array (cross-realm safe)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-builtins
    'unicorn/no-instanceof-builtins': [
      'error',
      {
        exclude: [],
        include: [],
        strategy: 'strict',
        useErrorIsError: false
      }
    ],

    // Enforce new for Map/Set/Error, forbid new for String/Number/Boolean
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/new-for-builtins
    'unicorn/new-for-builtins': 'error',

    // Prefer || or ?? over redundant ternary
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-logical-operator-over-ternary
    'unicorn/prefer-logical-operator-over-ternary': 'error',

    // Throw TypeError after type checks instead of generic Error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-type-error
    'unicorn/prefer-type-error': 'error',

    // Enforce === -1 / !== -1 for indexOf checks
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-existence-index-check
    'unicorn/consistent-existence-index-check': 'error',

    // Prefer globalThis — too restrictive for browser-specific code
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-global-this
    'unicorn/prefer-global-this': 'off',

    // Prefer Set.has() for lookups — Array.includes is fine for small arrays
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-has
    'unicorn/prefer-set-has': 'off',

    // Prefer re-export from instead of import + export
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-export-from
    'unicorn/prefer-export-from': ['error', { checkUsedVariables: true }],

    // Prefer EventTarget over EventEmitter (web standard)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-event-target
    'unicorn/prefer-event-target': 'error',

    // Prefer indexOf() over findIndex() with simple equality
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-index-of
    'unicorn/prefer-array-index-of': 'error',

    // Enforce uppercase escape sequences
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/escape-case
    'unicorn/escape-case': 'error',

    // Enforce lowercase prefix in number literals (0xff not 0XFF)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/number-literal-case
    'unicorn/number-literal-case': 'error',

    // Detect useless case before default in switch
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-switch-case
    'unicorn/no-useless-switch-case': 'error',

    // Enforce consistent types in ternary array spreads
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-empty-array-spread
    'unicorn/consistent-empty-array-spread': 'error',

    // Allow catch parameter even if unused
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-optional-catch-binding
    'unicorn/prefer-optional-catch-binding': 'off',

    // Disallow leading/trailing spaces in console.log
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-console-spaces
    'unicorn/no-console-spaces': 'error',

    // Prefer Unicode escape over hex escape — too niche
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-hex-escape
    'unicorn/no-hex-escape': 'off',

    // Force braces in switch cases — too opinionated
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/switch-case-braces
    'unicorn/switch-case-braces': 'off',

    // Disallow null — null is semantically different from undefined
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-null
    'unicorn/no-null': 'off',

    // Disallow Array.reduce — valid for accumulations
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-reduce
    'unicorn/no-array-reduce': 'off',

    // Disallow passing function references to array methods — .filter(Boolean) is idiomatic
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-callback-reference
    'unicorn/no-array-callback-reference': 'off',

    // Prefer codePointAt over charCodeAt — charCodeAt fine for ASCII
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-code-point
    'unicorn/prefer-code-point': 'off',

    // Prefer addEventListener over onclick=
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-add-event-listener
    'unicorn/prefer-add-event-listener': 'error',

    // Prefer append() over appendChild()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-append
    'unicorn/prefer-dom-node-append': 'error',

    // Prefer dataset over getAttribute('data-') — dataset not on Element type, only HTMLElement
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-dataset
    'unicorn/prefer-dom-node-dataset': 'off',

    // Prefer textContent over innerText
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-text-content
    'unicorn/prefer-dom-node-text-content': 'error',

    // Prefer remove() over parentNode.removeChild()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-remove
    'unicorn/prefer-dom-node-remove': 'error',

    // Prefer event.key over event.keyCode
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-keyboard-event-key
    'unicorn/prefer-keyboard-event-key': 'error',

    // Prefer querySelector over getElementById
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-query-selector
    'unicorn/prefer-query-selector': 'error',

    // Prefer classList.toggle over add/remove
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-classlist-toggle
    'unicorn/prefer-classlist-toggle': 'error',

    // Prefer Math.min/Math.max over ternary
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-math-min-max
    'unicorn/prefer-math-min-max': 'error',

    // Prefer Math.trunc over ~~ or | 0
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-math-trunc
    'unicorn/prefer-math-trunc': 'error',

    // Prefer modern Math APIs (Math.hypot, Math.log2, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-modern-math-apis
    'unicorn/prefer-modern-math-apis': 'error',

    // Prefer Number() over +x, String() over '' + x
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-native-coercion-functions
    'unicorn/prefer-native-coercion-functions': 'error',

    // Prefer Reflect.apply over fn.apply()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-reflect-apply
    'unicorn/prefer-reflect-apply': 'error',

    // Prefer Array.prototype.slice over [].slice
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-prototype-methods
    'unicorn/prefer-prototype-methods': 'error',

    // Require explicit separator in .join()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-array-join-separator
    'unicorn/require-array-join-separator': 'error',

    // Require explicit digits argument in .toFixed()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-number-to-fixed-digits-argument
    'unicorn/require-number-to-fixed-digits-argument': 'error',

    // Hoist functions that don't depend on outer scope
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-function-scoping
    'unicorn/consistent-function-scoping': 'error',

    // Prefer new Date(date) for cloning dates
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-date-clone
    'unicorn/consistent-date-clone': 'error',

    // Disallow .fill() with mutable reference type (all elements share same reference)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-fill-with-reference-type
    'unicorn/no-array-fill-with-reference-type': 'error',

    // Disallow (await foo).bar — assign first
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-await-expression-member
    'unicorn/no-await-expression-member': 'error',

    // Enforce specific import styles per module — too project-specific for shared config
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/import-style
    'unicorn/import-style': 'off',

    // Allow objects as default parameters
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-object-as-default-parameter
    'unicorn/no-object-as-default-parameter': 'off',

    // Disallow const self = this — use arrow functions
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-this-assignment
    'unicorn/no-this-assignment': 'error',

    // Disallow static-only classes — use module functions
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-static-only-class
    'unicorn/no-static-only-class': 'error',

    // Prefer blob.text() over FileReader
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-blob-reading-methods
    'unicorn/prefer-blob-reading-methods': 'error',

    // Prefer Response.json() over new Response(JSON.stringify())
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-response-static-json
    'unicorn/prefer-response-static-json': 'error',

    // Prefer 123n over BigInt(123)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-bigint-literals
    'unicorn/prefer-bigint-literals': 'error',

    // Prefer ternary over if/else for assignments
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-ternary
    'unicorn/prefer-ternary': 'error',

    // Prefer String.raw for backslash-heavy strings — too niche, noisy on regex patterns
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-raw
    'unicorn/prefer-string-raw': 'off',

    // Merge consecutive calls to variadic methods (push, unshift, classList.add)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-single-call
    'unicorn/prefer-single-call': ['error', { ignore: [] }],

    // Allow process.exit() in CLI tools
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-process-exit
    'unicorn/no-process-exit': 'off',

    // Allow document.cookie
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-document-cookie
    'unicorn/no-document-cookie': 'off',

    // Prefer ESM — already covered by import/no-commonjs
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-module
    'unicorn/prefer-module': 'off',

    // Enforce explicit arr.length > 0 over truthy check
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/explicit-length-check
    'unicorn/explicit-length-check': 'error',

    // Disallow thisArg in array methods — arrow functions handle it
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-method-this-argument
    'unicorn/no-array-method-this-argument': 'error',

    // Prefer new URL('foo', base) over new URL('./foo', base)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/relative-url-style
    'unicorn/relative-url-style': 'error',

    // Enforce custom Error class pattern
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/custom-error-definition
    'unicorn/custom-error-definition': 'error',

    // Disallow spaces in empty braces { } → {}
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/empty-brace-spaces
    'unicorn/empty-brace-spaces': 'error',

    // Allow .flat(2) without named variable
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-magic-array-flat-depth
    'unicorn/no-magic-array-flat-depth': 'off',

    // Disabled — false positives with Zod .catch() (see GAPS.md)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-top-level-await
    'unicorn/prefer-top-level-await': 'off',

    // Consistent assert style — rarely used in frontend
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-assert
    'unicorn/consistent-assert': 'off',

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
    'no-redeclare': ['error', { builtinGlobals: true }],

    // Disallow variable declarations from shadowing variables declared in the outer scope
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow
    'no-shadow': [
      'error',
      {
        allow: [],
        builtinGlobals: false,
        hoist: 'functions-and-types',
        ignoreFunctionTypeParameterNameValueShadow: true,
        ignoreOnInitialization: false,
        ignoreTypeValueShadow: true
      }
    ],

    // Disallow unused expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-expressions
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
        ignoreDirectives: false
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
    '@typescript-eslint/array-type': [
      'error',
      { default: 'array', readonly: 'array' }
    ],

    // Enforce type definitions to consistently use type instead of interface
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-definitions
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    // Disallow the any type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-explicit-any
    '@typescript-eslint/no-explicit-any': [
      'error',
      { fixToUnknown: false, ignoreRestArgs: false }
    ],

    // Disallow the {} type (matches any non-nullish value, not "empty object")
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-object-type
    '@typescript-eslint/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'never',
        allowObjectTypes: 'never'
      }
    ],

    // Disallow the Function type (no type safety)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-function-type
    '@typescript-eslint/no-unsafe-function-type': 'error',

    // Disallow explicit return type annotations on functions (trust inference)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-function-return-type
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowExpressions: false,
        allowFunctionsWithoutTypeParameters: false,
        allowHigherOrderFunctions: true,
        allowIIFEs: false,
        allowTypedFunctionExpressions: true,
        allowedNames: []
      }
    ],

    // Enforce type-only imports — disabled, handled by import/consistent-type-specifier-style (prefer-inline)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-imports
    '@typescript-eslint/consistent-type-imports': 'off',

    // Enforce export type { T } for type-only exports
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-exports
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: true }
    ],

    // Disabled — conflicts with import/consistent-type-specifier-style: 'prefer-inline'
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-import-type-side-effects
    '@typescript-eslint/no-import-type-side-effects': 'off',

    // Disallow unnecessarily defining types for simple inferred values
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-inferrable-types
    '@typescript-eslint/no-inferrable-types': [
      'error',
      { ignoreParameters: true }
    ],

    // Disallow TypeScript namespaces
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-namespace
    '@typescript-eslint/no-namespace': [
      'error',
      { allowDeclarations: false, allowDefinitionFiles: true }
    ],

    // Disallow non-null assertions after an optional chain expression
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-optional-chain
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // Disallow non-null assertion with nullish coalescing (contradictory: ! + ??)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-nullish-coalescing
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',

    // Disallow require() imports in TypeScript (use ESM imports)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-require-imports
    '@typescript-eslint/no-require-imports': [
      'error',
      { allow: [], allowAsImport: false }
    ],

    // Require class properties that are never reassigned to be readonly
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly
    '@typescript-eslint/prefer-readonly': [
      'error',
      { onlyInlineLambdas: false }
    ],

    // Enforce RegExp#exec() over String#match() when no global flag
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-regexp-exec
    '@typescript-eslint/prefer-regexp-exec': 'error',

    // Require explicit accessibility modifiers on class members
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-member-accessibility
    '@typescript-eslint/explicit-member-accessibility': 'off',

    // Enforce function name matches variable/property name — rare in modern TS
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-name-matching
    'func-name-matching': [
      'off',
      'always',
      {
        considerPropertyDescriptor: false,
        includeCommonJSModuleExports: false
      }
    ],

    // Disallow dangling underscores — too many legitimate uses (_unused, __typename, _id)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-underscore-dangle
    'no-underscore-dangle': [
      'off',
      {
        allow: [],
        allowAfterSuper: false,
        allowAfterThis: false,
        allowAfterThisConstructor: false,
        allowFunctionParams: true,
        allowInArrayDestructuring: true,
        allowInObjectDestructuring: true,
        allowInUsingDeclarations: false,
        enforceInClassFields: false,
        enforceInMethodNames: false
      }
    ],

    // Enforce the u or v flag on regular expressions for proper Unicode handling
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-unicode-regexp
    'require-unicode-regexp': 'error',

    // Disallow specific properties on specific objects — project-specific, enable downstream
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-properties
    'no-restricted-properties': 'off',

    // Enforce logical assignment operator shorthand (||=, &&=, ??=)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/logical-assignment-operators
    'logical-assignment-operators': [
      'error',
      'always',
      { enforceForIfStatements: true }
    ],

    // Prefer regex literals over new RegExp() when pattern is static
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-regex-literals
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

    // Prefer arrow functions for callbacks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-arrow-callback
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: true }
    ],

    // Disallow passing strings to setTimeout/setInterval (implied eval)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implied-eval
    'no-implied-eval': 'error',

    // Enforce identifier naming via regex — too blunt, waiting on @typescript-eslint/naming-convention
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-match
    'id-match': 'off',

    // Disallow declarations in the global scope — irrelevant for ESM/TypeScript
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-globals
    'no-implicit-globals': 'off',

    // Disallow unnecessary type constraints (extends any / extends unknown)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-constraint
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',

    // Disallow non-null assertion next to equality (a! == b looks like a !== b)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-confusing-non-null-assertion
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',

    // Disallow classes used as namespaces (static-only, empty, constructor-only)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-extraneous-class
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowConstructorOnly: false,
        allowEmpty: false,
        allowStaticOnly: false,
        allowWithDecorator: true
      }
    ],

    // Enforce consistent type assertion style (as > angle-bracket)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-assertions
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
        arrayLiteralTypeAssertions: 'allow-as-parameter'
      }
    ],

    // Enforce type argument on constructor call, not annotation
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-generic-constructors
    '@typescript-eslint/consistent-generic-constructors': [
      'error',
      'constructor'
    ],

    // Prefer for-of when index is only used for element access
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-for-of
    '@typescript-eslint/prefer-for-of': 'error',

    // Prefer function type over interface with single call signature
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-function-type
    '@typescript-eslint/prefer-function-type': 'error',

    // Unify overload signatures that can be combined
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/unified-signatures
    '@typescript-eslint/unified-signatures': [
      'error',
      {
        ignoreDifferentlyNamedParameters: false,
        ignoreOverloadsWithDifferentJSDoc: false
      }
    ],

    // Require overload signatures to be adjacent
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/adjacent-overload-signatures
    '@typescript-eslint/adjacent-overload-signatures': 'error',

    // Remove obsolete TSLint comments
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-tslint-comment
    '@typescript-eslint/ban-tslint-comment': 'error',

    // Enforce Record<K, V> over index signatures
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-indexed-object-style
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],

    // Prefer readonly fields over trivial getters for literals
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/class-literal-property-style
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],

    // Allow both parameter properties and explicit declarations
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/parameter-properties
    '@typescript-eslint/parameter-properties': 'off',

    // Disallow non-null assertion operator (!)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-assertion
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Disallow void type outside return positions and generics
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-invalid-void-type
    '@typescript-eslint/no-invalid-void-type': [
      'error',
      {
        allowAsThisParameter: false,
        allowInGenericTypeArguments: true
      }
    ],

    // Enforce literal values in enum members (no computed expressions)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-literal-enum-member
    '@typescript-eslint/prefer-literal-enum-member': [
      'error',
      { allowBitwiseExpressions: false }
    ],

    // Disallow dynamic delete on computed keys — prefer Map/Set
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-dynamic-delete
    '@typescript-eslint/no-dynamic-delete': 'error',

    // Require explicit initializers on all enum members
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-enum-initializers
    '@typescript-eslint/prefer-enum-initializers': 'error',

    // Prefer @ts-expect-error over @ts-ignore (detects stale suppressions)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-ts-expect-error
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    // Enforce property syntax over method shorthand in interfaces (safer with strictFunctionTypes)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/method-signature-style
    '@typescript-eslint/method-signature-style': ['error', 'property'],

    // Prefer named regex capture groups — too noisy for simple patterns
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-named-capture-group
    'prefer-named-capture-group': 'off'

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
    // '@typescript-eslint/no-unnecessary-type-conversion': 'error',
    // '@typescript-eslint/no-unnecessary-type-parameters': 'error',
    // '@typescript-eslint/no-unnecessary-qualifier': 'error',
    // '@typescript-eslint/prefer-readonly-parameter-types': ['error', { allow: [], checkParameterProperties: true, ignoreInferredTypes: false, treatMethodsAsReadonly: false }],
    // '@typescript-eslint/prefer-optional-chain': ['error', { checkAny: true, checkBigInt: true, checkBoolean: true, checkNumber: true, checkString: true, checkUnknown: true, requireNullish: false, allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing: false }],
    // '@typescript-eslint/no-unsafe-type-assertion': 'error',
    // '@typescript-eslint/no-unnecessary-template-expression': 'error',
    // '@typescript-eslint/related-getter-setter-pairs': 'error',
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
