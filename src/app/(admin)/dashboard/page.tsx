import type { FC } from 'react'
import dynamic from 'next/dynamic'

import SalesThisWeek from '@/components/common/SaleThisWeek'
import LatestTransactions from '@/components/common/LatestTransations'
import LatestCustomers from '@/components/common/LatesCustomer'
import AcquisitionOverview from '@/components/common/AcquisitionOverview'
import MainLayout from '@/layout/common/MainLayout'

const RenderLineChart = dynamic(
  () => import('@/components/common/LineChart.common'),
  { ssr: false }
)

const DashboardPage: FC = function () {
  const isFooter = true

  return (
    <MainLayout isFooter={isFooter}>
      <DashboardContent />
    </MainLayout>
  )
}

export default DashboardPage

const DashboardContent = function () {
  return (
    <div className="px-4 pt-6">
      <SalesThisWeek />
      <div className="my-6">
        <LatestTransactions />
      </div>
      <LatestCustomers />
      <div className="my-6">
        <AcquisitionOverview />
      </div>
      <div className="my-6">
        <RenderLineChart />
      </div>
    </div>
  )
}
