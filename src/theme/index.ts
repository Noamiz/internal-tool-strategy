import type { Tokens } from './tokens'
import { tokens } from './tokens'

type NestedStringRecord = Record<string, string | NestedStringRecord>

function flattenTokens(prefix: string, nested: NestedStringRecord, vars: Record<string, string>) {
  Object.entries(nested).forEach(([key, value]) => {
    const variableName = `${prefix}-${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`
    if (typeof value === 'string') {
      vars[`--${variableName}`] = value
    } else {
      flattenTokens(variableName, value, vars)
    }
  })
}

export function tokensToCssVariables(theme: Tokens = tokens) {
  const vars: Record<string, string> = {}
  flattenTokens('token', theme as unknown as NestedStringRecord, vars)
  return vars
}

export { tokens }

