'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'

const BackgroundColorComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="background-color-field">
      <div>
        <p>{path}</p>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value || ''}
        />
      </div>
      {value && (
        <div
          className={`color-preview ${String(value)}`}
          aria-label="color preview"
        />
      )}
    </div>
  )
}

export default BackgroundColorComponent

