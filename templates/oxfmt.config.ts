/**
 * Oxfmt config template.
 *
 * Usage:
 *   oxfmt '**/*.{ts,tsx,js,jsx}'
 *   oxfmt --check '**/*.{ts,tsx,js,jsx}'
 */
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

export default defineConfig(oxfmtConfig)
