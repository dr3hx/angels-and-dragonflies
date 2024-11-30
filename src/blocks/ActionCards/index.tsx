'use client'

import React from 'react'
import { Heart, Users, BookOpen, HelpCircle, Gift, Home, Star, Calendar, Mail, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import type { CSSProperties } from 'react'

type ActionCard = {
  title: string
  description?: string
  icon: {
    type: 'preset' | 'custom'
    preset?: string
    custom?: {
      url: string
      alt?: string
    }
  }
  color: string
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

type ActionCardsBlockType = {
  blockType: 'actionCards'
  backgroundColor?: string
  layout: {
    spacing: 'small' | 'medium' | 'large'
  }
  bg?: {
    img?: {
      url: string
      alt?: string
    }
    style?: {
      size?: {
        mode?: 'cover' | 'contain' | 'custom'
        width?: string
        height?: string
      }
      position?: {
        x?: 'left' | 'center' | 'right'
        y?: 'top' | 'center' | 'bottom'
        customX?: string
        customY?: string
      }
      repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
      fixed?: boolean
    }
    overlay?: {
      enable?: boolean
      opacity?: number
    }
  }
  title?: string
  description?: any
  cards: ActionCard[]
}

const presetIcons = {
  heart: Heart,
  users: Users,
  book: BookOpen,
  help: HelpCircle,
  gift: Gift,
  home: Home,
  star: Star,
  calendar: Calendar,
  mail: Mail,
  phone: Phone,
}

const colorClasses = {
  red: {
    icon: 'bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400',
    hover: 'hover:bg-red-50/50 dark:hover:bg-red-950/50',
    button: 'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700',
    border: 'border-red-100 dark:border-red-900',
  },
  amber: {
    icon: 'bg-amber-50 text-amber-500 dark:bg-amber-950 dark:text-amber-400',
    hover: 'hover:bg-amber-50/50 dark:hover:bg-amber-950/50',
    button: 'bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700',
    border: 'border-amber-100 dark:border-amber-900',
  },
  emerald: {
    icon: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400',
    hover: 'hover:bg-emerald-50/50 dark:hover:bg-emerald-950/50',
    button: 'bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700',
    border: 'border-emerald-100 dark:border-emerald-900',
  },
  blue: {
    icon: 'bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400',
    hover: 'hover:bg-blue-50/50 dark:hover:bg-blue-950/50',
    button: 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700',
    border: 'border-blue-100 dark:border-blue-900',
  },
  purple: {
    icon: 'bg-purple-50 text-purple-500 dark:bg-purple-950 dark:text-purple-400',
    hover: 'hover:bg-purple-50/50 dark:hover:bg-purple-950/50',
    button: 'bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700',
    border: 'border-purple-100 dark:border-purple-900',
  },
  pink: {
    icon: 'bg-pink-50 text-pink-500 dark:bg-pink-950 dark:text-pink-400',
    hover: 'hover:bg-pink-50/50 dark:hover:bg-pink-950/50',
    button: 'bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700',
    border: 'border-pink-100 dark:border-pink-900',
  },
  teal: {
    icon: 'bg-teal-50 text-teal-500 dark:bg-teal-950 dark:text-teal-400',
    hover: 'hover:bg-teal-50/50 dark:hover:bg-teal-950/50',
    button: 'bg-teal-500 hover:bg-teal-600 text-white dark:bg-teal-600 dark:hover:bg-teal-700',
    border: 'border-teal-100 dark:border-teal-900',
  },
  indigo: {
    icon: 'bg-indigo-50 text-indigo-500 dark:bg-indigo-950 dark:text-indigo-400',
    hover: 'hover:bg-indigo-50/50 dark:hover:bg-indigo-950/50',
    button: 'bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700',
    border: 'border-indigo-100 dark:border-indigo-900',
  },
}

const spacingClasses = {
  small: 'py-8 px-4',
  medium: 'py-16 px-6',
  large: 'py-24 px-8',
}

export const ActionCards: React.FC<ActionCardsBlockType> = ({ 
  backgroundColor,
  layout,
  bg,
  title = 'How You Can Help',
  description,
  cards = []
}) => {
  // Generate background image styles
  const getBackgroundStyles = (): CSSProperties => {
    if (!bg?.img?.url) return {}

    const style = bg.style || {}
    const size = style.size || {}
    const position = style.position || {}

    let objectFit: CSSProperties['objectFit'] = 'cover'
    let objectPosition: CSSProperties['objectPosition'] = 'center'
    let width: CSSProperties['width'] = '100%'
    let height: CSSProperties['height'] = '100%'

    // Handle size
    if (size.mode === 'custom' && (size.width || size.height)) {
      width = size.width || '100%'
      height = size.height || '100%'
      objectFit = 'none'
    } else if (size.mode === 'contain') {
      objectFit = 'contain'
    } else {
      objectFit = 'cover'
    }

    // Handle position
    if (position.customX || position.customY) {
      objectPosition = `${position.customX || '50%'} ${position.customY || '50%'}`
    } else {
      const x = position.x || 'center'
      const y = position.y || 'center'
      objectPosition = `${x} ${y}`
    }

    return {
      width,
      height,
      objectFit,
      objectPosition,
      backgroundRepeat: style.repeat || 'no-repeat',
      backgroundAttachment: style.fixed ? 'fixed' : 'scroll',
    }
  }

  return (
    <section className="relative">
      {/* Background Image */}
      {bg?.img?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg.img.url}
            alt={bg.img.alt || ''}
            fill
            className={cn(
              bg.style?.repeat && `bg-${bg.style.repeat}`,
              bg.style?.fixed && 'bg-fixed',
            )}
            style={getBackgroundStyles()}
          />
          {bg.overlay?.enable && (
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: `rgba(var(--background-rgb), ${(bg.overlay.opacity || 50) / 100})`,
              }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "relative z-10",
        spacingClasses[layout?.spacing || 'medium'],
        backgroundColor || 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {(title || description) && (
            <div className="text-center mb-16">
              {title && (
                <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">
                  {title}
                </h2>
              )}
              {description && (
                <div className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
                  <RichText content={description} />
                </div>
              )}
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, index) => {
              const colorClass = colorClasses[card.color as keyof typeof colorClasses] || colorClasses.blue
              const href = card.button.link.type === 'page' 
                ? `/${card.button.link.page?.slug}` 
                : card.button.link.url || '#'

              return (
                <Card 
                  key={index} 
                  className={cn(
                    "rounded-2xl border h-full transition-all duration-300",
                    colorClass.border,
                    "hover:shadow-lg hover:-translate-y-1",
                    colorClass.hover,
                    "bg-white dark:bg-slate-900 overflow-hidden"
                  )}
                >
                  <CardContent className="p-8 text-center flex flex-col h-full items-center">
                    <div className={cn(
                      "w-24 h-24 rounded-full flex items-center justify-center mb-6",
                      "shadow-sm",
                      colorClass.icon
                    )}>
                      {card.icon.type === 'preset' && card.icon.preset && (
                        React.createElement(presetIcons[card.icon.preset as keyof typeof presetIcons] || HelpCircle, {
                          className: "w-12 h-12",
                          strokeWidth: 1.5
                        })
                      )}
                      {card.icon.type === 'custom' && card.icon.custom?.url && (
                        <Image
                          src={card.icon.custom.url}
                          alt={card.icon.custom.alt || ''}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-slate-600 dark:text-slate-300 mb-8 flex-grow text-base leading-relaxed">
                        {card.description}
                      </p>
                    )}
                    <Button
                      asChild
                      className={cn(
                        "rounded-full font-semibold px-8 py-2.5 h-auto text-base",
                        "transition-all duration-300 shadow-sm",
                        colorClass.button
                      )}
                    >
                      <Link href={href}>
                        {card.button.label}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
