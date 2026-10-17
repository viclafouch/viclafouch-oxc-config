import { RuleTester } from 'oxlint/plugins-dev'
import { noForwardRef } from '../rules/no-forward-ref'

// oxlint-disable-next-line typescript/strict-void-return -- the oxlint RuleTester docs assign the vitest describe as is
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: 'tsx' } }
})

ruleTester.run('no-forward-ref', noForwardRef, {
  valid: [
    {
      name: 'forwardRef from another package',
      code: "import { forwardRef } from '@acme/ui'"
    },
    {
      name: 'a type imported from react',
      code: "import { type ForwardedRef } from 'react'"
    },
    {
      name: 'a type-only import of forwardRef',
      code: "import type { forwardRef } from 'react'"
    },
    {
      name: 'an inline type import of forwardRef',
      code: "import { type forwardRef } from 'react'"
    },
    {
      name: 'a type-only re-export of forwardRef',
      code: "export type { forwardRef } from 'react'"
    },
    {
      name: 'an inline type re-export of forwardRef',
      code: "export { type forwardRef } from 'react'"
    },
    {
      name: 'a namespace import that never reads forwardRef',
      code: "import * as React from 'react'\nconst [count] = React.useState(0)"
    },
    {
      name: 'a default import that never reads forwardRef',
      code: "import React from 'react'\nconst [count] = React.useState(0)"
    },
    {
      name: 'forwardRef read on a namespace of another package',
      code: "import * as React from '@acme/ui'\nconst Input = React.forwardRef(render)"
    },
    {
      name: 'forwardRef read on a local object named React',
      code: 'const React = { forwardRef }\nconst Input = React.forwardRef(render)'
    },
    {
      name: 'forwardRef read on a global React, with no import',
      code: 'const Input = React.forwardRef(render)'
    },
    {
      name: 'another key read with a computed key',
      code: "import React from 'react'\nconst [count] = React[hookName](0)"
    },
    {
      name: 'another member destructured from the react import',
      code: "import React from 'react'\nconst { useState } = React"
    },
    {
      name: 'a parameter that shadows the react import',
      code: "import React from 'react'\nconst wrap = (React) => React.forwardRef(render)"
    }
  ],
  invalid: [
    {
      name: 'the named import',
      code: "import { forwardRef } from 'react'",
      errors: [{ messageId: 'forwardRef' }]
    },
    {
      name: 'the named import under an alias',
      code: "import { useState, forwardRef as withRef } from 'react'",
      errors: [{ messageId: 'forwardRef', column: 19 }]
    },
    {
      name: 'a re-export from react',
      code: "export { forwardRef } from 'react'",
      errors: [{ messageId: 'forwardRef' }]
    },
    {
      name: 'forwardRef read on a namespace import',
      code: "import * as React from 'react'\nconst Input = React.forwardRef(render)",
      errors: [{ messageId: 'forwardRef', line: 2 }]
    },
    {
      name: 'forwardRef read on a default import',
      code: "import React from 'react'\nconst Input = React.forwardRef(render)",
      errors: [{ messageId: 'forwardRef', line: 2 }]
    },
    {
      name: 'forwardRef read on a renamed default import',
      code: "import R from 'react'\nconst Input = R.forwardRef(render)",
      errors: [{ messageId: 'forwardRef', line: 2 }]
    },
    {
      name: 'forwardRef read on the default of a mixed import',
      code: "import React, { useState } from 'react'\nconst Input = React.forwardRef(render)",
      errors: [{ messageId: 'forwardRef', line: 2 }]
    },
    {
      name: 'forwardRef read with a computed key',
      code: "import React from 'react'\nconst Input = React['forwardRef'](render)",
      errors: [{ messageId: 'forwardRef', line: 2 }]
    },
    {
      name: 'forwardRef read with optional chaining',
      code: "import React from 'react'\nconst Input = React?.forwardRef(render)",
      errors: [{ messageId: 'forwardRef', line: 2 }]
    },
    {
      name: 'forwardRef destructured from the react import',
      code: "import React from 'react'\nconst { useState, forwardRef: withRef } = React",
      errors: [{ messageId: 'forwardRef', line: 2 }]
    }
  ]
})
