'use client'
import type { FC } from 'react'

import AdminNavbar from '@/components/admin/AdminNavbar'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { AdminFooter } from '@/components/admin/AdminFooter'
import { SalesThisWeek } from '@/components/common/SaleThisWeek'
import { LatestTransactions } from '@/components/common/LatestTransations'
import { LatestCustomers } from '@/components/common/LatesCustomer'
import { AcquisitionOverview } from '@/components/common/AcquisitionOverview'

const DashboardPage: FC = function () {
  const isFooter = true
  return (
    <>
      <AdminNavbar />
      <div className="flex items-start pt-16">
        <AdminSidebar />
        <main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64">
          <div className="px-4 pt-6">
            <SalesThisWeek />
            <div className="my-6">
              <LatestTransactions />
            </div>
            <LatestCustomers />
            <div className="my-6">
              <AcquisitionOverview />
            </div>
          </div>
          {isFooter && (
            <div className="mx-4 mt-4">
              <AdminFooter />
            </div>
          )}
        </main>
      </div>
    </>
  )
}
export default DashboardPage
