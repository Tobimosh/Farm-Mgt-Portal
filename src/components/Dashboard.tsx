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


export function Dashboard() {
  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg border-t-4 border-t-green-600">
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

        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            Charts Coming Soon
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            This dashboard will display charts and detailed analytics for egg
            production, feed usage, and mortality rates.
          </p>
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
