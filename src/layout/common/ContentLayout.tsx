'use client'

import React, { FC } from 'react'

interface ContentLayoutProps {
    title: string,
    children: React.ReactNode
}

const ContentLayout: FC<ContentLayoutProps> = function ({ title, children }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h3 className="mb-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
        { title }
      </h3>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              { children }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentLayout