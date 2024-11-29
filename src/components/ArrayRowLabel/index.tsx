'use client'

import { useRowLabel } from '@payloadcms/ui'

export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()
  const customLabel = `${data?.title || 'Action Card'} ${String(rowNumber).padStart(2, '0')}`
  return customLabel
}

