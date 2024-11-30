'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useTranslation } from '@payloadcms/ui'
import { useConfig, useAuth } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'

interface Collection {
  admin?: {
    group?: string
    icon?: string
  }
  labels?: {
    plural?: string
  }
  slug: string
}

interface NavGroup {
  label: string
  collections: {
    label: string
    slug: string
    icon?: React.ReactNode
  }[]
}

interface User {
  id: string
  email: string
  collection: string
  [key: string]: any
}

const getCollectionIcon = (collection: Collection) => {
  // Default icon if none specified
  if (!collection.admin?.icon) {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
      </svg>
    )
  }

  // Return custom icon based on collection type
  switch (collection.admin.icon) {
    case 'pages':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'media':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    case 'events':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
        </svg>
      )
  }
}

const NavContent: React.FC<{ groups: Record<string, NavGroup>; pathname: string }> = ({ groups, pathname }) => {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="font-semibold text-xl">Dashboard</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {/* Analytics Dashboard */}
        <Button 
          variant="ghost" 
          className={`w-full justify-start gap-3 ${pathname === '/admin' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : ''}`}
          asChild
        >
          <a href="/admin">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </a>
        </Button>

        {/* Dynamic Groups and Collections */}
        {Object.entries(groups).map(([groupKey, groupData]) => (
          <div key={groupKey} className="pt-4 space-y-1">
            <h3 className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              {groupData.label}
            </h3>
            {groupData.collections.map((collection) => {
              const isActive = pathname === `/admin/collections/${collection.slug}`
              return (
                <Button 
                  key={collection.slug}
                  variant="ghost" 
                  className={`w-full justify-start gap-3 ${isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : ''}`}
                  asChild
                >
                  <a href={`/admin/collections/${collection.slug}`}>
                    {getCollectionIcon({ slug: collection.slug, admin: { icon: collection.slug } })}
                    {collection.label}
                  </a>
                </Button>
              )
            })}
          </div>
        ))}
      </nav>
    </>
  )
}

const Nav: React.FC = () => {
  const { config } = useConfig()
  const { user } = useAuth()
  const pathname = usePathname()

  const collections = config.collections
  const groups = collections.reduce<Record<string, NavGroup>>((acc, collection) => {
    const groupName = collection.admin?.group || 'No Group'
    if (!acc[groupName]) {
      acc[groupName] = {
        label: groupName,
        collections: []
      }
    }
    acc[groupName].collections.push({
      label: collection.labels?.plural || collection.slug,
      slug: collection.slug,
    })
    return acc
  }, {})

  const userEmail = user?.email || ''
  const userCollection = user?.collection || ''

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="fixed inset-y-0 left-0 w-64 hidden lg:flex lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <NavContent groups={groups} pathname={pathname} />

          {/* User Profile */}
          {user && (
            <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userEmail)}`}
                alt={userEmail}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {userEmail}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userCollection}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            <NavContent groups={groups} pathname={pathname} />
            
            {/* Mobile User Profile */}
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userEmail)}`}
                  alt={userEmail}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {userEmail}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {userCollection}
                  </p>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Nav
