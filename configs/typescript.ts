import type { OxlintConfig } from 'oxlint'
import { COMMONJS_CONFIG_FILES } from './globs/index.ts'
import { VICLAFOUCH_PLUGIN } from './js-plugins/index.ts'

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
  jsPlugins: [VICLAFOUCH_PLUGIN],
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
    typeAware: true,
    typeCheck: false
  },
  rules: {
    // Force curly braces in all control flow
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/curly.md
    curly: 'error',

    // Enforce return statements in callbacks of array methods
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/array-callback-return.md
    'array-callback-return': ['error', { checkForEach: true }],

    // Enforce for loop update clause moving the counter in the right direction
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/for-direction.md
    'for-direction': 'error',

    // Enforce return statements in getters
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/getter-return.md
    'getter-return': 'error',

    // Treat var statements as if they were block scoped
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/block-scoped-var.md
    'block-scoped-var': 'error',

    // Specify the maximum cyclomatic complexity allowed in a program. A switch counts once, so a switch on a large union stays under the limit
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/complexity.md
    complexity: ['error', { variant: 'modified' }],

    // Disallow nested ternary expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-nested-ternary.md
    'no-nested-ternary': 'error',

    // Enforce a maximum number of parameters in function definitions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-params.md
    'max-params': 'error',

    // Enforce a maximum depth of nested blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-depth.md
    'max-depth': ['error', { max: 3 }],

    // Enforce a maximum number of lines per function
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-lines-per-function.md
    'max-lines-per-function': [
      'error',
      { max: 250, skipBlankLines: true, skipComments: true }
    ],

    // Enforce that class methods use "this"
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/class-methods-use-this.md
    'class-methods-use-this': 'error',

    // Disallow comparing against -0
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-compare-neg-zero.md
    'no-compare-neg-zero': 'error',

    // Disallow sparse arrays
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sparse-arrays.md
    'no-sparse-arrays': 'error',

    // Disallow expressions where the operation doesn't affect the value
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-binary-expression.md
    'no-constant-binary-expression': 'error',

    // @typescript-eslint/switch-exhaustiveness-check makes each switch on a union list every member instead
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case.md
    'default-case': 'off',

    // Enforce default clauses in switch statements to be last
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case-last.md
    'default-case-last': 'error',

    // Require the use of === and !==
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/eqeqeq.md
    eqeqeq: 'error',

    // Make sure for-in loops have an if statement
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/guard-for-in.md
    'guard-for-in': 'error',

    // Disallow the use of alert, confirm, and prompt
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-alert.md
    'no-alert': 'error',

    // Disallow lexical declarations in case/default clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-case-declarations.md
    'no-case-declarations': 'error',

    // Disallow returning value in constructor
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constructor-return.md
    'no-constructor-return': 'error',

    // Disallow else after a return in an if
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-else-return.md
    'no-else-return': ['error', { allowElseIf: false }],

    // Disallow empty destructuring patterns
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-pattern.md
    'no-empty-pattern': 'error',

    // Disallow adding to native types
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extend-native.md
    'no-extend-native': 'error',

    // Disallow unnecessary labels
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-label.md
    'no-extra-label': 'error',

    // Disallow fallthrough of case statements
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-fallthrough.md
    'no-fallthrough': ['error', { commentPattern: 'falls?\\s?through' }],

    // Disallow reassignments of native objects or read-only globals
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-global-assign.md
    'no-global-assign': 'error',

    // Disallow implicit type conversions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-coercion.md
    'no-implicit-coercion': ['error', { allow: [] }],

    // Disallow reassigning function declarations
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-func-assign.md
    'no-func-assign': 'error',

    // Disallow assigning to imported bindings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-import-assign.md
    'no-import-assign': 'error',

    // Disallow function declarations in nested blocks: no-var already rejects a var, and a declare global needs one
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-inner-declarations.md
    'no-inner-declarations': 'error',

    // Disallow usage of __iterator__ property
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-iterator.md
    'no-iterator': 'error',

    // Disallow use of __proto__ (deprecated, use Object.getPrototypeOf/setPrototypeOf)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-proto.md
    'no-proto': 'error',

    // Disallow calling Object.prototype methods directly on objects
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-prototype-builtins.md
    'no-prototype-builtins': 'error',

    // Disallow use of labels for anything other than loops and switches
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-labels.md
    'no-labels': 'error',

    // Disallow unnecessary nested blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lone-blocks.md
    'no-lone-blocks': 'error',

    // Disallow use of multiline strings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-multi-str.md
    'no-multi-str': 'error',

    // Disallow use of new operator when not part of an assignment or comparison
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new.md
    'no-new': 'error',

    // Disallow use of new Function() (equivalent to eval)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-func.md
    'no-new-func': 'error',

    // Disallow creating new instances of String, Number, and Boolean
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-wrappers.md
    'no-new-wrappers': 'error',

    // Disallow reassignment of function parameters
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-param-reassign.md
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
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-return-assign.md
    'no-return-assign': ['error', 'always'],

    // Disallow ternary operators when simpler alternatives exist
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unneeded-ternary.md
    'no-unneeded-ternary': 'error',

    // Disallow use of the comma operator
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sequences.md
    'no-sequences': 'error',

    // Disallow assignments where both sides are exactly the same
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-assign.md
    'no-self-assign': 'error',

    // Disallow comparisons where both sides are exactly the same
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-compare.md
    'no-self-compare': 'error',

    // @typescript-eslint/only-throw-error replaces it, and reads the type of the thrown value instead of its syntax
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-throw-literal.md
    'no-throw-literal': 'off',

    // Disallow unmodified conditions of loops
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unmodified-loop-condition.md
    'no-unmodified-loop-condition': [
      'error',
      // Check each branch of a ternary on its own, not the whole expression
      { checkConditionalExpressions: true }
    ],

    // Disallow negating the left operand of relational operators
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-negation.md
    'no-unsafe-negation': 'error',

    // Enforce comparing typeof expressions against valid strings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/valid-typeof.md
    'valid-typeof': 'error',

    // Require calls to isNaN() when checking for NaN
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/use-isnan.md
    'use-isnan': 'error',

    // Disallow unreachable code after return, throw, continue, and break statements
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unreachable.md
    'no-unreachable': 'error',

    // Disallow loops whose body allows only one iteration (usually accidental)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unreachable-loop.md
    'no-unreachable-loop': 'error',

    // Disallow unused labels
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-labels.md
    'no-unused-labels': 'error',

    // Disallow unnecessary catch clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-catch.md
    'no-useless-catch': 'error',

    // Disallow useless string concatenation
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-concat.md
    'no-useless-concat': 'error',

    // Disallow unnecessary string escaping
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-escape.md
    'no-useless-escape': 'error',

    // Disallow redundant return; keywords
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-return.md
    'no-useless-return': 'error',

    // Disallow assignments that are never read (dead stores)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-assignment.md
    'no-useless-assignment': 'error',

    // @typescript-eslint/prefer-promise-reject-errors replaces it, and also reports a rejected unknown or any value
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-promise-reject-errors.md
    'prefer-promise-reject-errors': 'off',

    // Require use of the second argument for parseInt()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/radix.md
    radix: 'error',

    // Disallow deletion of variables
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-delete-var.md
    'no-delete-var': 'error',

    // Disallow labels that share a name with a variable
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-label-var.md
    'no-label-var': 'error',

    // Enforce minimum identifier length for code readability
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-length.md
    'id-length': [
      'error',
      {
        exceptions: [
          // The i18n translator function (react-intl, next-intl)
          't',
          // An intentionally unused variable (destructuring rest, Array.from placeholder)
          '_',
          // The canonical zod import name (ecosystem standard)
          'z',
          // The coordinate axes (touch events, mouse position, SVG)
          'x',
          'y'
        ],
        properties: 'never'
      }
    ],

    // Disallow shadowing of names such as arguments
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow-restricted-names.md
    'no-shadow-restricted-names': 'error',

    // Disallow use of undeclared variables unless mentioned in a /*global */ block
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undef.md
    'no-undef': ['error', { typeof: true }],

    // Enforce shorthand syntax for object properties and methods
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/object-shorthand.md
    'object-shorthand': [
      'error',
      'always',
      { avoidQuotes: true, methodsIgnorePattern: '' }
    ],

    // Always require braces around arrow function bodies for readability
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/arrow-body-style.md
    'arrow-body-style': ['error', 'always'],

    // Verify super() callings in constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/constructor-super.md
    'constructor-super': 'error',

    // Disallow modifying variables of class declarations
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-class-assign.md
    'no-class-assign': 'error',

    // Disallow duplicate class members
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-class-members.md
    'no-dupe-class-members': 'error',

    // Disallow modifying variables that are declared using const
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-const-assign.md
    'no-const-assign': 'error',

    // Disallow new operators with global non-constructor functions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-native-nonconstructor.md
    'no-new-native-nonconstructor': 'error',

    // Disallow returning values from Promise executor functions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-promise-executor-return.md
    'no-promise-executor-return': 'error',

    // Disallow invalid regular expression strings in RegExp constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-invalid-regexp.md
    'no-invalid-regexp': 'error',

    // Disallow this/super before calling super() in constructors
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-this-before-super.md
    'no-this-before-super': 'error',

    // Disallow use of optional chaining in contexts where undefined is not allowed
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-optional-chaining.md
    'no-unsafe-optional-chaining': 'error',

    // Disallow control flow statements in finally blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-finally.md
    'no-unsafe-finally': 'error',

    // Disallow useless computed property keys
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-computed-key.md
    'no-useless-computed-key': 'error',

    // Disallow renaming import, export, and destructured assignments to the same name
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-rename.md
    'no-useless-rename': 'error',

    // Require let or const instead of var
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-var.md
    'no-var': 'error',

    // Require one declarator per declaration statement (never group with commas)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/one-var.md
    'one-var': ['error', 'never'],

    // Disallow the short names that hide their meaning: err, cb, arr, acc, idx, ctx, res, val, obj, el, elem, req, str
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-denylist.md
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
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-const.md
    'prefer-const': [
      'error',
      { destructuring: 'any', ignoreReadBeforeAssign: true }
    ],

    // Prefer destructuring from objects (array disabled: [, x] and ;[x] patterns are unreadable)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-destructuring.md
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: false, object: true }
      }
    ],

    // Disallow parseInt() in favor of binary, octal, and hexadecimal literals
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-numeric-literals.md
    'prefer-numeric-literals': 'error',

    // Use rest parameters instead of arguments
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-rest-params.md
    'prefer-rest-params': 'error',

    // Suggest using the spread syntax instead of .apply()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-spread.md
    'prefer-spread': 'error',

    // Suggest using template literals instead of string concatenation
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-template.md
    'prefer-template': 'error',

    // Disallow using an async function as a Promise executor
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-async-promise-executor.md
    'no-async-promise-executor': 'error',

    // Disallow template literal placeholder syntax in regular strings
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-template-curly-in-string.md
    'no-template-curly-in-string': 'error',

    // Disallow await inside of loops
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-await-in-loop.md
    'no-await-in-loop': 'error',

    // Disallow assignment in conditional expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-cond-assign.md
    'no-cond-assign': ['error', 'always'],

    // Disallow use of console
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-console.md
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // Disallow use of constant expressions in conditions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-condition.md
    'no-constant-condition': ['error', { checkLoops: 'allExceptWhileTrue' }],

    // Disallow use of debugger
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-debugger.md
    'no-debugger': 'error',

    // Disallow duplicate conditions in if-else-if chains
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-else-if.md
    'no-dupe-else-if': 'error',

    // Disallow duplicate case labels
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-duplicate-case.md
    'no-duplicate-case': 'error',

    // Disallow duplicate keys when creating object literals
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-keys.md
    'no-dupe-keys': 'error',

    // Disallow reassigning exceptions in catch clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-ex-assign.md
    'no-ex-assign': 'error',

    // Prefer color === "red" over "red" === color
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/yoda.md
    yoda: 'error',

    // Disallow the unary operators ++ and --
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-plusplus.md
    'no-plusplus': 'error',

    // Disallow @nocommit comments to prevent committing temporary code
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-warning-comments.md
    'no-warning-comments': ['error', { terms: ['@nocommit'] }],

    // Name each number but -1, 0, 1 and 2 in a constant: an index, a default value, an enum and a numeric type stay literal
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-magic-numbers.md
    'no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1, 2],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        ignoreClassFieldInitialValues: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreTypeIndexes: true,
        enforceConst: true
      }
    ],

    // Require a getter for each setter
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/accessor-pairs.md
    'accessor-pairs': 'error',

    // Keep the getter and the setter of a property next to each other
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/grouped-accessor-pairs.md
    'grouped-accessor-pairs': 'error',

    // Limit the nesting depth of callbacks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-nested-callbacks.md
    'max-nested-callbacks': 'error',

    // Disallow Array(a, b) and new Array(a, b), use an array literal
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-array-constructor.md
    'no-array-constructor': 'error',

    // Disallow a regex literal that starts with = and reads as /=
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-div-regex.md
    'no-div-regex': 'error',

    // Disallow empty block statements
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty.md
    'no-empty': 'error',

    // Disallow bind() on a function that does not use this
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-bind.md
    'no-extra-bind': 'error',

    // Disallow a function in a loop that captures a variable the loop changes
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-loop-func.md
    'no-loop-func': 'error',

    // Disallow chained assignments such as a = b = c
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-multi-assign.md
    'no-multi-assign': 'error',

    // Disallow new Object(), use an object literal
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-object-constructor.md
    'no-object-constructor': 'error',

    // Disallow consecutive spaces in a regex literal, use a quantifier
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-regex-spaces.md
    'no-regex-spaces': 'error',

    // Disallow call() and apply() that only pass this through
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-call.md
    'no-useless-call': 'error',

    // Prefer Object.hasOwn() to Object.prototype.hasOwnProperty.call()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-has-own.md
    'prefer-object-has-own': 'error',

    // Require a description for each Symbol()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/symbol-description.md
    'symbol-description': 'error',

    // Disallow the Unicode byte order mark
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/unicode-bom.md
    'unicode-bom': 'error',

    // Attach the caught error as the cause when a catch block throws a new error
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/preserve-caught-error.md
    'preserve-caught-error': 'error',

    // Disallow an if as the only statement of an else block, use else if
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lonely-if.md
    'no-lonely-if': 'error',

    // Prefer ** to Math.pow()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-exponentiation-operator.md
    'prefer-exponentiation-operator': 'error',

    // Prefer an object spread to Object.assign() on an object literal
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-spread.md
    'prefer-object-spread': 'error',

    // Disallow javascript: URLs. A guard that rejects the scheme takes a justified disable
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-script-url.md
    'no-script-url': 'error',

    // Require a name on each function expression, so a stack trace shows it
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-names.md
    'func-names': 'error',

    // The tsc compiler already rejects a read before the definition (TS2448, TS2449)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-use-before-define.md
    'no-use-before-define': 'off',

    // Disallow a comment on the same line as code
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-inline-comments.md
    'no-inline-comments': 'error',

    // Allow void only as a statement, which marks a floating promise
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-void.md
    'no-void': ['error', { allowAsStatement: true }],

    // The fix a[i] -= d fails the typecheck under noUncheckedIndexedAccess, and the rule only checks style
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/operator-assignment.md
    'operator-assignment': 'off',

    // A family of error classes or of test doubles belongs in one file
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-classes-per-file.md
    'max-classes-per-file': 'off',

    // The logical order of keys carries meaning, such as id before defaultMessage
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-keys.md
    'sort-keys': 'off',

    // Function declarations stay allowed outside components, react/function-component-definition covers the components
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-style.md
    'func-style': 'off',

    // Async without await is valid when conforming to an interface or type signature
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-await.md
    'require-await': 'off',

    // Inverting x !== undefined ? <X /> : null moves the render after the null
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-negated-condition.md
    'no-negated-condition': 'off',

    // Colors and hashes use bitwise operators on purpose, and TypeScript rejects & between booleans
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-bitwise.md
    'no-bitwise': 'off',

    // The eqeqeq rule already rejects == null
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-eq-null.md
    'no-eq-null': 'off',

    // The no-var rule already rejects var
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/vars-on-top.md
    'vars-on-top': 'off',

    // The one-var rule already rejects grouped declarations
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-vars.md
    'sort-vars': 'off',

    // The import/no-duplicates rule already rejects duplicate imports
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-duplicate-imports.md
    'no-duplicate-imports': 'off',

    // The oxfmt formatter already rewrites an ambiguous line break into a visible call
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unexpected-multiline.md
    'no-unexpected-multiline': 'off',

    // Without a list of globals the rule checks nothing
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-globals.md
    'no-restricted-globals': 'off',

    // Detect missing throw before new Error()
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/missing-throw.md
    'oxc/missing-throw': 'error',

    // Detect chained comparisons that don't work as expected in JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-comparison-sequence.md
    'oxc/bad-comparison-sequence': 'error',

    // Detect regex without global flag passed to replaceAll()
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-replace-all-arg.md
    'oxc/bad-replace-all-arg': 'error',

    // Detect inverted Math.min/Math.max (broken clamp)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-min-max-func.md
    'oxc/bad-min-max-func': 'error',

    // Detect object/array literal comparison (always false)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-object-literal-comparison.md
    'oxc/bad-object-literal-comparison': 'error',

    // Detect array callbacks that lose their `this` context
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/uninvoked-array-callback.md
    'oxc/uninvoked-array-callback': 'error',

    // Detect out-of-range numeric arguments (toFixed, parseInt radix, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/number-arg-out-of-range.md
    'oxc/number-arg-out-of-range': 'error',

    // Detect bitwise operators used instead of logical operators
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-bitwise-operator.md
    'oxc/bad-bitwise-operator': 'error',

    // Detect charAt() compared to multi-char string (always false)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-char-at-comparison.md
    'oxc/bad-char-at-comparison': 'error',

    // Detect matchAll() called with a non-global regex (throws TypeError at runtime)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-match-all-arg.md
    'oxc/bad-match-all-arg': 'error',

    // Detect operations that always erase the value (x * 0, x & 0, x && false)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/erasing-op.md
    'oxc/erasing-op': 'error',

    // Simplify redundant double comparisons (x === y || x < y → x <= y)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/double-comparisons.md
    'oxc/double-comparisons': 'error',

    // Detect constant comparisons that are always true or false
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/const-comparisons.md
    'oxc/const-comparisons': 'error',

    // Detect misrefactored assignment operators (a -= a - b)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/misrefactored-assign-op.md
    'oxc/misrefactored-assign-op': 'error',

    // Detect O(n²) accumulating spread in loops/reduce
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-accumulating-spread.md
    'oxc/no-accumulating-spread': 'error',

    // Disallow const enum (broken with isolatedModules/bundlers)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-const-enum.md
    'oxc/no-const-enum': 'error',

    // Detect duplicated code between if/else branches
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/branches-sharing-code.md
    'oxc/branches-sharing-code': 'error',

    // Name each file in kebab-case, except the route files of a framework: $param.tsx, [slug].tsx, [...catchAll].tsx
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/filename-case.md
    'unicorn/filename-case': [
      'error',
      { case: 'kebabCase', ignore: [String.raw`^[\[$]`] }
    ],

    // Disallow creating a variable and immediately mutating it
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-immediate-mutation.md
    'unicorn/no-immediate-mutation': 'error',

    // Disallow useless arguments when constructing Set, Map, WeakSet, WeakMap
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-collection-argument.md
    'unicorn/no-useless-collection-argument': 'error',

    // Prefer class fields over constructor assignments
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-class-fields.md
    'unicorn/prefer-class-fields': 'error',

    // Prefer Array#toReversed() over Array#reverse(), which mutates the array
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-reverse.md
    'unicorn/no-array-reverse': 'error',

    // Prefer Array#toSorted() over Array#sort(), which mutates the array
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-sort.md
    'unicorn/no-array-sort': 'error',

    // Require using new when throwing an error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/throw-new-error.md
    'unicorn/throw-new-error': 'error',

    // @typescript-eslint/prefer-includes replaces it, and also reports a simple regex test
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-includes.md
    'unicorn/prefer-includes': 'off',

    // Prefer find() over filter()[0] when searching for a single element
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-find.md
    'unicorn/prefer-array-find': 'error',

    // Prefer startsWith() and endsWith() over regex or slice comparisons
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-starts-ends-with.md
    'unicorn/prefer-string-starts-ends-with': 'error',

    // Prefer .at() for accessing elements by negative index
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-at.md
    'unicorn/prefer-at': 'error',

    // Prefer Number static properties over global ones
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-properties.md
    'unicorn/prefer-number-properties': 'error',

    // Prefer for...of over Array#forEach
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-for-each.md
    'unicorn/no-array-for-each': 'error',

    // Prefer Array#flat() over legacy techniques to flatten arrays
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-flat.md
    'unicorn/prefer-array-flat': 'error',

    // Prefer flatMap() over map().flat()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-flat-map.md
    'unicorn/prefer-array-flat-map': 'error',

    // Disallow useless undefined
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-undefined.md
    'unicorn/no-useless-undefined': 'error',

    // Prefer String#replaceAll() over regex with global flag
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-replace-all.md
    'unicorn/prefer-string-replace-all': 'error',

    // Prefer String#trimStart() / String#trimEnd() over trimLeft() / trimRight()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-trim-start-end.md
    'unicorn/prefer-string-trim-start-end': 'error',

    // Disallow if statements as the only statement in else blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-lonely-if.md
    'unicorn/no-lonely-if': 'error',

    // Prefer RegExp#test() over String#match() for boolean checks
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-regexp-test.md
    'unicorn/prefer-regexp-test': 'error',

    // Prefer modern DOM APIs
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-modern-dom-apis.md
    'unicorn/prefer-modern-dom-apis': 'error',

    // Prefer Date.now() over new Date().getTime()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-date-now.md
    'unicorn/prefer-date-now': 'error',

    // Prefer === undefined over typeof === 'undefined'
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-typeof-undefined.md
    'unicorn/no-typeof-undefined': 'error',

    // Prefer Object.fromEntries() over reduce to create objects
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-object-from-entries.md
    'unicorn/prefer-object-from-entries': 'error',

    // Prefer some() over find() !== undefined for boolean checks
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-some.md
    'unicorn/prefer-array-some': 'error',

    // Disallow new Array() and prefer Array.from({length: n})
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-new-array.md
    'unicorn/no-new-array': 'error',

    // Prefer default parameters over reassignment
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-default-parameters.md
    'unicorn/prefer-default-parameters': 'error',

    // Prefer negative index over length minus index
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-negative-index.md
    'unicorn/prefer-negative-index': 'error',

    // Enforce usage of the `node:` prefix for builtin imports
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-node-protocol.md
    'unicorn/prefer-node-protocol': 'error',

    // Prefer import.meta.dirname/filename over __dirname/__filename
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-import-meta-properties.md
    'unicorn/prefer-import-meta-properties': 'error',

    // Disallow useless spread operators
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-spread.md
    'unicorn/no-useless-spread': 'error',

    // Disallow unnecessary iterator-to-array conversion
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-iterator-to-array.md
    'unicorn/no-useless-iterator-to-array': 'error',

    // Disallow useless Promise.resolve/reject in async functions
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-promise-resolve-reject.md
    'unicorn/no-useless-promise-resolve-reject': 'error',

    // Prefer structuredClone over JSON.parse(JSON.stringify())
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-structured-clone.md
    'unicorn/prefer-structured-clone': 'error',

    // Enforce the name `error` in catch clauses
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/catch-error-name.md
    'unicorn/catch-error-name': ['error', { ignore: [] }],

    // Prefer .slice() over .substring() and .substr()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-slice.md
    'unicorn/prefer-string-slice': 'error',

    // Enforce numeric separators for readability
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/numeric-separators-style.md
    'unicorn/numeric-separators-style': [
      'error',
      {
        onlyIfContainsSeparator: true,
        number: { groupLength: 3, minimumDigits: 0, fractionGroupLength: 3 }
      }
    ],

    // Prefer Set#size over converting to array
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-size.md
    'unicorn/prefer-set-size': 'error',

    // Enforce consistent text encoding identifier casing (utf-8)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/text-encoding-identifier-case.md
    'unicorn/text-encoding-identifier-case': 'error',

    // Enforce consistent break/return position in switch cases
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/switch-case-break-position.md
    'unicorn/switch-case-break-position': 'error',

    // Disallow disable comments without specifying a rule
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-abusive-eslint-disable.md
    'unicorn/no-abusive-eslint-disable': 'error',

    // Enforce consistent style for escaping ${ in template literals
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-template-literal-escape.md
    'unicorn/consistent-template-literal-escape': 'error',

    // Disallow a getter or a setter that reads or writes its own property
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-accessor-recursion.md
    'unicorn/no-accessor-recursion': 'error',

    // Require a name on a default export
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-anonymous-default-export.md
    'unicorn/no-anonymous-default-export': 'error',

    // Disallow array.length as the end argument of slice()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-length-as-slice-end.md
    'unicorn/no-length-as-slice-end': 'error',

    // Disallow a negated left operand in an equality check, such as !a === b
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-negation-in-equality-check.md
    'unicorn/no-negation-in-equality-check': 'error',

    // Disallow new Buffer(), use Buffer.from() or Buffer.alloc()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-new-buffer.md
    'unicorn/no-new-buffer': 'error',

    // Disallow flat(1), the default depth
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-array-flat-depth.md
    'unicorn/no-unnecessary-array-flat-depth': 'error',

    // Disallow array.length as the delete count of splice()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-array-splice-count.md
    'unicorn/no-unnecessary-array-splice-count': 'error',

    // Disallow Infinity as the end argument of slice()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-slice-end.md
    'unicorn/no-unnecessary-slice-end': 'error',

    // Disallow array destructuring with consecutive ignored values, such as [, , c]
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unreadable-array-destructuring.md
    'unicorn/no-unreadable-array-destructuring': 'error',

    // Disallow Error.captureStackTrace() in an Error subclass constructor
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-error-capture-stack-trace.md
    'unicorn/no-useless-error-capture-stack-trace': 'error',

    // Disallow an empty import attributes object, such as with {}
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-module-attributes.md
    'unicorn/require-module-attributes': 'error',

    // Require a target origin on postMessage()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-post-message-target-origin.md
    'unicorn/require-post-message-target-origin': 'error',

    // Disallow a zero fraction such as 1.0, write 1
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-zero-fractions.md
    'unicorn/no-zero-fractions': 'error',

    // Disallow an empty export {} or import {} from
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-module-specifiers.md
    'unicorn/require-module-specifiers': 'error',

    // Prefer [...iterable] to Array.from(iterable), concat() and slice()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-spread.md
    'unicorn/prefer-spread': 'error',

    // Inverting x !== undefined ? <X /> : null moves the render after the null
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-negated-condition.md
    'unicorn/no-negated-condition': 'off',

    // The unicorn/no-instanceof-builtins rule in strict mode already rejects instanceof Array
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-array.md
    'unicorn/no-instanceof-array': 'off',

    // Enforce default parameters to be last
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-param-last.md
    'default-param-last': 'error',

    // Disallow empty functions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-function.md
    'no-empty-function': [
      'error',
      { allow: ['arrowFunctions', 'functions', 'methods'] }
    ],

    // Disallow variable redeclaration
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-redeclare.md
    'no-redeclare': 'error',

    // Disallow variable declarations from shadowing variables declared in the outer scope
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow.md
    'no-shadow': 'error',

    // Disallow unused expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-expressions.md
    'no-unused-expressions': 'error',

    // Disallow unused variables
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-vars.md
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
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-constructor.md
    'no-useless-constructor': 'error',

    // Disallow @ts-<directive> comments or require descriptions after directives
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-ts-comment.md
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
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/array-type.md
    '@typescript-eslint/array-type': ['error', { readonly: 'array' }],

    // Enforce type definitions to consistently use type instead of interface
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-definitions.md
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    // Disallow the any type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-explicit-any.md
    '@typescript-eslint/no-explicit-any': 'error',

    // Disallow the {} type (matches any non-nullish value, not "empty object")
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-object-type.md
    '@typescript-eslint/no-empty-object-type': 'error',

    // Disallow the Function type (no type safety)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-function-type.md
    '@typescript-eslint/no-unsafe-function-type': 'error',

    // Disallow explicit return type annotations on functions (trust inference)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-function-return-type.md
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Enforce type-only imports: disabled, both forms acceptable
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-imports.md
    '@typescript-eslint/consistent-type-imports': 'off',

    // Enforce export type { T } for type-only exports
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-exports.md
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: true }
    ],

    // Disabled: no enforcement on type import style
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-import-type-side-effects.md
    '@typescript-eslint/no-import-type-side-effects': 'off',

    // Disallow unnecessarily defining types for simple inferred values
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-inferrable-types.md
    '@typescript-eslint/no-inferrable-types': 'error',

    // Disallow TypeScript namespaces
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-namespace.md
    '@typescript-eslint/no-namespace': 'error',

    // Disallow non-null assertions after an optional chain expression
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-optional-chain.md
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // Disallow non-null assertion with nullish coalescing (contradictory: ! + ??)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-nullish-coalescing.md
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',

    // Disallow require() imports in TypeScript (use ESM imports)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-require-imports.md
    '@typescript-eslint/no-require-imports': ['error', { allow: [] }],

    // Require class properties that are never reassigned to be readonly
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly.md
    '@typescript-eslint/prefer-readonly': 'error',

    // Enforce RegExp#exec() over String#match() when no global flag
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-regexp-exec.md
    '@typescript-eslint/prefer-regexp-exec': 'error',

    // Disallow dynamic delete on computed keys (use Map instead)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-dynamic-delete.md
    '@typescript-eslint/no-dynamic-delete': 'error',

    // Disallow void type outside return types and generics
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-invalid-void-type.md
    '@typescript-eslint/no-invalid-void-type': 'error',

    // Disallow non-null assertion operator (!)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-assertion.md
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Require literal values in enum members
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-literal-enum-member.md
    '@typescript-eslint/prefer-literal-enum-member': 'error',

    // Merge overload signatures that can be unified
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/unified-signatures.md
    '@typescript-eslint/unified-signatures': 'error',

    // Require explicit accessibility modifiers on class members (no redundant public)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-member-accessibility.md
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' }
    ],

    // Enforce function name matches variable/property name
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-name-matching.md
    'func-name-matching': 'error',

    // Enforce identifier naming via regex: cannot target by type, use naming-convention with tsgolint
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-match.md
    'id-match': 'off',

    // Disallow dangling underscores: too many legitimate uses (_unused, __typename, _id)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-underscore-dangle.md
    'no-underscore-dangle': 'off',

    // Enforce u/v flag on regular expressions for proper Unicode handling
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-unicode-regexp.md
    'require-unicode-regexp': 'error',

    // Disallow specific properties on specific objects: configure downstream
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-properties.md
    'no-restricted-properties': 'off',

    // Enforce logical assignment operator shorthand (||=, &&=, ??=)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/logical-assignment-operators.md
    'logical-assignment-operators': [
      'error',
      'always',
      { enforceForIfStatements: true }
    ],

    // Prefer regex literals over new RegExp() when pattern is static
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-regex-literals.md
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

    // Prefer arrow functions for callbacks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-arrow-callback.md
    'prefer-arrow-callback': 'error',

    // Disallow declarations in the global scope
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-globals.md
    'no-implicit-globals': 'error',

    // Disallow barrel files that re-export too many modules
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-barrel-file.md
    'oxc/no-barrel-file': ['error', { threshold: 10 }],

    // Disallow process.env (centralize config via imports)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-process-env.md
    'node/no-process-env': 'error',

    // Disallow require() inside functions (top-level only)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/global-require.md
    'node/global-require': 'error',

    // Disallow new require('foo')
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-new-require.md
    'node/no-new-require': 'error',

    // Require a callback to handle its err parameter
    // https://oxc.rs/docs/guide/usage/linter/rules/node/handle-callback-err.md
    'node/handle-callback-err': 'error',

    // Disallow an assignment to exports, which breaks module.exports
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-exports-assign.md
    'node/no-exports-assign': 'error',

    // Disallow a string concatenation with __dirname or __filename, use path.join()
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-path-concat.md
    'node/no-path-concat': 'error',

    // Disallow synchronous Node.js methods (fs.readFileSync, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-sync.md
    'node/no-sync': 'off',

    // Disallow mixing require() with other declarations: moot in ESM (require banned)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-mixed-requires.md
    'node/no-mixed-requires': 'off',

    // Require return before callback in branching code: not used in frontend (async/await)
    // https://oxc.rs/docs/guide/usage/linter/rules/node/callback-return.md
    'node/callback-return': 'off',

    // Enforce module.exports over exports in the few remaining .cjs files
    // https://oxc.rs/docs/guide/usage/linter/rules/node/exports-style.md
    'node/exports-style': ['error', 'module.exports'],

    // Rationale is require(esm) compatibility: moot in an ESM-only, bundled codebase
    // https://oxc.rs/docs/guide/usage/linter/rules/node/no-top-level-await.md
    'node/no-top-level-await': 'off',

    // Not worth enabling the whole jsdoc plugin: zero occurrences across our codebases
    // https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/no-blank-blocks.md
    'jsdoc/no-blank-blocks': 'off',

    // Disallow unnecessary Promise.resolve/reject wrapping in handlers
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-return-wrap.md
    'promise/no-return-wrap': 'error',

    // Enforce resolve/reject parameter names in new Promise()
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/param-names.md
    'promise/param-names': [
      'error',
      { resolvePattern: '^_?resolve$', rejectPattern: '^_?reject$' }
    ],

    // Disallow nested promise chains (use async/await or flat chaining)
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-nesting.md
    'promise/no-nesting': 'error',

    // Disallow return in finally() (value is ignored)
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-return-in-finally.md
    'promise/no-return-in-finally': 'error',

    // Ensure correct argument count for Promise methods
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/valid-params.md
    'promise/valid-params': 'error',

    // Disallow a resolve or a reject call after the promise already settled
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-multiple-resolved.md
    'promise/no-multiple-resolved': 'error',

    // Disallow a Promise static method outside the spec
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/spec-only.md
    'promise/spec-only': 'error',

    // Prefer catch() to then(onFulfilled, onRejected), which misses an error that onFulfilled throws
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-catch.md
    'promise/prefer-catch': 'error',

    // Prefer await to then(), catch() and finally()
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-then.md
    'promise/prefer-await-to-then': 'error',

    // Prefer async and await to a callback
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-callbacks.md
    'promise/prefer-await-to-callbacks': 'error',

    // The rule spots a Node callback by an err or error parameter, so it flags each TanStack Query onError
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-promise-in-callback.md
    'promise/no-promise-in-callback': 'off',

    // A new Promise() is the one bridge from a callback API, such as setTimeout, to a promise
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/avoid-new.md
    'promise/avoid-new': 'off',

    // Disallow passing strings to setTimeout/setInterval (implied eval)
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implied-eval.md
    'no-implied-eval': 'error',

    // Detect approximate constants that should use Math.*
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/approx-constant.md
    'oxc/approx-constant': 'error',

    // Disallow this in exported functions (undefined after bundling)
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-this-in-exported-function.md
    'oxc/no-this-in-exported-function': 'error',

    // Disallow spread in map(): Object.assign fix mutates, dangerous in React
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-map-spread.md
    'oxc/no-map-spread': 'off',

    // Disallow async Express handlers: Express 5 handles natively
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-endpoint-handlers.md
    'oxc/no-async-endpoint-handlers': 'off',

    // Disallow async/await: no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-await.md
    'oxc/no-async-await': 'off',

    // Disallow optional chaining: no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-optional-chaining.md
    'oxc/no-optional-chaining': 'off',

    // Disallow rest/spread properties: no reason in modern JS
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-rest-spread-properties.md
    'oxc/no-rest-spread-properties': 'off',

    // Require a message when throwing Error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/error-message.md
    'unicorn/error-message': 'error',

    // Prefer Array.isArray() over instanceof Array (cross-realm safe)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-builtins.md
    'unicorn/no-instanceof-builtins': [
      'error',
      { exclude: ['Error', 'Date'], strategy: 'strict' }
    ],

    // Enforce new for Map/Set/Error, forbid new for String/Number/Boolean
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/new-for-builtins.md
    'unicorn/new-for-builtins': 'error',

    // Prefer || or ?? over redundant ternary
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-logical-operator-over-ternary.md
    'unicorn/prefer-logical-operator-over-ternary': 'error',

    // Throw TypeError after type checks instead of generic Error
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-type-error.md
    'unicorn/prefer-type-error': 'error',

    // Enforce === -1 / !== -1 for indexOf checks
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-existence-index-check.md
    'unicorn/consistent-existence-index-check': 'error',

    // Enforce consistent import styles per module: conflicts with import/no-namespace
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/import-style.md
    'unicorn/import-style': 'off',

    // Prefer globalThis: too restrictive for browser-specific code
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-global-this.md
    'unicorn/prefer-global-this': 'off',

    // Prefer Set.has() for lookups: Array.includes is fine for small arrays
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-has.md
    'unicorn/prefer-set-has': 'off',

    // Prefer EventTarget over EventEmitter (web standard)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-event-target.md
    'unicorn/prefer-event-target': 'error',

    // Prefer indexOf() over findIndex() with simple equality
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-index-of.md
    'unicorn/prefer-array-index-of': 'error',

    // Enforce uppercase escape sequences
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/escape-case.md
    'unicorn/escape-case': 'error',

    // Enforce lowercase prefix in number literals (0xff not 0XFF)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/number-literal-case.md
    'unicorn/number-literal-case': 'error',

    // Detect useless case before default in switch
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-switch-case.md
    'unicorn/no-useless-switch-case': 'error',

    // Enforce consistent types in ternary array spreads
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-empty-array-spread.md
    'unicorn/consistent-empty-array-spread': 'error',

    // Allow catch parameter even if unused
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-optional-catch-binding.md
    'unicorn/prefer-optional-catch-binding': 'off',

    // Disallow leading/trailing spaces in console.log
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-console-spaces.md
    'unicorn/no-console-spaces': 'error',

    // Prefer Unicode escape over hex escape: too niche
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-hex-escape.md
    'unicorn/no-hex-escape': 'off',

    // Force braces in switch cases: too opinionated
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/switch-case-braces.md
    'unicorn/switch-case-braces': 'off',

    // Disallow null: null is semantically different from undefined
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-null.md
    'unicorn/no-null': 'off',

    // Disallow Array.reduce: valid for accumulations
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-reduce.md
    'unicorn/no-array-reduce': 'off',

    // Disallow passing function references to array methods: .filter(Boolean) is idiomatic
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-callback-reference.md
    'unicorn/no-array-callback-reference': 'off',

    // Prefer codePointAt over charCodeAt: charCodeAt fine for ASCII
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-code-point.md
    'unicorn/prefer-code-point': 'off',

    // Prefer addEventListener over onclick=
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-add-event-listener.md
    'unicorn/prefer-add-event-listener': 'error',

    // Prefer append() over appendChild()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-append.md
    'unicorn/prefer-dom-node-append': 'error',

    // Prefer dataset over getAttribute('data-'): dataset not on Element type, only HTMLElement
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-dataset.md
    'unicorn/prefer-dom-node-dataset': 'off',

    // Prefer textContent over innerText
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-text-content.md
    'unicorn/prefer-dom-node-text-content': 'error',

    // Prefer remove() over parentNode.removeChild()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-remove.md
    'unicorn/prefer-dom-node-remove': 'error',

    // Prefer event.key over event.keyCode
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-keyboard-event-key.md
    'unicorn/prefer-keyboard-event-key': 'error',

    // Prefer querySelector over getElementById
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-query-selector.md
    'unicorn/prefer-query-selector': 'error',

    // Prefer classList.toggle over add/remove
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-classlist-toggle.md
    'unicorn/prefer-classlist-toggle': 'error',

    // Prefer Math.min/Math.max over ternary
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-math-min-max.md
    'unicorn/prefer-math-min-max': 'error',

    // Prefer Math.trunc over ~~ or | 0
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-math-trunc.md
    'unicorn/prefer-math-trunc': 'error',

    // Prefer modern Math APIs (Math.hypot, Math.log2, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-modern-math-apis.md
    'unicorn/prefer-modern-math-apis': 'error',

    // Prefer Number() over +x, String() over '' + x
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-native-coercion-functions.md
    'unicorn/prefer-native-coercion-functions': 'error',

    // Prefer Reflect.apply over fn.apply()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-reflect-apply.md
    'unicorn/prefer-reflect-apply': 'error',

    // Prefer Array.prototype.slice over [].slice
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-prototype-methods.md
    'unicorn/prefer-prototype-methods': 'error',

    // Require explicit separator in .join()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-array-join-separator.md
    'unicorn/require-array-join-separator': 'error',

    // Require explicit digits argument in .toFixed()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-number-to-fixed-digits-argument.md
    'unicorn/require-number-to-fixed-digits-argument': 'error',

    // Hoist functions that don't depend on outer scope
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-function-scoping.md
    'unicorn/consistent-function-scoping': 'error',

    // Disallow an IIFE with a parenthesized arrow function body
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unreadable-iife.md
    'unicorn/no-unreadable-iife': 'error',

    // Prefer new Date(date) for cloning dates
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-date-clone.md
    'unicorn/consistent-date-clone': 'error',

    // Disallow (await foo).bar: assign first
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-await-expression-member.md
    'unicorn/no-await-expression-member': 'error',

    // Allow objects as default parameters
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-object-as-default-parameter.md
    'unicorn/no-object-as-default-parameter': 'off',

    // Disallow const self = this: use arrow functions
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-this-assignment.md
    'unicorn/no-this-assignment': 'error',

    // Disallow static-only classes: use module functions
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-static-only-class.md
    'unicorn/no-static-only-class': 'error',

    // Prefer blob.text() over FileReader
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-blob-reading-methods.md
    'unicorn/prefer-blob-reading-methods': 'error',

    // Prefer Response.json() over new Response(JSON.stringify())
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-response-static-json.md
    'unicorn/prefer-response-static-json': 'error',

    // Prefer 123n over BigInt(123)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-bigint-literals.md
    'unicorn/prefer-bigint-literals': 'error',

    // Prefer ternary over if/else for single-line assignments only
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-ternary.md
    'unicorn/prefer-ternary': ['error', 'only-single-line'],

    // String.raw is niche and hurts readability for simple escape sequences
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-raw.md
    'unicorn/prefer-string-raw': 'off',

    // Allow process.exit() in CLI tools
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-process-exit.md
    'unicorn/no-process-exit': 'off',

    // Allow document.cookie
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-document-cookie.md
    'unicorn/no-document-cookie': 'off',

    // Prefer ESM: already covered by import/no-commonjs
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-module.md
    'unicorn/prefer-module': 'off',

    // Enforce explicit arr.length > 0 over truthy check
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/explicit-length-check.md
    'unicorn/explicit-length-check': 'error',

    // Disallow thisArg in array methods: arrow functions handle it
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-method-this-argument.md
    'unicorn/no-array-method-this-argument': 'error',

    // Prefer new URL('foo', base) over new URL('./foo', base)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/relative-url-style.md
    'unicorn/relative-url-style': 'error',

    // Enforce custom Error class pattern
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/custom-error-definition.md
    'unicorn/custom-error-definition': 'error',

    // Disallow spaces in empty braces { } → {}
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/empty-brace-spaces.md
    'unicorn/empty-brace-spaces': 'error',

    // Allow .flat(2) without named variable
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-magic-array-flat-depth.md
    'unicorn/no-magic-array-flat-depth': 'off',

    // Disabled: false positives with Zod .catch()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-top-level-await.md
    'unicorn/prefer-top-level-await': 'off',

    // Consistent assert style: rarely used in frontend
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-assert.md
    'unicorn/consistent-assert': 'off',

    // Disallow reference values in Array#fill(): all elements share one reference
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-fill-with-reference-type.md
    'unicorn/no-array-fill-with-reference-type': 'error',

    // Prefer export { x } from over import-then-reexport
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-export-from.md
    'unicorn/prefer-export-from': ['error', { checkUsedVariables: false }],

    // Combine consecutive push/unshift/classList.add into a single call
    // Disabled: conditional pushes and grouped pushes for readability are common patterns
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-single-call.md
    'unicorn/prefer-single-call': 'off',

    // Prefer Number() over parseFloat()/parseInt(x, 10): too risky, Number() returns NaN on a partial numeric string like "12px" where parseFloat returns 12
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-coercion.md
    'unicorn/prefer-number-coercion': 'off',

    // Limit nested call depth: too many false positives with Zod schema chaining
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/max-nested-calls.md
    'unicorn/max-nested-calls': 'off',

    // Require explicit delay argument on setTimeout/setInterval (documents 0-tick intent)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/explicit-timer-delay.md
    'unicorn/explicit-timer-delay': 'error',

    // Disallow confusing Array#with() usage (negative or length index bugs)
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-confusing-array-with.md
    'unicorn/no-confusing-array-with': 'error',

    // Disallow unnecessary type constraints (extends any / extends unknown)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-constraint.md
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',

    // Disallow non-null assertion next to equality (a! == b looks like a !== b)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-confusing-non-null-assertion.md
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',

    // Disallow classes used as namespaces (static-only, empty, constructor-only)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-extraneous-class.md
    '@typescript-eslint/no-extraneous-class': [
      'error',
      { allowWithDecorator: true }
    ],

    // Enforce consistent type assertion style (as > angle-bracket)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-assertions.md
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
        arrayLiteralTypeAssertions: 'allow-as-parameter'
      }
    ],

    // Disallow a chain of type assertions such as `as unknown as User`
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-chained-type-assertions
    'viclafouch/no-chained-type-assertions': 'error',

    // Disallow `unknown` and `Promise<unknown>` as a return type
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-unknown-returns
    'viclafouch/no-unknown-returns': 'error',

    // Disallow an explicit broad or anonymous type over a value TypeScript already knows: infer it
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-known-value-widening
    'viclafouch/no-known-value-widening': 'error',

    // Require the reason of each disable directive: `// oxlint-disable-next-line <rule> -- <reason>`
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#require-suppression-reason
    'viclafouch/require-suppression-reason': 'error',

    // Ship zero comments, and disable a rule on one line, never on a whole file: the naming carries the intent
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#comment-policy
    'viclafouch/comment-policy': 'error',

    // Name a boolean is*, has*, should* or can*
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#boolean-name
    'viclafouch/boolean-name': 'error',

    // Name a type guard matchIs*, matchAs* or matchHas*
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#boolean-function-name
    'viclafouch/boolean-function-name': 'error',

    // Put the optional properties of a *Params or *Props type after the required ones
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#optional-last
    'viclafouch/optional-last': 'error',

    // Name the params object type of a function *Params, instead of an inline type
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#params-type-name
    'viclafouch/params-type-name': 'error',

    // Destructure the params in the function signature, not in its body
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#destructure-in-signature
    'viclafouch/destructure-in-signature': 'error',

    // Enforce type argument on constructor call, not annotation
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-generic-constructors.md
    '@typescript-eslint/consistent-generic-constructors': [
      'error',
      'constructor'
    ],

    // Prefer for-of when index is only used for element access
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-for-of.md
    '@typescript-eslint/prefer-for-of': 'error',

    // Prefer function type over interface with single call signature
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-function-type.md
    '@typescript-eslint/prefer-function-type': 'error',

    // Require overload signatures to be adjacent
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/adjacent-overload-signatures.md
    '@typescript-eslint/adjacent-overload-signatures': 'error',

    // Remove obsolete TSLint comments
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-tslint-comment.md
    '@typescript-eslint/ban-tslint-comment': 'error',

    // Enforce Record<K, V> over index signatures
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-indexed-object-style.md
    '@typescript-eslint/consistent-indexed-object-style': 'error',

    // Prefer readonly fields over trivial getters for literals
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/class-literal-property-style.md
    '@typescript-eslint/class-literal-property-style': 'error',

    // Allow both parameter properties and explicit declarations
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/parameter-properties.md
    '@typescript-eslint/parameter-properties': 'off',

    // Require explicit initializers on all enum members
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-enum-initializers.md
    '@typescript-eslint/prefer-enum-initializers': 'error',

    // Prefer @ts-expect-error over @ts-ignore (detects stale suppressions)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-ts-expect-error.md
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    // Enforce property signature style over method signature for strictFunctionTypes safety
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/method-signature-style.md
    '@typescript-eslint/method-signature-style': 'error',

    // Prefer named capture groups in regexes: too noisy for simple alternation/grouping
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-named-capture-group.md
    'prefer-named-capture-group': 'off',

    // Disallow arguments.caller and arguments.callee
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-caller.md
    'no-caller': 'error',

    // Disallow control characters in regular expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-control-regex.md
    'no-control-regex': 'error',

    // Disallow empty character classes in regular expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-character-class.md
    'no-empty-character-class': 'error',

    // Disallow empty static blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-static-block.md
    'no-empty-static-block': 'error',

    // Disallow eval()
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-eval.md
    'no-eval': 'error',

    // Disallow unnecessary boolean casts
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-boolean-cast.md
    'no-extra-boolean-cast': 'error',

    // Disallow irregular whitespace characters in the code
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-irregular-whitespace.md
    'no-irregular-whitespace': 'error',

    // Disallow numeric literals that lose precision
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-loss-of-precision.md
    'no-loss-of-precision': 'error',

    // Disallow characters made of several code points in a character class
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-misleading-character-class.md
    'no-misleading-character-class': 'error',

    // Disallow the \8 and \9 escape sequences in string literals
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-nonoctal-decimal-escape.md
    'no-nonoctal-decimal-escape': 'error',

    // Disallow a let or var variable that is read but never assigned
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unassigned-vars.md
    'no-unassigned-vars': 'error',

    // Disallow unused private class members
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-private-class-members.md
    'no-unused-private-class-members': 'error',

    // Disallow backreferences that always match an empty string
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-backreference.md
    'no-useless-backreference': 'error',

    // Require a yield in each generator function
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-yield.md
    'require-yield': 'error',

    // Disallow an array method called on the arguments object
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-array-method-on-arguments.md
    'oxc/bad-array-method-on-arguments': 'error',

    // Disallow a parameter used only in recursion
    // https://oxc.rs/docs/guide/usage/linter/rules/oxc/only-used-in-recursion.md
    'oxc/only-used-in-recursion': 'error',

    // Disallow a callback call inside then() or catch()
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-callback-in-promise.md
    'promise/no-callback-in-promise': 'error',

    // Disallow new on the static Promise methods
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/no-new-statics.md
    'promise/no-new-statics': 'error',

    // Disallow duplicate enum member values
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-duplicate-enum-values.md
    '@typescript-eslint/no-duplicate-enum-values': 'error',

    // Disallow extra non-null assertions
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-extra-non-null-assertion.md
    '@typescript-eslint/no-extra-non-null-assertion': 'error',

    // Enforce valid definitions of new and constructor
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-new.md
    '@typescript-eslint/no-misused-new': 'error',

    // Disallow aliasing this
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-this-alias.md
    '@typescript-eslint/no-this-alias': 'error',

    // Disallow an assignment that repeats a parameter property
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-parameter-property-assignment.md
    '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',

    // Disallow unsafe declaration merging
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-declaration-merging.md
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',

    // Disallow an empty export that changes nothing in a module
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-useless-empty-export.md
    '@typescript-eslint/no-useless-empty-export': 'error',

    // Disallow the wrapper object types, such as String and Number
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-wrapper-object-types.md
    '@typescript-eslint/no-wrapper-object-types': 'error',

    // Prefer as const over a literal type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-as-const.md
    '@typescript-eslint/prefer-as-const': 'error',

    // Require the namespace keyword over module
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-namespace-keyword.md
    '@typescript-eslint/prefer-namespace-keyword': 'error',

    // Disallow a triple-slash reference in favor of an import
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/triple-slash-reference.md
    '@typescript-eslint/triple-slash-reference': 'error',

    // Disallow await in the parameters of the Promise methods
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-await-in-promise-methods.md
    'unicorn/no-await-in-promise-methods': 'error',

    // Disallow a file with no meaningful code
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-empty-file.md
    'unicorn/no-empty-file': 'error',

    // Disallow a body on a GET or HEAD request of fetch() and new Request()
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-invalid-fetch-options.md
    'unicorn/no-invalid-fetch-options': 'error',

    // Require a function as the listener of removeEventListener
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-invalid-remove-event-listener.md
    'unicorn/no-invalid-remove-event-listener': 'error',

    // Disallow a single-element array in the Promise methods
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-single-promise-in-promise-methods.md
    'unicorn/no-single-promise-in-promise-methods': 'error',

    // Disallow a then property
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-thenable.md
    'unicorn/no-thenable': 'error',

    // Disallow awaiting a non-promise value
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-await.md
    'unicorn/no-unnecessary-await': 'error',

    // Disallow a useless fallback when spreading into an object literal
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-fallback-in-spread.md
    'unicorn/no-useless-fallback-in-spread': 'error',

    // Disallow an unnecessary array length check in a logical expression
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-length-check.md
    'unicorn/no-useless-length-check': 'error',

    // Start each comment with a capital letter
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/capitalized-comments.md
    'capitalized-comments': 'error',

    // Require an initial value on each variable declaration
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/init-declarations.md
    'init-declarations': 'error',

    // Keep each file under 700 lines
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-lines.md
    'max-lines': ['error', { max: 700 }],

    // Too low at 10 statements: complexity covers the real risk
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-statements.md
    'max-statements': 'off',

    // TypeScript already rejects a class called without new, and Boolean(value) is wanted
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/new-cap.md
    'new-cap': 'off',

    // A guard continue often reads better than a nested block
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-continue.md
    'no-continue': 'off',

    // Does nothing without a list of names, which each project picks
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-exports.md
    'no-restricted-exports': 'off',

    // Contradicts viclafouch/no-leaked-render, which requires cond ? <X /> : null
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-ternary.md
    'no-ternary': 'off',

    // The undefined value is idiomatic TypeScript, and void 0 reads worse
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undefined.md
    'no-undefined': 'off',

    // The sortImports option of oxfmt sorts the imports and fixes them
    // https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-imports.md
    'sort-imports': 'off',

    // The code uses await, and promise/prefer-await-to-then is on
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/always-return.md
    'promise/always-return': 'off',

    // @typescript-eslint/no-floating-promises already reports an ignored promise
    // https://oxc.rs/docs/guide/usage/linter/rules/promise/catch-or-return.md
    'promise/catch-or-return': 'off',

    // TypeScript infers the return types, and the react config bans JSX.Element as a return type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-module-boundary-types.md
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // The old name of @typescript-eslint/no-require-imports, which is on
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-var-requires.md
    '@typescript-eslint/no-var-requires': 'off',

    // Repeats no-nested-ternary, which is on
    // https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-nested-ternary.md
    'unicorn/no-nested-ternary': 'off',

    // ─── Type-aware rules (run through oxlint-tsgolint) ───

    // Reports an exhaustive switch that returns in every case; noImplicitReturns of TypeScript checks the return paths
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-return.md
    '@typescript-eslint/consistent-return': 'off',

    // Enforce dot notation when type allows it
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/dot-notation.md
    '@typescript-eslint/dot-notation': 'error',

    // Enforce return-await inside try/catch for proper stack traces
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/return-await.md
    '@typescript-eslint/return-await': 'error',

    // Detect unhandled promises (void keyword opts out intentionally)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-floating-promises.md
    '@typescript-eslint/no-floating-promises': 'error',

    // Forbid a promise where the code expects a boolean or a void callback, such as an async onClick: its rejection goes unhandled
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-promises.md
    '@typescript-eslint/no-misused-promises': 'error',

    // Require a .catch() callback to type its error as unknown, as a catch clause of TypeScript does
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/use-unknown-in-catch-callback-variable.md
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',

    // Require an Error as a rejection reason. A reject() with no argument stays allowed
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-promise-reject-errors.md
    '@typescript-eslint/prefer-promise-reject-errors': [
      'error',
      { allowEmptyReject: true }
    ],

    // Require an Error as a thrown value, an any or unknown value included: any other value carries no stack trace
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/only-throw-error.md
    '@typescript-eslint/only-throw-error': [
      'error',
      { allowThrowingAny: false, allowThrowingUnknown: false }
    ],

    // Forbid delete on arrays (use splice instead)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-array-delete.md
    '@typescript-eslint/no-array-delete': 'error',

    // Prefer .find() over .filter()[0]
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-find.md
    '@typescript-eslint/prefer-find': 'error',

    // Prefer .startsWith()/.endsWith() over regex or slice comparisons
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-string-starts-ends-with.md
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',

    // Prefer .includes() to .indexOf() !== -1 and to a regex test of a plain string
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-includes.md
    '@typescript-eslint/prefer-includes': 'error',

    // Prefer explicit type parameter on reduce over casting accumulator
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-reduce-type-parameter.md
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',

    // Prefer ?? to a null check, and to || on an object, an array or a function. A primitive keeps ||, where '', 0 or false can mean "absent" on purpose
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-nullish-coalescing.md
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      { ignorePrimitives: true }
    ],

    // Forbid duplicate members in union/intersection types
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-duplicate-type-constituents.md
    '@typescript-eslint/no-duplicate-type-constituents': 'error',

    // Flag usage of deprecated APIs
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-deprecated.md
    '@typescript-eslint/no-deprecated': 'error',

    // Forbid spreading non-iterable values or objects into wrong context
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-spread.md
    '@typescript-eslint/no-misused-spread': 'error',

    // Forbid passing an any value to a typed parameter
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-argument.md
    '@typescript-eslint/no-unsafe-argument': 'error',

    // Forbid assigning an any value to a variable, a property or a destructured binding
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-assignment.md
    '@typescript-eslint/no-unsafe-assignment': 'error',

    // Forbid calling an any value
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-call.md
    '@typescript-eslint/no-unsafe-call': 'error',

    // Forbid reading a member of an any value
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-member-access.md
    '@typescript-eslint/no-unsafe-member-access': 'error',

    // Forbid returning an any value from a function
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-return.md
    '@typescript-eslint/no-unsafe-return': 'error',

    // Forbid comparing an enum to a value outside it, such as the same enum declared twice
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-enum-comparison.md
    '@typescript-eslint/no-unsafe-enum-comparison': 'error',

    // Forbid a raw number or string where an enum is expected: use the enum member
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-enum-assignment.md
    '@typescript-eslint/no-unsafe-enum-assignment': 'error',

    // Forbid an `as` that narrows a type: a type guard proves what the assertion only claims
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-type-assertion.md
    '@typescript-eslint/no-unsafe-type-assertion': 'error',

    // Flag default assignments that duplicate the parameter default
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-useless-default-assignment.md
    '@typescript-eslint/no-useless-default-assignment': 'error',

    // Forbid type conversions that don't change the runtime type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-conversion.md
    '@typescript-eslint/no-unnecessary-type-conversion': 'error',

    // Forbid an assertion to the type that the value or its receiver already has
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-assertion.md
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',

    // Forbid a type argument equal to the default of its type parameter
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-arguments.md
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',

    // Forbid comparing a boolean to true or false. A nullable boolean keeps its comparison
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-boolean-literal-compare.md
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',

    // Forbid a template literal that wraps one expression and adds no text
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-template-expression.md
    '@typescript-eslint/no-unnecessary-template-expression': 'error',

    // Forbid type parameters that could be inferred or are only used once
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-parameters.md
    '@typescript-eslint/no-unnecessary-type-parameters': 'error',

    // Forbid unnecessary namespace qualifiers when the name is already in scope
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-qualifier.md
    '@typescript-eslint/no-unnecessary-qualifier': 'error',

    // Forbid utility types that resolve to {}, for example Omit of every key: {} accepts any non-nullish value
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-generated-empty-object-type.md
    '@typescript-eslint/no-generated-empty-object-type': 'error',

    // Require a switch on a union to list every member. A default case stays allowed for an assertNever or a fallback
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/switch-exhaustiveness-check.md
    '@typescript-eslint/switch-exhaustiveness-check': [
      'error',
      {
        defaultCaseCommentPattern: 'no default',
        requireDefaultForNonUnion: true
      }
    ],

    // Too invasive, requires readonly on all params including third-party types
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly-parameter-types.md
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',

    // Forbid returning non-void values where void is expected
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/strict-void-return.md
    '@typescript-eslint/strict-void-return': 'error',

    // Async without await is valid when conforming to an interface or type signature
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-await.md
    '@typescript-eslint/require-await': 'off',

    // The typescript-eslint project removed it in v8, @typescript-eslint/no-empty-object-type and no-restricted-types replace it
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-types.md
    '@typescript-eslint/ban-types': 'off',

    // The old name of @typescript-eslint/no-empty-object-type, which is on
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-interface.md
    '@typescript-eslint/no-empty-interface': 'off',

    // Force explicit boolean conditions, such as str !== '' instead of if (str)
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/strict-boolean-expressions.md
    '@typescript-eslint/strict-boolean-expressions': 'off',

    // Disallow a void expression in a confusing position, such as a returned console.log()
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-confusing-void-expression.md
    '@typescript-eslint/no-confusing-void-expression': 'off',

    // Disallow an enum that mixes string and number members
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-mixed-enums.md
    '@typescript-eslint/no-mixed-enums': 'off',

    // Disallow + between operands of different types, such as string + number
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-plus-operands.md
    '@typescript-eslint/restrict-plus-operands': 'off',

    // Require the getter and the setter of a property to share one type
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/related-getter-setter-pairs.md
    '@typescript-eslint/related-getter-setter-pairs': 'off',

    // Disallow a condition that the types make always truthy or always falsy
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-condition.md
    '@typescript-eslint/no-unnecessary-condition': 'off',

    // Prefer a?.b over a && a.b
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-optional-chain.md
    '@typescript-eslint/prefer-optional-chain': 'off',

    // Require a this return type on a chainable method, instead of the class name
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-return-this-type.md
    '@typescript-eslint/prefer-return-this-type': 'off',

    // Prefer value! over value as T, which no-non-null-assertion forbids
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/non-nullable-type-assertion-style.md
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',

    // Require async on each function that returns a Promise: a plain function may return one
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/promise-function-async.md
    '@typescript-eslint/promise-function-async': 'off',

    // Disallow awaiting a value that is not a Thenable
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/await-thenable.md
    '@typescript-eslint/await-thenable': 'error',

    // Require a useful toString() on each value converted to a string
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-base-to-string.md
    '@typescript-eslint/no-base-to-string': 'error',

    // Disallow for...in on an array
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-for-in-array.md
    '@typescript-eslint/no-for-in-array': 'error',

    // Disallow the eval-like methods
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-implied-eval.md
    '@typescript-eslint/no-implied-eval': 'error',

    // Disallow void on a value that is already void or undefined
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-meaningless-void-operator.md
    '@typescript-eslint/no-meaningless-void-operator': 'error',

    // Disallow redundant constituents of a union or an intersection
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-redundant-type-constituents.md
    '@typescript-eslint/no-redundant-type-constituents': 'error',

    // Disallow the unary minus on a value that is not a number or a bigint
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-unary-minus.md
    '@typescript-eslint/no-unsafe-unary-minus': 'error',

    // Require a compare function in Array#sort()
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-array-sort-compare.md
    '@typescript-eslint/require-array-sort-compare': 'error',

    // Restrict the types allowed in a template literal
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-template-expressions.md
    '@typescript-eslint/restrict-template-expressions': 'error',

    // Require each unbound method to keep its expected this
    // https://oxc.rs/docs/guide/usage/linter/rules/typescript/unbound-method.md
    '@typescript-eslint/unbound-method': 'error'
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
