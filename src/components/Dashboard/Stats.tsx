import React from 'react'
import { Card, CardContent } from '../ui/card'

interface StatsProps {
  title: string
  value: string
  icon: React.ReactNode
  bgColor: string
  textColor: string
}

export const Stats: React.FC<StatsProps> = ({ title, value, icon, bgColor, textColor }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`inline-flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-lg ${bgColor} ${textColor}`}>
            {icon}
          </div>
          <div className="ml-4">
            <span className="block text-2xl font-bold">
              {value}
            </span>
            <span className="block text-sm text-muted-foreground">
              {title}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
