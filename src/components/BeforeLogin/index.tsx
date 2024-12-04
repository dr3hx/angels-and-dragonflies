'use client'

import React from 'react'
import { MotionDiv } from 'src/components/common/motion'
import { cn } from 'src/utilities/cn'

const BeforeLogin: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#6366F1] flex flex-col items-center justify-center p-6">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex-shrink-0" />
          <h1 className="ml-4 text-2xl font-bold text-white">Dashboard</h1>
        </div>

        <div className={cn(
          "bg-white/10 backdrop-blur-lg rounded-xl p-6",
          "border border-white/20",
          "text-center text-white"
        )}>
          <h2 className="text-xl font-semibold mb-2">
            Welcome to your dashboard
          </h2>
          <p className="text-white/70">
            This is where site admins will log in to manage your website.
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-white/50">
            Need help? Contact your system administrator
          </p>
        </div>
      </MotionDiv>
    </div>
  )
}

export default BeforeLogin
