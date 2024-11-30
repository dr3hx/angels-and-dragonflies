import { Card } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,  
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { name: 'Jan', value: 90 },
  { name: 'Feb', value: 70 },
  { name: 'Mar', value: 85 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 80 },
  { name: 'Jun', value: 70 },
  { name: 'Jul', value: 90 },
  { name: 'Aug', value: 75 },
  { name: 'Sep', value: 60 },
  { name: 'Oct', value: 80 },
]

const stats = [
  { label: 'All Users', value: '10,234', color: 'bg-purple-100' },
  { label: 'Event Count', value: '536', color: 'bg-orange-100' },
  { label: 'Conversations', value: '21', color: 'bg-green-100' },
  { label: 'New Users', value: '3,321', color: 'bg-blue-100' }
]

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <select className="bg-white border rounded-md px-3 py-1">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`p-4 ${stat.color} border-none`}>
            <h3 className="text-lg font-semibold text-gray-600">{stat.label}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Activity</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366F1"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Sessions</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold">6,132</p>
              <p className="text-sm text-green-600">+150% vs Previous 30 Days</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Page Views</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold">11,236</p>
              <p className="text-sm text-red-600">-202 vs Previous 30 Days</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}