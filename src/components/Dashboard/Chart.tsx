import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Select } from '../ui/select'

export const Chart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Reports Snapshot</CardTitle>
            <CardDescription>Demographic properties of your customer</CardDescription>
          </div>
          <Select>
            <select className="h-9 w-[180px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring">
              <option>Select Date</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px]">
          <div className="absolute inset-0">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-muted-foreground">
              <span>90</span>
              <span>85</span>
              <span>80</span>
              <span>75</span>
              <span>70</span>
              <span>65</span>
              <span>60</span>
            </div>

            {/* Graph area */}
            <div className="absolute left-10 right-0 top-0 bottom-0">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="border-b border-border" />
                ))}
              </div>

              {/* Graph line */}
              <svg className="absolute inset-0" preserveAspectRatio="none">
                <path
                  d="M0,100 C100,80 200,90 300,60 C400,70 500,90 600,70"
                  className="stroke-primary"
                  fill="none"
                  strokeWidth="2"
                />
                <path
                  d="M0,100 C100,80 200,90 300,60 C400,70 500,90 600,70 L600,300 L0,300 Z"
                  className="fill-primary/10"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
        </div>
      </CardContent>
    </Card>
  )
}
