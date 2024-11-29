import type { FieldHook } from 'payload'

export const formatBackgroundColor: FieldHook = ({ value }) => {
  if (value && !value.startsWith('bg-')) {
    return `bg-${value}`
  }
  return value
}

