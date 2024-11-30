import React from 'react'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { Media } from '../../components/Media'
import RichText from '../../components/RichText'
import { cn } from '../../utilities/cn'
import type { Media as MediaType } from '../../payload-types'

type BackgroundStyle = {
  size: {
    mode: 'cover' | 'contain' | 'custom'
    width?: string
    height?: string
  }
  position: {
    x: 'left' | 'center' | 'right'
    y: 'top' | 'center' | 'bottom'
    customX?: string
    customY?: string
  }
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
  fixed: boolean
}

type Program = {
  id: string
  title: string
  description: any // Rich text content
  image: MediaType
  slug: string
}

type Props = {
  title: string
  description?: any // Rich text content
  programs: Program[]
  bg?: {
    img: MediaType
    style?: BackgroundStyle
    overlay?: {
      enable: boolean
      opacity: number
    }
  }
  layout?: {
    style: 'grid' | 'featured'
    columns?: '2' | '3' | '4'
    spacing: 'small' | 'medium' | 'large'
  }
  backgroundColor?: 'white' | 'gray'
  button?: {
    label: string
    link: {
      type: 'page' | 'custom'
      page?: {
        slug: string
      }
      url?: string
    }
  }
}

const generateBackgroundStyles = (style?: BackgroundStyle) => {
  if (!style) return {}

  const {
    size,
    position,
    repeat,
    fixed,
  } = style

  const styles: Record<string, string> = {
    backgroundRepeat: repeat,
    backgroundAttachment: fixed ? 'fixed' : 'scroll',
  }

  // Handle size
  if (size.mode === 'custom' && size.width && size.height) {
    styles.backgroundSize = `${size.width} ${size.height}`
  } else {
    styles.backgroundSize = size.mode
  }

  // Handle position
  if (position.customX && position.customY) {
    styles.backgroundPosition = `${position.customX} ${position.customY}`
  } else {
    styles.backgroundPosition = `${position.x} ${position.y}`
  }

  return styles
}

const getSpacingClass = (spacing: string) => {
  switch (spacing) {
    case 'small':
      return 'gap-4'
    case 'large':
      return 'gap-12'
    default:
      return 'gap-8'
  }
}

const getColumnsClass = (style: string, columns?: string) => {
  if (style === 'featured') {
    return 'grid-cols-1 md:grid-cols-2'
  }

  switch (columns) {
    case '2':
      return 'grid-cols-1 md:grid-cols-2'
    case '4':
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    default:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }
}

export const ProgramsGrid: React.FC<Props> = ({
  title,
  description,
  programs,
  bg,
  layout = { style: 'grid', columns: '3', spacing: 'medium' },
  backgroundColor = 'white',
  button,
}) => {
  const buttonHref = button?.link.type === 'page'
    ? `/${button.link.page?.slug}`
    : button?.link.url || '#'

  const backgroundStyles = bg?.style ? generateBackgroundStyles(bg.style) : {}
  const overlayOpacity = bg?.overlay?.enable ? bg.overlay.opacity / 100 : 0
  const spacingClass = getSpacingClass(layout.spacing)
  const columnsClass = getColumnsClass(layout.style, layout.columns)

  return (
    <section className={cn(
      "relative py-16 overflow-hidden",
      backgroundColor === 'gray' && "bg-gray-50"
    )}>
      {/* Background Image */}
      {bg?.img && (
        <>
          <div 
            className="absolute inset-0 z-0"
            style={backgroundStyles}
          >
            <Media 
              resource={bg.img}
              className="object-cover w-full h-full"
              fill
            />
          </div>
          {/* Overlay */}
          {bg.overlay?.enable && (
            <div 
              className="absolute inset-0 z-[1] bg-black"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </>
      )}

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {description && (
            <div className="max-w-2xl mx-auto">
              <RichText content={description} />
            </div>
          )}
        </div>

        {/* Programs Grid */}
        <div className={cn(
          'grid',
          spacingClass,
          columnsClass
        )}>
          {programs.map((program) => (
            <Link 
              key={program.id} 
              href={`/programs/${program.slug}`}
              className={cn(
                "group",
                layout.style === 'featured' && "first:md:col-span-2 first:md:row-span-2"
              )}
            >
              <Card className="h-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                <div className={cn(
                  "relative",
                  layout.style === 'featured' ? "aspect-[16/9]" : "aspect-[4/3]"
                )}>
                  <Media
                    resource={program.image}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className={cn(
                    "font-semibold mb-2",
                    layout.style === 'featured' ? "text-2xl" : "text-xl"
                  )}>{program.title}</h3>
                  <div className={cn(
                    "prose prose-sm",
                    layout.style === 'featured' ? "line-clamp-4" : "line-clamp-3"
                  )}>
                    <RichText content={program.description} />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        {button && (
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href={buttonHref}>
                {button.label}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
