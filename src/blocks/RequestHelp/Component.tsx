import React from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import Link from 'next/link'
import { Media } from '../../components/Media'
import RichText from '../../components/RichText'
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

type Props = {
  title: string
  description: any // Rich text content
  bg?: {
    img: MediaType
    style?: BackgroundStyle
    overlay?: {
      enable: boolean
      opacity: number
    }
  }
  button: {
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

export const RequestHelp: React.FC<Props> = ({ 
  title,
  description,
  bg,
  button,
}) => {
  const buttonHref = button.link.type === 'page' 
    ? `/${button.link.page?.slug}` 
    : button.link.url || '#'

  const backgroundStyles = bg?.style ? generateBackgroundStyles(bg.style) : {}
  const overlayOpacity = bg?.overlay?.enable ? bg.overlay.opacity / 100 : 0

  return (
    <section className="relative w-full py-16 overflow-hidden">
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

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - empty for background image visibility */}
          <div></div>

          {/* Right side - Content Card */}
          <Card className="p-8 bg-white/95 backdrop-blur">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <div className="prose prose-sm mb-6">
              <RichText content={description} />
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={buttonHref}>
                {button.label}
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
