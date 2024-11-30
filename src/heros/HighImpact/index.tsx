'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ChevronDown, ArrowDown, MousePointer, ArrowDownCircle } from 'lucide-react'
import { cn } from '@/utilities/cn'
import type { CSSProperties } from 'react'

type HeroProps = {
  type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
  richText?: any
  links?: Array<{ link: any }>
  bg?: {
    img?: any
    style?: {
      fit?: 'cover' | 'contain' | 'auto'
      pos?: 'top' | 'center' | 'bottom'
      repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
      fixed?: boolean
    }
    overlay?: {
      enable?: boolean
      opacity?: number
    }
  }
  scroll?: {
    enable?: boolean
    text?: string
    icon?: 'chevron-down' | 'arrow-down' | 'mouse' | 'circle-arrow'
    animation?: 'bounce' | 'pulse' | 'fade' | 'none'
    position?: {
      bottom?: string
      color?: string
    }
  }
}

const scrollIcons = {
  'chevron-down': ChevronDown,
  'arrow-down': ArrowDown,
  'mouse': MousePointer,
  'circle-arrow': ArrowDownCircle,
}

const scrollAnimations = {
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  fade: 'animate-fade',
  none: '',
}

export const HighImpactHero: React.FC<HeroProps> = ({ links, bg, richText, scroll }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  // Generate background classes
  const getBackgroundClasses = () => {
    if (!bg?.img) return ''

    const style = bg.style || {}
    return cn(
      style.repeat && `bg-${style.repeat}`,
      style.fixed && 'bg-fixed',
      style.fit === 'cover' && 'object-cover',
      style.fit === 'contain' && 'object-contain',
      style.fit === 'auto' && 'object-none',
      style.pos === 'top' && 'object-top',
      style.pos === 'center' && 'object-center',
      style.pos === 'bottom' && 'object-bottom',
    )
  }

  const ScrollIcon = scroll?.icon ? scrollIcons[scroll.icon] : ChevronDown

  return (
    <div
      className="relative min-h-screen -mt-[10.4rem] flex flex-col items-center justify-center text-white"
      data-theme="dark"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        {bg?.img && typeof bg.img === 'object' && (
          <>
            <Media
              fill
              imgClassName={getBackgroundClasses()}
              priority
              resource={bg.img}
            />
            {bg.overlay?.enable && (
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundColor: `rgba(0, 0, 0, ${(bg.overlay.opacity || 40) / 100})`
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-[800px]">
          {richText && (
            <RichText 
              className={cn(
                "mb-8",
                "[&_h1]:text-5xl md:[&_h1]:text-6xl [&_h1]:font-bold [&_h1]:mb-6",
                "[&_p]:text-lg md:[&_p]:text-xl [&_p]:text-white/90 [&_p]:leading-relaxed"
              )} 
              content={richText} 
              enableGutter={false} 
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink 
                      {...link}
                      className={cn(
                        "inline-flex items-center justify-center",
                        "px-8 py-3 rounded-full",
                        "font-semibold text-base transition-all",
                        "shadow-lg hover:shadow-xl",
                        i === 0 
                          ? "bg-white text-slate-900 hover:bg-white/90" 
                          : "bg-transparent border-2 border-white text-white hover:bg-white/10"
                      )}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {scroll?.enable && (
        <button
          onClick={scrollToContent}
          className={cn(
            "absolute left-1/2 -translate-x-1/2",
            "flex flex-col items-center gap-2",
            "transition-colors duration-200 cursor-pointer",
            scrollAnimations[scroll.animation || 'bounce']
          )}
          style={{
            bottom: scroll.position?.bottom || '2rem',
            color: scroll.position?.color || 'white',
          }}
          aria-label="Scroll to content"
        >
          <span className="text-sm font-medium">
            {scroll.text || 'Scroll Down'}
          </span>
          <ScrollIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
