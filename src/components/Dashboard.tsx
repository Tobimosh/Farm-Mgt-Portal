"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, TrendingUp, Egg, Wheat, Bird } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Dashboard() {
  const eggProductionData = [
    { date: "Aug 1", eggs: 800 },
    { date: "Aug 2", eggs: 1750 },
    { date: "Aug 3", eggs: 1900 },
    { date: "Aug 4", eggs: 1850 },
    { date: "Aug 5", eggs: 950 },
    { date: "Aug 6", eggs: 2050 },
    { date: "Aug 7", eggs: 1980 },
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg border-t-4 border-t-green-600">
      <CardHeader className="bg-gradient-to-r from-green-50 to-transparent pb-8">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <BarChart3 className="h-5 w-5" />
          <span className="text-sm font-medium">Analytics</span>
        </div>
        <CardTitle className="text-2xl md:text-3xl">Farm Dashboard</CardTitle>
        <CardDescription className="text-base mt-2">
          View performance metrics and statistics for all your farms.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Eggs Collected"
            value="12,458"
            trend="+8.2%"
            icon={Egg}
            color="bg-amber-100 text-amber-700"
          />
          <StatCard
            title="Feed Used (kg)"
            value="2,845"
            trend="+3.1%"
            icon={Wheat}
            color="bg-emerald-100 text-emerald-700"
          />
          <StatCard
            title="Mortality Rate"
            value="1.2%"
            trend="-0.5%"
            trendDirection="down"
            icon={Bird}
            color="bg-blue-100 text-blue-700"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 mb-10">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-600">Farm</th>
                <th className="px-4 py-3 font-medium text-slate-600">Date</th>
                <th className="px-4 py-3 font-medium text-slate-600">
                  Eggs Collected
                </th>
                <th className="px-4 py-3 font-medium text-slate-600">
                  Feed Used (kg)
                </th>
                <th className="px-4 py-3 font-medium text-slate-600">
                  Mortality
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  farm: "Green Valley Farm",
                  date: "2024-08-05",
                  eggs: 1845,
                  feed: 520,
                  mortality: 3,
                },
                {
                  farm: "Green Valley Farm",
                  date: "2024-08-04",
                  eggs: 1760,
                  feed: 490,
                  mortality: 2,
                },
                {
                  farm: "Sunrise Layers",
                  date: "2024-08-05",
                  eggs: 2090,
                  feed: 610,
                  mortality: 4,
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-4 py-3">{row.farm}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.eggs}</td>
                  <td className="px-4 py-3">{row.feed}</td>
                  <td className="px-4 py-3">{row.mortality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional Chart Placeholder */}
        {/* <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            Charts Coming Soon
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            This dashboard will display charts and detailed analytics for egg
            production, feed usage, and mortality rates.
          </p>
        </div> */}

        {/* Egg Production Chart */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 mb-10">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Egg Production (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={eggProductionData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="eggs"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection?: "up" | "down";
  icon: React.ElementType;
  color: string;
}

function StatCard({
  title,
  value,
  trend,
  trendDirection = "up",
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`rounded-full p-2 ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{value}</p>
        <div className="mt-1 flex items-center">
          <TrendingUp
            className={`h-3 w-3 ${
              trendDirection === "up" ? "text-emerald-500" : "text-red-500"
            } ${trendDirection === "down" && "rotate-180"}`}
          />
          <span
            className={`ml-1 text-xs font-medium ${
              trendDirection === "up" ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {trend}
          </span>
          <span className="ml-1 text-xs text-slate-400">vs last week</span>
        </div>
      </div>
    </div>
  );
}
