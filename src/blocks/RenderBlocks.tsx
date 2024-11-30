import { cn } from '@/utilities/cn'
import React, { Fragment } from 'react'
import type { Page } from '../payload-types'
import { ArchiveBlock } from './ArchiveBlock/Component'
import { CallToActionBlock } from './CallToAction/Component'
import { ContentBlock } from './Content/Component'
import { FormBlock } from './Form/Component'
import { MediaBlock } from './MediaBlock/Component'
import { ActionCards } from './ActionCards'
import { RequestHelp } from './RequestHelp'
import { ProgramsGrid } from './ProgramsGrid'
import { EventsList } from './EventsList'

type BlockComponentsType = {
  [key: string]: React.ComponentType<any>
  archive: typeof ArchiveBlock
  content: typeof ContentBlock
  cta: typeof CallToActionBlock
  formBlock: typeof FormBlock
  mediaBlock: typeof MediaBlock
  actionCards: typeof ActionCards
  requestHelp: typeof RequestHelp
  programsGrid: typeof ProgramsGrid
  eventsList: typeof EventsList
}

const blockComponents: BlockComponentsType = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  actionCards: ActionCards,
  requestHelp: RequestHelp,
  programsGrid: ProgramsGrid,
  eventsList: EventsList,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof BlockComponentsType]

            if (Block) {
              return (
                <div 
                  className={cn(
                    "relative",
                    // Add margin except for full-width blocks
                    blockType !== 'requestHelp' && "my-16"
                  )} 
                  key={index}
                >
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
