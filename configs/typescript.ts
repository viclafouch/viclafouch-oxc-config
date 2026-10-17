import type { OxlintConfig } from 'oxlint'
import { COMMONJS_CONFIG_FILES } from './globs/index.ts'

/**
 * Required base config. TypeScript, core, unicorn, oxc, node and promise rules.
 *
 * @example
 * ```ts
 * extends: [typescript, imports]
 * ```
 */
export default {
  plugins: ['typescript', 'unicorn', 'node', 'promise'],
  jsPlugins: [
    {
      name: 'viclafouch',
      specifier: '@viclafouch/oxc-config/plugins/viclafouch'
    }
  ],
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
      { allowImplicit: false, checkForEach: true }
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

    // Specify the maximum cyclomatic complexity allowed in a program. A switch counts once, so a switch on a large union stays under the limit
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/complexity
    complexity: ['error', { max: 20, variant: 'modified' }],

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

    // @typescript-eslint/switch-exhaustiveness-check makes each switch on a union list every member instead
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case
    'default-case': ['off', { commentPattern: 'no default' }],

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
    'no-inner-declarations': [
      'error',
      'both',
      { blockScopedFunctions: 'allow', namespaces: 'allow' }
    ],

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

    // @typescript-eslint/only-throw-error replaces it, and reads the type of the thrown value instead of its syntax
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-throw-literal
    'no-throw-literal': 'off',

    // Disallow unmodified conditions of loops
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unmodified-loop-condition
    'no-unmodified-loop-condition': [
      'error',
      // Check each branch of a ternary on its own, not the whole expression
      { checkConditionalExpressions: true }
    ],

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

    // Disallow loops that can only ever run one iteration (nursery)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unreachable-loop
    'no-unreachable-loop': ['error', { ignore: [] }],

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

    // @typescript-eslint/prefer-promise-reject-errors replaces it, and also reports a rejected unknown or any value
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-promise-reject-errors
    'prefer-promise-reject-errors': 'off',

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
      {
        min: 2,
        exceptions: [
          // i18n translator function (react-intl, next-intl)
          't',
          // intentionally unused variable (destructuring rest, Array.from placeholder)
          '_',
          // canonical zod import name (ecosystem standard)
          'z',
          // coordinate axes (touch events, mouse position, SVG)
          'x',
          'y'
        ],
        properties: 'never'
      }
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

    // Always require braces around arrow function bodies for readability
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

    // Require one declarator per declaration statement (never group with commas)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/one-var
    'one-var': ['error', 'never'],

    // Most common naming that is not always understandable
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-denylist
    'id-denylist': [
      'error',
      'err',
      'cb',
      'arr',
      'acc',
      'idx',
      'ctx',
      'res',
      'val',
      'obj',
      'el',
      'elem',
      'req',
      'str'
    ],

    // Suggest using const for variables that are never modified after declared
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-const
    'prefer-const': [
      'error',
      { destructuring: 'any', ignoreReadBeforeAssign: true }
    ],

    // Prefer destructuring from objects (array disabled: [, x] and ;[x] patterns are unreadable)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: false, object: true }
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
    'no-console': ['error', { allow: ['warn', 'error'] }],

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

    // Require a getter for each setter
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/accessor-pairs
    'accessor-pairs': 'error',

    // Keep the getter and the setter of a property next to each other
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/grouped-accessor-pairs
    'grouped-accessor-pairs': 'error',

    // Limit the nesting depth of callbacks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-nested-callbacks
    'max-nested-callbacks': 'error',

    // Disallow Array(a, b) and new Array(a, b), use an array literal
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-array-constructor
    'no-array-constructor': 'error',

    // Disallow a regex literal that starts with = and reads as /=
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-div-regex
    'no-div-regex': 'error',

    // Disallow empty block statements
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty
    'no-empty': 'error',

    // Disallow bind() on a function that does not use this
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-bind
    'no-extra-bind': 'error',

    // Disallow a function in a loop that captures a variable the loop changes
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-loop-func
    'no-loop-func': 'error',

    // Disallow chained assignments such as a = b = c
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-multi-assign
    'no-multi-assign': 'error',

    // Disallow new Object(), use an object literal
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-object-constructor
    'no-object-constructor': 'error',

    // Disallow consecutive spaces in a regex literal, use a quantifier
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-regex-spaces
    'no-regex-spaces': 'error',

    // Disallow call() and apply() that only pass this through
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-call
    'no-useless-call': 'error',

    // Prefer Object.hasOwn() to Object.prototype.hasOwnProperty.call()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-has-own
    'prefer-object-has-own': 'error',

    // Require a description for each Symbol()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/symbol-description
    'symbol-description': 'error',

    // Disallow the Unicode byte order mark
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/unicode-bom
    'unicode-bom': 'error',

    // Attach the caught error as the cause when a catch block throws a new error
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/preserve-caught-error
    'preserve-caught-error': 'error',

    // Disallow an if as the only statement of an else block, use else if
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lonely-if
    'no-lonely-if': 'error',

    // Prefer ** to Math.pow()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-exponentiation-operator
    'prefer-exponentiation-operator': 'error',

    // Prefer an object spread to Object.assign() on an object literal
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-spread
    'prefer-object-spread': 'error',

    // Disallow javascript: URLs. A guard that rejects the scheme takes a justified disable
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-script-url
    'no-script-url': 'error',

    // Require a name on each function expression, so a stack trace shows it
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-names
    'func-names': 'error',

    // tsc already rejects a read before the definition (TS2448, TS2449)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-use-before-define
    'no-use-before-define': 'off',

    // Disallow a comment on the same line as code
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-inline-comments
    'no-inline-comments': 'error',

    // Allow void only as a statement, which marks a floating promise
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-void
    'no-void': ['error', { allowAsStatement: true }],

    // The fix a[i] -= d fails the typecheck under noUncheckedIndexedAccess, and the rule only checks style
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/operator-assignment
    'operator-assignment': 'off',

    // A family of error classes or of test doubles belongs in one file
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-classes-per-file
    'max-classes-per-file': 'off',

    // The logical order of keys carries meaning, such as id before defaultMessage
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-keys
    'sort-keys': 'off',

    // Function declarations stay allowed outside components, react/function-component-definition covers the components
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-style
    'func-style': 'off',

    // Async without await is valid when conforming to an interface or type signature
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-await
    'require-await': 'off',

    // Inverting x !== undefined ? <X /> : null moves the render after the null
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-negated-condition
    'no-negated-condition': 'off',

    // Colors and hashes use bitwise operators on purpose, and TypeScript rejects & between booleans
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-bitwise
    'no-bitwise': 'off',

    // eqeqeq always already rejects == null
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-eq-null
    'no-eq-null': 'off',

    // no-var already rejects var
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/vars-on-top
    'vars-on-top': 'off',

    // one-var never already rejects grouped declarations
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-vars
    'sort-vars': 'off',

    // import/no-duplicates already rejects duplicate imports
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-duplicate-imports
    'no-duplicate-imports': 'off',

    // oxfmt already rewrites an ambiguous line break into a visible call
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unexpected-multiline
    'no-unexpected-multiline': 'off',

    // Without a list of globals the rule checks nothing
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-globals
    'no-restricted-globals': 'off',

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

    // Detect matchAll() called with a non-global regex (throws TypeError at runtime)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-match-all-arg
    'oxc/bad-match-all-arg': 'error',

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
    'unicorn/no-array-sort': [
      'error',
      { allowAfterSpread: false, allowExpressionStatement: true }
    ],

    // Require using new when throwing an error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/throw-new-error
    'unicorn/throw-new-error': 'error',

    // @typescript-eslint/prefer-includes replaces it, and also reports a simple regex test
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-includes
    'unicorn/prefer-includes': 'off',

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
        onlyIfContainsSeparator: true,
        binary: { groupLength: 4, minimumDigits: 0 },
        hexadecimal: { groupLength: 2, minimumDigits: 0 },
        number: { groupLength: 3, minimumDigits: 0, fractionGroupLength: 3 },
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

    // Disallow a getter or a setter that reads or writes its own property
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-accessor-recursion
    'unicorn/no-accessor-recursion': 'error',

    // Require a name on a default export
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-anonymous-default-export
    'unicorn/no-anonymous-default-export': 'error',

    // Disallow array.length as the end argument of slice()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-length-as-slice-end
    'unicorn/no-length-as-slice-end': 'error',

    // Disallow a negated left operand in an equality check, such as !a === b
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-negation-in-equality-check
    'unicorn/no-negation-in-equality-check': 'error',

    // Disallow new Buffer(), use Buffer.from() or Buffer.alloc()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-new-buffer
    'unicorn/no-new-buffer': 'error',

    // Disallow flat(1), the default depth
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-array-flat-depth
    'unicorn/no-unnecessary-array-flat-depth': 'error',

    // Disallow array.length as the delete count of splice()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-array-splice-count
    'unicorn/no-unnecessary-array-splice-count': 'error',

    // Disallow Infinity as the end argument of slice()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-slice-end
    'unicorn/no-unnecessary-slice-end': 'error',

    // Disallow array destructuring with consecutive ignored values, such as [, , c]
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unreadable-array-destructuring
    'unicorn/no-unreadable-array-destructuring': 'error',

    // Disallow Error.captureStackTrace() in an Error subclass constructor
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-error-capture-stack-trace
    'unicorn/no-useless-error-capture-stack-trace': 'error',

    // Disallow an empty import attributes object, such as with {}
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-module-attributes
    'unicorn/require-module-attributes': 'error',

    // Require a target origin on postMessage()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-post-message-target-origin
    'unicorn/require-post-message-target-origin': 'error',

    // Disallow a zero fraction such as 1.0, write 1
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-zero-fractions
    'unicorn/no-zero-fractions': 'error',

    // Disallow an empty export {} or import {} from
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-module-specifiers
    'unicorn/require-module-specifiers': 'error',

    // Prefer [...iterable] to Array.from(iterable), concat() and slice()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-spread
    'unicorn/prefer-spread': 'error',

    // Inverting x !== undefined ? <X /> : null moves the render after the null
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-negated-condition
    'unicorn/no-negated-condition': 'off',

    // unicorn/no-instanceof-builtins in strict mode already rejects instanceof Array
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-array
    'unicorn/no-instanceof-array': 'off',

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

    // Enforce type-only imports — disabled, both forms acceptable
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-imports
    '@typescript-eslint/consistent-type-imports': 'off',

    // Enforce export type { T } for type-only exports
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-exports
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: true }
    ],

    // Disabled — no enforcement on type import style
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

    // Disallow dynamic delete on computed keys (use Map instead)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-dynamic-delete
    '@typescript-eslint/no-dynamic-delete': 'error',

    // Disallow void type outside return positions and generics
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-invalid-void-type
    '@typescript-eslint/no-invalid-void-type': [
      'error',
      {
        allowAsThisParameter: false,
        allowInGenericTypeArguments: true
      }
    ],

    // Disallow non-null assertion operator (!)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-assertion
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Require literal values in enum members
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-literal-enum-member
    '@typescript-eslint/prefer-literal-enum-member': [
      'error',
      { allowBitwiseExpressions: false }
    ],

    // Merge overload signatures that can be unified
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/unified-signatures
    '@typescript-eslint/unified-signatures': [
      'error',
      {
        ignoreDifferentlyNamedParameters: false,
        ignoreOverloadsWithDifferentJSDoc: false
      }
    ],

    // Require explicit accessibility modifiers on class members (no redundant public)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-member-accessibility
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' }
    ],

    // Enforce function name matches variable/property name
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-name-matching
    'func-name-matching': [
      'error',
      'always',
      {
        considerPropertyDescriptor: false,
        includeCommonJSModuleExports: false
      }
    ],

    // Enforce identifier naming via regex — cannot target by type, use naming-convention with tsgolint
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-match
    'id-match': 'off',

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

    // Disallow specific properties on specific objects — configure downstream
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

    // Disallow declarations in the global scope
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-globals
    'no-implicit-globals': ['error', { lexicalBindings: false }],

    // Disallow barrel files that re-export too many modules
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-barrel-file
    'oxc/no-barrel-file': ['error', { threshold: 10 }],

    // Disallow process.env (centralize config via imports)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-process-env
    'node/no-process-env': ['error', { allowedVariables: [] }],

    // Disallow require() inside functions (top-level only)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/global-require
    'node/global-require': 'error',

    // Disallow new require('foo')
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-new-require
    'node/no-new-require': 'error',

    // Require a callback to handle its err parameter
    // https://oxc.rs/docs/guide/usage/linter/rules/node/handle-callback-err
    'node/handle-callback-err': 'error',

    // Disallow an assignment to exports, which breaks module.exports
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-exports-assign
    'node/no-exports-assign': 'error',

    // Disallow a string concatenation with __dirname or __filename, use path.join()
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-path-concat
    'node/no-path-concat': 'error',

    // Disallow synchronous Node.js methods (fs.readFileSync, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-sync
    'node/no-sync': 'off',

    // Disallow mixing require() with other declarations — moot in ESM (require banned)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-mixed-requires
    'node/no-mixed-requires': 'off',

    // Require return before callback in branching code — not used in frontend (async/await)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/callback-return
    'node/callback-return': 'off',

    // Enforce module.exports over exports in the few remaining .cjs files
    // https://oxc.rs/docs/guide/usage/linter/rules/node/exports-style
    'node/exports-style': [
      'error',
      'module.exports',
      { allowBatchAssign: false }
    ],

    // Rationale is require(esm) compatibility — moot in an ESM-only, bundled codebase
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-top-level-await
    'node/no-top-level-await': ['off', { ignoreBin: false }],

    // Not worth enabling the whole jsdoc plugin — zero occurrences across our codebases
    // https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/no-blank-blocks
    'jsdoc/no-blank-blocks': ['off', { enableFixer: false }],

    // Disallow unnecessary Promise.resolve/reject wrapping in handlers
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-return-wrap
    'promise/no-return-wrap': ['error', { allowReject: false }],

    // Enforce resolve/reject parameter names in new Promise()
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/param-names
    'promise/param-names': [
      'error',
      { resolvePattern: '^_?resolve$', rejectPattern: '^_?reject$' }
    ],

    // Disallow nested promise chains (use async/await or flat chaining)
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-nesting
    'promise/no-nesting': 'error',

    // Disallow return in finally() (value is ignored)
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-return-in-finally
    'promise/no-return-in-finally': 'error',

    // Ensure correct argument count for Promise methods
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/valid-params
    'promise/valid-params': 'error',

    // Disallow a resolve or a reject call after the promise already settled
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-multiple-resolved
    'promise/no-multiple-resolved': 'error',

    // Disallow a Promise static method outside the spec
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/spec-only
    'promise/spec-only': 'error',

    // Prefer catch() to then(onFulfilled, onRejected), which misses an error that onFulfilled throws
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-catch
    'promise/prefer-catch': 'error',

    // Prefer await to then(), catch() and finally()
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-then
    'promise/prefer-await-to-then': 'error',

    // Prefer async and await to a callback
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-callbacks
    'promise/prefer-await-to-callbacks': 'error',

    // The rule spots a Node callback by an err or error parameter, so it flags each TanStack Query onError
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-promise-in-callback
    'promise/no-promise-in-callback': 'off',

    // new Promise() is the one bridge from a callback API, such as setTimeout, to a promise
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/avoid-new
    'promise/avoid-new': 'off',

    // Disallow passing strings to setTimeout/setInterval (implied eval)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implied-eval
    'no-implied-eval': 'error',

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

    // Disallow async/await — no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-await
    'oxc/no-async-await': 'off',

    // Disallow optional chaining — no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-optional-chaining
    'oxc/no-optional-chaining': 'off',

    // Disallow rest/spread properties — no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-rest-spread-properties
    'oxc/no-rest-spread-properties': 'off',

    // Require a message when throwing Error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/error-message
    'unicorn/error-message': 'error',

    // Prefer Array.isArray() over instanceof Array (cross-realm safe)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-builtins
    'unicorn/no-instanceof-builtins': [
      'error',
      {
        exclude: ['Error', 'Date'],
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

    // Enforce consistent import styles per module — conflicts with import/no-namespace
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/import-style
    'unicorn/import-style': 'off',

    // Prefer globalThis — too restrictive for browser-specific code
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-global-this
    'unicorn/prefer-global-this': 'off',

    // Prefer Set.has() for lookups — Array.includes is fine for small arrays
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-has
    'unicorn/prefer-set-has': 'off',

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

    // Prefer querySelector()/querySelectorAll() over getElementById()/getElementsByClassName()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-query-selector
    'unicorn/prefer-query-selector': ['error', { allowWithVariables: false }],

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
    'unicorn/consistent-function-scoping': [
      'error',
      { checkArrowFunctions: true }
    ],

    // Disallow an IIFE with a parenthesized arrow function body
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unreadable-iife
    'unicorn/no-unreadable-iife': 'error',

    // Prefer new Date(date) for cloning dates
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-date-clone
    'unicorn/consistent-date-clone': 'error',

    // Disallow (await foo).bar — assign first
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-await-expression-member
    'unicorn/no-await-expression-member': 'error',

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

    // Prefer ternary over if/else for single-line assignments only
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-ternary
    'unicorn/prefer-ternary': ['error', 'only-single-line'],

    // String.raw is niche and hurts readability for simple escape sequences
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-raw
    'unicorn/prefer-string-raw': 'off',

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

    // Disabled — false positives with Zod .catch()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-top-level-await
    'unicorn/prefer-top-level-await': 'off',

    // Consistent assert style — rarely used in frontend
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-assert
    'unicorn/consistent-assert': 'off',

    // Disallow reference values in Array#fill() — all elements share one reference
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-fill-with-reference-type
    'unicorn/no-array-fill-with-reference-type': 'error',

    // Prefer export { x } from over import-then-reexport
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-export-from
    'unicorn/prefer-export-from': ['error', { checkUsedVariables: false }],

    // Combine consecutive push/unshift/classList.add into a single call
    // Disabled: conditional pushes and grouped pushes for readability are common patterns
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-single-call
    'unicorn/prefer-single-call': 'off',

    // Prefer Number() over parseFloat()/parseInt(x, 10) — too risky, Number() returns NaN on
    // partial numeric strings like "12px" where parseFloat returns 12
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-coercion
    'unicorn/prefer-number-coercion': 'off',

    // Limit nested call depth — too many false positives with Zod schema chaining
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/max-nested-calls
    'unicorn/max-nested-calls': 'off',

    // Require explicit delay argument on setTimeout/setInterval (documents 0-tick intent)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/explicit-timer-delay
    'unicorn/explicit-timer-delay': ['error', 'always'],

    // Disallow confusing Array#with() usage (negative or length index bugs)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-confusing-array-with
    'unicorn/no-confusing-array-with': 'error',

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

    // Disallow a chain of type assertions such as `as unknown as User`
    // https://github.com/viclafouch/oxc-config/tree/main/plugins/viclafouch#no-chained-type-assertions
    'viclafouch/no-chained-type-assertions': 'error',

    // Disallow `unknown` and `Promise<unknown>` as a return type
    // https://github.com/viclafouch/oxc-config/tree/main/plugins/viclafouch#no-unknown-returns
    'viclafouch/no-unknown-returns': 'error',

    // Disallow an explicit broad or anonymous type over a value TypeScript already knows: infer it
    // https://github.com/viclafouch/oxc-config/tree/main/plugins/viclafouch#no-known-value-widening
    'viclafouch/no-known-value-widening': 'error',

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

    // Require explicit initializers on all enum members
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-enum-initializers
    '@typescript-eslint/prefer-enum-initializers': 'error',

    // Prefer @ts-expect-error over @ts-ignore (detects stale suppressions)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-ts-expect-error
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    // Enforce property signature style over method signature for strictFunctionTypes safety
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/method-signature-style
    '@typescript-eslint/method-signature-style': ['error', 'property'],

    // Prefer named capture groups in regexes — too noisy for simple alternation/grouping
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-named-capture-group
    'prefer-named-capture-group': 'off',

    // ─── Type-aware rules (require typeAware: true in consumer config) ───

    // Reports an exhaustive switch that returns in every case; noImplicitReturns of TypeScript checks the return paths
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-return
    '@typescript-eslint/consistent-return': [
      'off',
      { treatUndefinedAsUnspecified: true }
    ],

    // Enforce dot notation when type allows it
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/dot-notation
    '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],

    // Enforce return-await inside try/catch for proper stack traces
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/return-await
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],

    // Detect unhandled promises (void keyword opts out intentionally)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-floating-promises
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],

    // Detect Promises in conditions or void callbacks
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-promises
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksConditionals: true,
        checksSpreads: true,
        checksVoidReturn: {
          arguments: true,
          attributes: true,
          inheritedMethods: true,
          properties: true,
          returns: true,
          variables: true
        }
      }
    ],

    // Require a .catch() callback to type its error as unknown, as a catch clause of TypeScript does
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/use-unknown-in-catch-callback-variable
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',

    // Require an Error as a rejection reason. A reject() with no argument stays allowed
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-promise-reject-errors
    '@typescript-eslint/prefer-promise-reject-errors': [
      'error',
      { allowEmptyReject: true }
    ],

    // Force throw new Error() (type-aware version of no-throw-literal)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/only-throw-error
    '@typescript-eslint/only-throw-error': [
      'error',
      {
        allow: [],
        allowRethrowing: true,
        allowThrowingAny: false,
        allowThrowingUnknown: false
      }
    ],

    // Forbid delete on arrays (use splice instead)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-array-delete
    '@typescript-eslint/no-array-delete': 'error',

    // Prefer .find() over .filter()[0]
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-find
    '@typescript-eslint/prefer-find': 'error',

    // Prefer .startsWith()/.endsWith() over regex or slice comparisons
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-string-starts-ends-with
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',

    // Prefer .includes() to .indexOf() !== -1 and to a regex test of a plain string
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-includes
    '@typescript-eslint/prefer-includes': 'error',

    // Prefer explicit type parameter on reduce over casting accumulator
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-reduce-type-parameter
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',

    // Prefer ?? to a null check, and to || on an object, an array or a function. A primitive keeps ||, where '', 0 or false can mean "absent" on purpose
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-nullish-coalescing
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      {
        ignoreBooleanCoercion: false,
        ignoreConditionalTests: true,
        ignoreIfStatements: false,
        ignoreMixedLogicalExpressions: false,
        ignorePrimitives: {
          bigint: true,
          boolean: true,
          number: true,
          string: true
        },
        ignoreTernaryTests: false
      }
    ],

    // Forbid duplicate members in union/intersection types
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-duplicate-type-constituents
    '@typescript-eslint/no-duplicate-type-constituents': 'error',

    // Flag usage of deprecated APIs
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-deprecated
    '@typescript-eslint/no-deprecated': 'error',

    // Forbid spreading non-iterable values or objects into wrong context
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-spread
    '@typescript-eslint/no-misused-spread': 'error',

    // Forbid passing an any value to a typed parameter
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-argument
    '@typescript-eslint/no-unsafe-argument': 'error',

    // Forbid assigning an any value to a variable, a property or a destructured binding
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-assignment
    '@typescript-eslint/no-unsafe-assignment': 'error',

    // Forbid calling an any value
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-call
    '@typescript-eslint/no-unsafe-call': 'error',

    // Disallow property access on any
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-member-access
    '@typescript-eslint/no-unsafe-member-access': [
      'error',
      { allowOptionalChaining: false }
    ],

    // Forbid returning an any value from a function
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-return
    '@typescript-eslint/no-unsafe-return': 'error',

    // Forbid comparing an enum to a value outside it, such as the same enum declared twice
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-enum-comparison
    '@typescript-eslint/no-unsafe-enum-comparison': 'error',

    // Forbid an `as` that narrows a type: a type guard proves what the assertion only claims
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-type-assertion
    '@typescript-eslint/no-unsafe-type-assertion': 'error',

    // Flag default assignments that duplicate the parameter default
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-useless-default-assignment
    '@typescript-eslint/no-useless-default-assignment': 'error',

    // Forbid type conversions that don't change the runtime type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-conversion
    '@typescript-eslint/no-unnecessary-type-conversion': 'error',

    // Detect as/! assertions that don't change the type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-assertion
    '@typescript-eslint/no-unnecessary-type-assertion': [
      'error',
      { checkLiteralConstAssertions: false, typesToIgnore: [] }
    ],

    // Forbid a type argument equal to the default of its type parameter
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-arguments
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',

    // Forbid comparing a boolean to true or false. A nullable boolean keeps its comparison
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-boolean-literal-compare
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
      'error',
      {
        allowComparingNullableBooleansToTrue: true,
        allowComparingNullableBooleansToFalse: true
      }
    ],

    // Forbid a template literal that wraps one expression and adds no text
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-template-expression
    '@typescript-eslint/no-unnecessary-template-expression': 'error',

    // Forbid type parameters that could be inferred or are only used once
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-parameters
    '@typescript-eslint/no-unnecessary-type-parameters': 'error',

    // Forbid unnecessary namespace qualifiers when the name is already in scope
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-qualifier
    '@typescript-eslint/no-unnecessary-qualifier': 'error',

    // Prefer a?.b over a && a.b
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-optional-chain
    '@typescript-eslint/prefer-optional-chain': [
      'error',
      {
        checkAny: true,
        checkBigInt: true,
        checkBoolean: true,
        checkNumber: true,
        checkString: true,
        checkUnknown: true,
        requireNullish: false,
        allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing: false
      }
    ],

    // Verify getter/setter type coherence
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/related-getter-setter-pairs
    '@typescript-eslint/related-getter-setter-pairs': 'error',

    // Disallow awaiting non-Promise values
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/await-thenable
    '@typescript-eslint/await-thenable': 'error',

    // Detect .toString() on objects that return '[object Object]'
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-base-to-string
    '@typescript-eslint/no-base-to-string': [
      'error',
      {
        checkUnknown: false,
        ignoredTypeNames: ['Error', 'RegExp', 'URL', 'URLSearchParams']
      }
    ],

    // Prevent using void expression results in confusing locations
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-confusing-void-expression
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: false,
        ignoreVoidReturningFunctions: false
      }
    ],

    // Disallow for...in on arrays (iterates index strings, not values)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-for-in-array
    '@typescript-eslint/no-for-in-array': 'error',

    // Detect void operator on expressions already returning void
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-meaningless-void-operator
    '@typescript-eslint/no-meaningless-void-operator': [
      'error',
      { checkNever: false }
    ],

    // Disallow mixing string and number members in enums
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-mixed-enums
    '@typescript-eslint/no-mixed-enums': 'error',

    // Detect string | never, any | string (absorbed constituents)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-redundant-type-constituents
    '@typescript-eslint/no-redundant-type-constituents': 'error',

    // Detect conditions that are always truthy/falsy based on type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-condition
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      { allowConstantLoopConditions: false, checkTypePredicates: true }
    ],

    // Disallow unary minus on non-numeric types
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-unary-minus
    '@typescript-eslint/no-unsafe-unary-minus': 'error',

    // Prefer value! over value as T — conflicts with no-non-null-assertion
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/non-nullable-type-assertion-style
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',

    // Force return type this instead of class name for chainable methods
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-return-this-type
    '@typescript-eslint/prefer-return-this-type': 'error',

    // Force async on functions returning Promise — legitimate non-async cases exist
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/promise-function-async
    '@typescript-eslint/promise-function-async': 'off',

    // Force comparator in .sort() to avoid lexicographic sorting
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-array-sort-compare
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      { ignoreStringArrays: false }
    ],

    // Disallow + between incompatible types (string + number)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-plus-operands
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      {
        allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumberAndString: false,
        allowRegExp: false,
        skipCompoundAssignments: false
      }
    ],

    // Disallow interpolating non-stringifiable types in template literals
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-template-expressions
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowAny: false,
        allowArray: false,
        allowBoolean: false,
        allowNever: false,
        allowNullish: false,
        allowNumber: true,
        allowRegExp: false
      }
    ],

    // Force explicit boolean conditions (str !== '' instead of if (str))
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/strict-boolean-expressions
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowAny: false,
        allowNullableBoolean: false,
        allowNullableEnum: false,
        allowNullableNumber: false,
        allowNullableObject: true,
        allowNullableString: false,
        allowNumber: false,
        allowString: false
      }
    ],

    // Detect unbound methods (arr.forEach(obj.method) loses this)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/unbound-method
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: false }],

    // Forbid utility types that resolve to {}, for example Omit of every key: {} accepts any non-nullish value
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-generated-empty-object-type
    '@typescript-eslint/no-generated-empty-object-type': 'error',

    // Require a switch on a union to list every member. A default case stays allowed for an assertNever or a fallback
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/switch-exhaustiveness-check
    '@typescript-eslint/switch-exhaustiveness-check': [
      'error',
      {
        allowDefaultCaseForExhaustiveSwitch: true,
        considerDefaultExhaustiveForUnions: false,
        defaultCaseCommentPattern: 'no default',
        requireDefaultForNonUnion: true
      }
    ],

    // Too invasive, requires readonly on all params including third-party types
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly-parameter-types
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',

    // Forbid returning non-void values where void is expected
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/strict-void-return
    '@typescript-eslint/strict-void-return': 'error',

    // Async without await is valid when conforming to an interface or type signature
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-await
    '@typescript-eslint/require-await': 'off',

    // typescript-eslint removed it in v8, @typescript-eslint/no-empty-object-type and no-restricted-types replace it
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-types
    '@typescript-eslint/ban-types': 'off',

    // The old name of @typescript-eslint/no-empty-object-type, which is on
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-interface
    '@typescript-eslint/no-empty-interface': 'off'
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
    },
    {
      files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
      env: {
        node: true,
        browser: true
      }
    },
    {
      // A tool still loads some JavaScript config files as CommonJS, with require() calls
      files: [...COMMONJS_CONFIG_FILES],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        'node/global-require': 'off'
      }
    }
  ]
} satisfies OxlintConfig
