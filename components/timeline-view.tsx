"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { period: "Month 1", optionA: -50000, optionB: -5000 },
  { period: "Month 3", optionA: -35000, optionB: -5000 },
  { period: "Month 6", optionA: -20000, optionB: -80000 },
  { period: "Month 9", optionA: 10000, optionB: -60000 },
  { period: "Year 1", optionA: 55000, optionB: -40000 },
  { period: "Year 2", optionA: 150000, optionB: 80000 },
]

export function TimelineView() {
  return (
    <div className="w-full h-full p-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
          <XAxis dataKey="period" stroke="oklch(0.6 0 0)" style={{ fontSize: "12px" }} />
          <YAxis stroke="oklch(0.6 0 0)" style={{ fontSize: "12px" }} tickFormatter={(value) => `$${value / 1000}K`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.15 0 0)",
              border: "1px solid oklch(0.25 0 0)",
              borderRadius: "8px",
              color: "oklch(0.95 0 0)",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
          />
          <Bar dataKey="optionA" name="Option A: Invest Now" fill="oklch(0.6 0.2 250)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="optionB" name="Option B: Wait 6 Months" fill="oklch(0.5 0.25 240)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
