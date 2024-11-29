'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { Page } from '@/payload-types'

interface PageClientProps {
  page: Page
}

const PageClient: React.FC<PageClientProps> = ({ page }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const { hero, layout } = page

  return (
    <React.Fragment>
      {hero && <RenderHero {...hero} />}
      {layout && <RenderBlocks blocks={layout} />}
    </React.Fragment>
  )
}

export default PageClient