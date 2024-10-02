'use client'
import { FC } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

import ContentLayout from '@/layout/common/ContentLayout'

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 350, pv: 2390, amt: 2210 },
]

const RenderLineChart: FC = function () {
  return (
    <ContentLayout title="Line Chart">
      <LineChart width={700} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </ContentLayout>
  )
}

export default RenderLineChart
