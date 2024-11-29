'use client'

import React from 'react'
import { Heart, Users, BookOpen, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

type ActionCard = {
  title: string
  description?: string
  icon: 'heart' | 'users' | 'book' | 'help'
  color: 'red' | 'amber' | 'emerald' | 'blue'
  link: {
    type: 'page' | 'custom'
    page?: {
      slug: string
    }
    url?: string
  }
}

type ActionCardsBlockType = {
  blockType: 'actionCards'
  backgroundColor?: string
  cards: ActionCard[]
}

const icons = {
  heart: Heart,
  users: Users,
  book: BookOpen,
  help: HelpCircle,
}

const colorClasses = {
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
}

export const ActionCards: React.FC<ActionCardsBlockType> = ({ 
  backgroundColor,
  cards = [] // Provide default empty array
}) => {
  return (
    <section className={`py-16 px-4 ${backgroundColor || 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = icons[card.icon] || HelpCircle
            const colorClass = colorClasses[card.color] || 'bg-blue-500'
            const href = card.link?.type === 'page' 
              ? `/${card.link.page?.slug}` 
              : card.link?.url || '#'

            return (
              <Link key={index} href={href}>
                <Card className="h-full transition-transform hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    {card.description && (
                      <p className="text-gray-600">{card.description}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

