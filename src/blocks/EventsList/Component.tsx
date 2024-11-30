import React from 'react'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import Link from 'next/link'
import { Media } from '../../components/Media'
import RichText from '../../components/RichText'
import { cn } from '../../utilities/cn'
import type { Media as MediaType } from '../../payload-types'
import { format } from 'date-fns'

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

type Event = {
  id: string
  title: string
  description: any // Rich text content
  image: MediaType
  slug: string
  startDate: string
  endDate: string
  active: boolean
  location?: string
}

type Props = {
  title: string
  description?: any // Rich text content
  events: Event[]
  bg?: {
    img: MediaType
    style?: BackgroundStyle
    overlay?: {
      enable: boolean
      opacity: number
    }
  }
  layout?: {
    style: 'list' | 'grid'
    columns?: '2' | '3' | '4'
    spacing: 'small' | 'medium' | 'large'
  }
  showFeaturedEventFirst?: boolean
  eventsToShow?: number
  eventDisplay?: {
    showDate?: boolean
    showTime?: boolean
    showLocation?: boolean
    showDescription?: boolean
    showImage?: boolean
  }
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

  if (size.mode === 'custom' && size.width && size.height) {
    styles.backgroundSize = `${size.width} ${size.height}`
  } else {
    styles.backgroundSize = size.mode
  }

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
  if (style === 'list') {
    return 'grid-cols-1'
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

export const EventsList: React.FC<Props> = ({
  title,
  description,
  events,
  bg,
  layout = { style: 'grid', columns: '3', spacing: 'medium' },
  showFeaturedEventFirst = true,
  eventsToShow = 3,
  eventDisplay = {
    showDate: true,
    showTime: true,
    showLocation: true,
    showDescription: true,
    showImage: true,
  },
  button,
}) => {
  const buttonHref = button?.link.type === 'page'
    ? `/${button.link.page?.slug}`
    : button?.link.url || '#'

  const backgroundStyles = bg?.style ? generateBackgroundStyles(bg.style) : {}
  const overlayOpacity = bg?.overlay?.enable ? bg.overlay.opacity / 100 : 0
  const spacingClass = getSpacingClass(layout.spacing)
  const columnsClass = getColumnsClass(layout.style, layout.columns)

  const sortedEvents = [...events]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, eventsToShow)

  const featuredEvent = showFeaturedEventFirst ? sortedEvents[0] : undefined
  const remainingEvents = showFeaturedEventFirst 
    ? sortedEvents.slice(1) 
    : sortedEvents

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (start.toDateString() === end.toDateString()) {
      return eventDisplay.showTime
        ? `${format(start, 'MMMM d, yyyy')} • ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`
        : format(start, 'MMMM d, yyyy')
    }
    
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
  }

  return (
    <section className="relative py-16 overflow-hidden">
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

        {/* Featured Event */}
        {featuredEvent && showFeaturedEventFirst && (
          <div className="mb-12">
            <Link href={`/events/${featuredEvent.slug}`} className="group">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  {eventDisplay.showImage && (
                    <div className="relative aspect-[16/9] md:aspect-square">
                      <Media
                        resource={featuredEvent.image}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge variant={featuredEvent.active ? "default" : "secondary"}>
                        {featuredEvent.active ? 'Upcoming' : 'Past Event'}
                      </Badge>
                      {eventDisplay.showDate && (
                        <span className="text-sm text-muted-foreground">
                          {formatEventDate(featuredEvent.startDate, featuredEvent.endDate)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      {featuredEvent.title}
                    </h3>
                    {eventDisplay.showLocation && featuredEvent.location && (
                      <p className="text-sm text-muted-foreground mb-4">
                        📍 {featuredEvent.location}
                      </p>
                    )}
                    {eventDisplay.showDescription && (
                      <div className="prose prose-sm">
                        <RichText content={featuredEvent.description} />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Events Grid/List */}
        {remainingEvents.length > 0 && (
          <div className={cn(
            'grid',
            spacingClass,
            columnsClass
          )}>
            {remainingEvents.map((event: Event) => (
              <Link 
                key={event.id}
                href={`/events/${event.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden">
                  {eventDisplay.showImage && (
                    <div className="relative aspect-[16/9]">
                      <Media
                        resource={event.image}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge variant={event.active ? "default" : "secondary"}>
                        {event.active ? 'Upcoming' : 'Past Event'}
                      </Badge>
                      {eventDisplay.showDate && (
                        <span className="text-sm text-muted-foreground">
                          {formatEventDate(event.startDate, event.endDate)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    {eventDisplay.showLocation && event.location && (
                      <p className="text-sm text-muted-foreground mb-2">
                        📍 {event.location}
                      </p>
                    )}
                    {eventDisplay.showDescription && (
                      <div className="prose prose-sm line-clamp-2">
                        <RichText content={event.description} />
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

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
