import type { KnipConfig } from 'knip'

export default {
  project: ['**/*.ts!', '!tests/**!', '!plugins/*/tests/**!'],
  ignoreDependencies: [
    '@inlang/paraglide-js',
    '@tanstack/eslint-plugin-query',
    '@tanstack/eslint-plugin-router',
    'eslint-plugin-playwright',
    'eslint-plugin-react-native',
    'eslint-plugin-testing-library',
    'eslint-plugin-turbo'
  ],
  treatConfigHintsAsErrors: true
} satisfies KnipConfig
